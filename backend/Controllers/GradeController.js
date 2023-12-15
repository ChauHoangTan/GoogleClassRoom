const Grade = require("../Models/GradeModel");
const User = require("../Models/UserModel");
const GradeComposition = require("../Models/GradeCompositionModel");
const mongoose = require('mongoose');

const getGradeComposition = async (req, res) => {
  const { classId } = req.body;

  try {
      
    const grade = await Grade.findOne({ classId });
    if (!grade) {
      return res.status(404).json({ success: false, message: 'Can not find Grade by ID of Class' });
    }

    const { orderGradeComposition, gradeCompositionList } = grade;

    return res.status(200).json({
      success: true,
      orderGradeComposition,
      gradeCompositionList,
    });
  } catch (error) {
      res.status(400).json({ message: error.message });
  }
}

const createNewGradeComposition = async (req, res) => {
  const { classId, name, scale } = req.body;

  try {

    const grade = await Grade.findOne({ classId });
    if (!grade) {
      return res.status(404).json({ success: false, message: 'Can not find Grade by ID of Class' });
    }

    const GradeCompositionModel = mongoose.model('GradeComposition', GradeComposition);

    const newGradeComposition = new GradeCompositionModel({
      name,
      scale, 
    });

    // await newGradeComposition.save();

    grade.orderGradeComposition.push(newGradeComposition._id);
    grade.gradeCompositionList.push(newGradeComposition);
    
    const updatedGradeModel = await grade.save();

    return res.status(201).json({ success: true, data: grade });
  } catch (error) {
      console.error(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

const updateGradeComposition = async (req, res) => {
  const { classId, gradeCompositionId, name, scale, isPublic } = req.body;

  try {
    // Sử dụng findOneAndUpdate để cập nhật phần tử trong mảng gradeCompositionList
    const updatedGradeComposition = await Grade.findOneAndUpdate(
      { classId, 'gradeCompositionList._id': gradeCompositionId },
      {
        $set: {
          'gradeCompositionList.$.name': name,
          'gradeCompositionList.$.scale': scale,
          'gradeCompositionList.$.isPublic': isPublic,
        },
      },
      { new: true } // Trả về đối tượng đã được cập nhật
    );

    if (!updatedGradeComposition) {
      return res.status(404).json({ success: false, message: 'Can not find Grade by ID of Class' });
    }

    return res.status(201).json({ success: true, data: updatedGradeComposition });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message });
  }
}

const deleteGradeComposition = async (req, res) => {
  const { classId, gradeCompositionId } = req.body;

  try {

    const gradeModel = await Grade.findOne({ classId });
    if (!gradeModel) {
      return res.status(404).json({ success: false, message: 'Can not find Grade by ID of Class' });
    }

    gradeModel.gradeCompositionList.pull({_id: gradeCompositionId})
    gradeModel.orderGradeComposition.pull(gradeCompositionId)

    await gradeModel.save()

    return res.status(201).json({ success: true, data: gradeModel });
  } catch (error) {
      console.error(error);
    return res.status(500).json({ success: false, message: error.message });
  }
}

module.exports = {
  getGradeComposition,
  createNewGradeComposition,
  deleteGradeComposition,
  updateGradeComposition
}
