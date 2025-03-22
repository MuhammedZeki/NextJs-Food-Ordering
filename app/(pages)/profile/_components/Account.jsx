"use client";
import Title from "@/app/ui/Title";
import { useFormik } from "formik";
import { AccountSettingsSchema } from "@/Schema/profile/AccountSettings";
import Input from "../../(root)/_components/Input";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

const Account = ({ userSettings }) => {
  const [initialValues, setInitialValues] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
    address: "",
    job: "",
    bio: "",
  });

  useEffect(() => {
    const fetchUserSettings = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/users/user/${userSettings._id}`
        );
        setInitialValues(res.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserSettings();
  }, [userSettings._id]);

  useEffect(() => {
    if (userSettings) {
      setInitialValues({
        fullName: userSettings?.fullName || "",
        phoneNumber: userSettings?.phoneNumber || "",
        email: userSettings?.email || "",
        address: userSettings?.address || "",
        job: userSettings?.job || "",
        bio: userSettings?.bio || "",
      });
    }
  }, [userSettings]);
  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const res = await axios.put(
          `${process.env.NEXT_PUBLIC_API_URL}/api/users/user/${userSettings._id}`,
          values
        );
        if (res.status === 200) {
          toast.success("User updated successfully", { autoClose: 1000 });
          setInitialValues((prevState) => ({ ...prevState, ...res.data }));
        } else {
          toast.error("Api error");
        }
      } catch (error) {
        toast.error("Something went wrong");
        console.log(error.message || error.response.data.message);
      } finally {
        setSubmitting(false);
      }
    },
    validationSchema: AccountSettingsSchema,
  });
  const inputs = [
    {
      id: 1,
      name: "fullName",
      type: "text",
      placeHolder: "Your Full Name",
      value: formik.values.fullName,
      error: formik.errors.fullName,
      touched: formik.touched.fullName,
    },
    {
      id: 2,
      name: "phoneNumber",
      type: "number",
      placeHolder: "Your Phone Number",
      value: formik.values.phoneNumber,
      error: formik.errors.phoneNumber,
      touched: formik.touched.phoneNumber,
    },
    {
      id: 3,
      name: "email",
      type: "email",
      placeHolder: "Your Email Address",
      value: formik.values.email,
      error: formik.errors.email,
      touched: formik.touched.email,
    },
    {
      id: 4,
      name: "address",
      type: "text",
      placeHolder: "Your Address",
      value: formik.values.address,
      error: formik.errors.address, //schemanın içinde belirlediğimiz valid değer varsa onu yazdır
      touched: formik.touched.address, //dışarı dokundugu zaman bir error varsa yazdır
    },
    {
      id: 5,
      name: "job",
      type: "text",
      placeHolder: "Your Job",

      value: formik.values.job,
      error: formik.errors.job,
      touched: formik.touched.job,
    },
    {
      id: 6,
      name: "bio",
      type: "text",
      placeHolder: "Your Bio",

      value: formik.values.bio,
      error: formik.errors.bio,
      touched: formik.touched.bio,
    },
  ];
  return (
    <>
      <Title addClass="text-5xl ">Account Settings</Title>
      <div className="my-10">
        <form
          onSubmit={formik.handleSubmit}
          className="grid md:grid-cols-2 grid-cols-1 gap-2"
        >
          {inputs.map((input) => (
            <Input
              key={input.id}
              data={input}
              handleChange={formik.handleChange}
              handleBlur={formik.handleBlur}
            />
          ))}
          <button
            type="submit"
            className="text-white bg-primary py-2 px-4 rounded-lg"
            disabled={formik.isSubmitting || !formik.values}
          >
            {formik.isSubmitting ? "Loading..." : "Update"}
          </button>
        </form>
      </div>
    </>
  );
};

export default Account;
