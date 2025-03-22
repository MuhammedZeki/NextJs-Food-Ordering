import * as Yup from "yup";

export const FooterSchema = Yup.object({
  location: Yup.string()
    .min(3, "Must be 3 characters or less")
    .required("Location is Required"),

  phoneNumber: Yup.string()
    .min(10, "Must be 11 characters or less")
    .max(12, "Must be 11 characters or less")
    .required("Phone Number is Required"),

  email: Yup.string()
    .email("Invalid email address")
    .required("Email is Required"),

  description: Yup.string().min(3).required("Description is Required"),

  day: Yup.string()
    .min(3, "Must be 3 characters or less")
    .required("Day is Required"),
  time: Yup.string()
    .min(3, "Must be 3 characters or less")
    .required("Time is Required"),
});
