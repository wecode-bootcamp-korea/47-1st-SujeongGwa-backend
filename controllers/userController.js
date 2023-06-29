const { userService } = require("../services");

const signUp = async (req, res) => {
    try {
        const { type_id, name, email, password, account } = req.body;
        const requiredFields = {
            1: ["name", "email", "password"],
            2: ["name", "email", "password", "account"],
            3: ["name", "email", "password", "account"],
        };

        if (!type_id || !requiredFields[type_id]) {
            return res.status(400).json({ message: "KEY_ERROR: Invalid 'type_id' value." });
        }

        const missingFields = requiredFields[type_id].filter((field) => !req.body[field]);
        if (missingFields.length > 0) {
            return res
                .status(400)
                .json({ message: `KEY_ERROR: Missing required fields: ${missingFields.join(", ")}.` });
        }

        await userService.signUp(type_id, name, email, password, account);
        return res.status(201).json({
            message: "SIGNUP_SUCCESS",
        });
    } catch (err) {
        console.log(err);
        return res.status(err.statusCode || 500).json({ message: err.message });
    }
};
const signUpType = async (req, res) => {
    try {
        const { name } = req.body;

        if (!name) {
            return res.status(400).json({ message: "KEY_ERROR" });
        }

        await userService.userType(name);
        return res.status(201).json({
            message: "next signup",
        });
    } catch (err) {
        console.log(err);
        return res.status(err.statusCode || 500).json({ message: err.message });
    }
};

module.exports = { signUp, signUpType };
