import * as Yup from 'yup';

export const reservationSchema = Yup.object({
    fullName: Yup.string()
      .min(3, 'Must be 3 characters or less')
      .required('Full Name is Required'),
    phoneNumber: Yup.string()
      .min(11, 'Must be 11 characters or less')
      .max(11,'Must be 11 characters or less')
      .required('Phone Number is Required'),
    email: Yup.string().email('Invalid email address').required('Full Name is Required'),
    persons:Yup.number()
    .min(1)
    .max(5)
    .required("Required"),
    date:Yup.date().required("Date Time is Required")
  })