const Class = require("../Models/ClassModel");

const getAllClass = async (req, res) => {
    try {
        const users = await Class.find({}).select('-password -refreshToken'); 
        return res.status(200).json(users)
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

module.exports = {
    getAllClass
}
