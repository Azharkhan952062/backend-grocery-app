import jwt from "jsonwebtoken";

export const sellerLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (
            email !== process.env.SELLER_EMAIL ||
            password !== process.env.SELLER_PASSWORD
        ) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials",
            });
        }

        const token = jwt.sign(
            { email: process.env.SELLER_EMAIL },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        // res.clearCookie("userToken");

        res.cookie("sellerToken", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        return res.status(200).json({
            success: true,
            message: "Login successful",
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
};


export const sellerLogout = async (req, res) => {
    try {
        res.clearCookie("sellerToken", {
            httpOnly: true,
            secure: true,
            sameSite: "none",
        });

        return res.status(200).json({
            success: true,
            message: "Seller logout successfully"
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};



export const isAuthSeller = (req, res) => {
    try {
        res.status(200).json({
            success: true,
        });
    } catch (error) {
        console.error("Error in isAuthSeller:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};