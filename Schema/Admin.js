import * as Yup from "yup";

export const AdminSchema = Yup.object({
  username: Yup.string()
    .required("Username is required.")
    .min(3, "Username must be at least 3 characters."),
  password: Yup.string()
    .min(5, "Password must be  at least 8 characters.")
    .required("Passwors is Required"),
});
