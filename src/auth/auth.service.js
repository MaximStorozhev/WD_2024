import { Database } from "../database/index.js"


export class AuthService {
    static async login({ session, body }, res) {
        const { email, password } = body

        if (!email || !password) {
            return res.status(400).send({ error: 'Invalid payload.' })
        }

        const [users] = await Database.connection.query('SELECT * from users where email = ?', [email])

        if (users.length && users[0].password === password) {
            session.user = users[0]

            await new Promise((resolve, reject) => {
                session.save((error) => {
                    if (error) {
                        reject(error)
                    } else {
                        resolve()
                    }
                })
            })

            return res.send({ success: true })
        }

        return res.status(401).send({ success: false })

    }
    static async logout({ session }, res) {
        await new Promise((resolve, reject) => {
            session.destroy((error) => {
                if (error) {
                    reject(error)
                } else {
                    resolve()
                }
            })
        })

        return res.send({ success: true })
    }

    static async me({ session }, res) {
        if (!session.user) {
            return res.status(401).send({ success: false })
        }

        return res.send(session.user)
    }

    static async register({ body }, res) {
        const { name, email, password, type } = body

        if (!name || !email || !password || !type) {
            return res.status(400).send({ error: 'Invalid payload.' })
        }

        if (type !== 'tutor' && type !== 'student') {
            return res.status(400).send({ error: 'Invalid payload.' })
        }

        const [exist] = await Database.connection.query(`SELECT count(id) FROM users where email = ?`, [email])

        if (exist[0]['count(id)'] !== 0) {
            return res.status(409).send({ error: 'User already exist.' })
        }


        await Database.connection.query(`INSERT INTO users (name, email, password, type) VALUES (?, ?, ?, ?)`, [name, email, password, type])

        return res.send({ success: true })
    }
}