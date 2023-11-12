import * as yup from 'yup';

// Login validation
const LoginValidation = yup.object().shape({
    userName: yup.string().required("User name is required")
    .matches(/^\S*$/, 'User name must not contain whitespaces'),
    password: yup.string()
        .required("Password is required")
        .min(6, "Password must be at least 6 characters")
        .max(20, "Password must be less than 20 characters")
        .matches(/(?=.*[0-9])/, "Password must contain a number")
});

// Register validation
const RegisterValidation = yup.object().shape({
    userName: yup.string().required("User name is required")
        .matches(/^\S*$/, 'User name must not contain whitespaces'),
    password: yup.string()
        .required("Password is required")
        .min(6, "Password must be at least 6 characters")
        .max(20, "Password must be less than 20 characters")
        .matches(/(?=.*[0-9])/, "Password must contain a number"),
    firstName: yup.string().required("First name is required")
        .max(20, "First name must be less than 20 characters")
        .matches(/^[a-zA-Z ]*$/, "First name must contain only letters"),
    lastName: yup.string().required("Last name is required")
        .max(20, "Last name must be less than 20 characters")
        .matches(/^[a-zA-Z ]*$/, "Last name must contain only letters"),
});

const PasswordValidation = yup.object().shape({
    oldPassword: yup
        .string()
        .required("Old password is required")
        .min(6, "Old password must be at least 6 characters")
        .max(20, "Old password must be less than 20 characters")
        .matches(/(?=.*[0-9])/, "Old Password must contain a number"),
    newPassword: yup
        .string()
        .required("New password is required")
        .min(6, "New Password must be at least 6 characters")
        .max(20, "New Password must be less than 20 characters")
        .matches(/(?=.*[0-9])/, "New Password must contain a number"),
    confirmPassword: yup
        .string()
        .required("New password is required")
        .min(6, "New password must be at least 6 characters")
        .max(20, "New password must be less than 20 characters")
        .matches(/(?=.*[0-9])/, "New password must contain a number")
        .oneOf([yup.ref("newPassword"), null], "New password must match"),
});

export { LoginValidation, RegisterValidation, PasswordValidation };