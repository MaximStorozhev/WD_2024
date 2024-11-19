import express from "express";
import { AuthService } from "./auth.service.js";

export const authRouter = express.Router()

authRouter.post('/login', AuthService.login)
authRouter.post('/register', AuthService.register)
authRouter.get('/me', AuthService.me)
authRouter.get('/logout', AuthService.logout)

