import { registerUserService, loginUserService, } from "../services/userService.js";
/* =====================================================
   REGISTER USER
===================================================== */
/**
 * @route   POST /api/auth/register
 * @desc    Register a new user
 *
 * @required body:
 *   - firstName (string)
 *   - lastName  (string)
 *   - email     (string, unique)
 *   - password  (string)
 *   - mobile    (string)
 *
 * @optional body:
 *   - role      (string) default: "user"
 *
 * @success response (201):
 *   - message (string)
 *   - user    (object)
 *
 * @error responses:
 *   - 400 Validation or duplicate email error
 */
export const registerUser = async (req, res) => {
    try {
        const user = await registerUserService(req.body);
        res.status(201).json({
            message: "User registered successfully",
            user,
        });
    }
    catch (error) {
        const err = error;
        res.status(400).json({ message: err.message });
    }
};
/* =====================================================
   LOGIN USER
===================================================== */
/**
 * @route   POST /api/auth/login
 * @desc    Login user and return JWT token
 *
 * @required body:
 *   - email    (string)
 *   - password (string)
 *
 * @success response (200):
 *   - message (string)
 *   - token   (string) JWT token
 *   - role    (string) user role
 *   - userId  (string) user ID
 *
 * @error responses:
 *   - 401 Invalid credentials
 */
export const loginUser = async (req, res) => {
    try {
        const result = await loginUserService(req.body);
        res.json({
            message: "Login successful",
            token: result.token,
            role: result.role,
            userId: result.userId,
        });
    }
    catch (error) {
        const err = error;
        res.status(401).json({ message: err.message });
    }
};
