const Class = require("../Models/ClassModel");

const getAllClass = async (req, res) => {
    try {
        const classes = await Class.find({}); 
        return res.status(200).json(classes)
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const createNewClass = async (req, res) => {
    const { classId, className } = req.body;

    try {
        // Validate input
        if (!classId || !className) {
            return res.status(400).json({ success: false, message: 'Please provide classId and className' });
        }

        // Check user authentication and permissions
        // const user = await User.findById(req.body.user.id);
        // if (!user) {
        //     return res.status(401).json({ success: false, message: 'User not authenticated' });
        // }

        // Create a new class
        const newClass = await Class.create({
            classId,
            className,
            teachers: [],
            students: []
        });

        return res.status(201).json({ success: true, data: newClass });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: error.message });
    }
};


module.exports = {
    getAllClass,
    createNewClass
}
