import * as Yup from 'yup';

export const RegisterSchema = Yup.object({    
    fullName: Yup.string()
        .min(3, 'Must be 3 characters or less')
        .required('Full Name is Required'),
    email: Yup.string().email('Invalid email address').required(),
    password:Yup.string()
    .min(8,"Password must be  at least 8 characters.")
    .required("Passwors is Required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must contain at least one uppercase, one lowercase, one number and one special character."
    ),
    confirmPassword: Yup.string()
      .required("Confirm password is required.")
      .oneOf([Yup.ref("password"), null], "Passwords must match.")
  })