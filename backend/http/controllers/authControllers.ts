import type { Request, Response } from "express";
import { prisma } from "../../db/lib";
import bcrypt from "bcrypt";
import { registerSchema, LoginSchema } from "../../schemas/autrhSchema";
import jwt from 'jsonwebtoken';

export const regsiterController = async (req: Request, res: Response) => {
    const { fullName, email, password } = req.body;
    try {
        if (!fullName || !email || !password) {
            return res.status(400).json({ success: false, data: null, error: 'INVAVLID_REQUEST' });
        }
        const validatedData = registerSchema.safeParse({ fullName, email, password });
        if (!validatedData.success) {
            return res.status(400).json({ success: false, data: null, error: "INVALID_DATA" })
        }
        const existingUser = await prisma.user.findUnique({
            where: {
                email
            }
        })
        if (existingUser) {
            return res.status(409).json({ success: false, data: null, error: "EMAIL_ALREADY_EXISTS" })
        }
        const user = await prisma.user.create({
            data: {
                fullName,
                email,
                password: await bcrypt.hash(password, 10)
            }
        })
        return res.status(201).json({ success: true, data: user, error: null })
    } catch (error: unknown) {
        return res.status(500).json({ success: false, data: null, error: 'SEVER_ERROR' })
    }
}

export const loginController = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            return res.status(400).json({ success: false, data: null, error: 'INVAVLID_REQUEST' });
        }
        const validatedData = LoginSchema.safeParse({ email, password });
        if (!validatedData.success) {
            return res.status(400).json({ success: false, data: null, error: "INVALID_DATA" })
        }
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        })
        if (!user) {
            return res.status(404).json({ success: false, data: null, error: "USER_NOT_FOUND" })
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ success: false, data: null, error: "INVALID_CREDENTIALS" })
        }
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET as string);
        return res.status(200).json({ success: true, data: { token }, error: null })
    }
    catch (error: unknown) {
        return res.status(500).json({ success: false, data: null, error: 'SEVER_ERROR' })
    }
}
