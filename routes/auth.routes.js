import { Router } from "express";
import { signIn, signOut, signUp } from "../controllers/auth.controller.js";

const authRouter = Router();

authRouter.post("/sign-up", signUp);
authRouter.post("/sign-in", signIn);
authRouter.post("/sign-out", signOut);

export default authRouter;

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication APIs (Signup, Signin, Signout)
 */

/**
 * @swagger
 * /api/v1/auth/signup:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: Mrithu
 *               email:
 *                 type: string
 *                 example: mrithu@gmail.com
 *               password:
 *                 type: string
 *                 example: yourpassword123
 *     responses:
 *       201:
 *         description: User created successfully
 *       409:
 *         description: User already exists
 */

/**
 * @swagger
 * /api/v1/auth/signin:
 *   post:
 *     summary: Login a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: mrithu@gmail.com
 *               password:
 *                 type: string
 *                 example: yourpassword123
 *     responses:
 *       200:
 *         description: User signed in successfully
 *       404:
 *         description: User not found
 *       401:
 *         description: Invalid credentials
 */

/**
 * @swagger
 * /api/v1/auth/signout:
 *   post:
 *     summary: Logout a user (token blacklist)
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User signed out successfully
 *       400:
 *         description: Token is required for sign out
 */
