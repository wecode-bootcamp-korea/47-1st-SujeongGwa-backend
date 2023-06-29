const { userService } = require("../services");

const usersType = async (req, res) => {
    try {
        const { name } = req.body;

        if (!name) {
            return res.status(400).json({ message: "KEY_ERROR" });
        }

        await userService.userType(name);
        return res.status(201).json({
            message: "NEXT",
        });
    } catch (err) {
        console.log(err);
        return res.status(err.statusCode || 500).json({ message: "INVALID_USER_REQUEST" });
    }
};

module.exports = { usersType };
