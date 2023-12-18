import * as yup from 'yup'

// admin edit Class info validation
const editUserInfoValidation = yup.object().shape({
  classId: yup
    .string()
    .trim()
    .required('Class Id is required')
    .matches(/^[0-9]+$/, 'Only contain numbers'),
  //   .matches(/^[0-9]{10,11}$/, 'Phone number must be 10 to 11 digits'),
  className: yup
    .string()
    .required('Class name is required')
    .max(20, 'Class name must be less than 20 characters')
})

// User create Class info validation
const createClassInfoValidation = yup.object().shape({
  classId: yup
    .string()
    .trim()
    .required('Class Id is required')
    .matches(/^[0-9]+$/, 'Only contain numbers'),
  //   .matches(/^[0-9]{10,11}$/, 'Phone number must be 10 to 11 digits'),
  className: yup
    .string()
    .required('Class name is required')
    .max(20, 'Class name must be less than 20 characters')
})

export {
  editUserInfoValidation,
  createClassInfoValidation
}