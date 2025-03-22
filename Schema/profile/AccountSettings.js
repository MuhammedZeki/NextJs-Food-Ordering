import * as Yup from "yup";

export const AccountSettingsSchema = Yup.object({
  fullName: Yup.string()
    .min(3, "Must be 3 characters or less")
    .required("Full Name is Required"),

  phoneNumber: Yup.number()
    .min(10, "Must be 11 characters or less")
    .required("Phone Number is Required"),

  email: Yup.string()
    .email("Invalid email address")
    .required("Full Name is Required"),

  address: Yup.string().min(3).required("Required"),

  job: Yup.string()
    .min(3, "Must be 3 characters or less")
    .required("Job is Required"),
  bio: Yup.string()

    .min(3, "Must be 3 characters or less")
    .required("Bio is Required"),
});
