import * as Yup from 'yup';

export const LoginSchema = Yup.object({    
    email: Yup.string().email('Invalid email address').required(),
    password:Yup.string()
    .min(8,"Password must be  at least 8 characters.")
    .required("Passwors is Required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must contain at least one uppercase, one lowercase, one number and one special character."
    ),
  })