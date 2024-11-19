import './config/index.js'
import { Database } from "./database/index.js";
import { Preinstall } from './database/preinstall.js';
import { Server } from "./server.js";

async function main() {
    await Preinstall.run()
    await Database.init()

    Server.init()
    Server.listen()

}

main()
