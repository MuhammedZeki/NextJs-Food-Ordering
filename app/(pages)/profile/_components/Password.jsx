import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import Input from "../../(root)/_components/Input";
import Title from "@/app/ui/Title";
import { PasswordSchema } from "@/Schema/profile/Password";
import axios from "axios";
import { toast } from "react-toastify";

const Password = ({ userSettings }) => {
  const [initialValues, setInitialValues] = useState({
    password: "",
    confirmPassword: "",
  });
  useEffect(() => {
    if (userSettings) {
      setInitialValues({
        password: "",
        confirmPassword: "",
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
          toast.success("User updated successfully");
        } else {
          toast.error("Api error");
        }
      } catch (error) {
        console.log(error.message || error.response.data.message);
      } finally {
        setSubmitting(false);
      }
    },
    validationSchema: PasswordSchema,
  });

  const inputs = [
    {
      id: 1,
      name: "password",
      type: "password",
      placeHolder: "Your password",
      value: formik.values.password,
      error: formik.errors.password,
      touched: formik.touched.password,
    },
    {
      id: 2,
      name: "confirmPassword",
      type: "password",
      placeHolder: "Your confirmPassword",
      value: formik.values.confirmPassword,
      error: formik.errors.confirmPassword,
      touched: formik.touched.confirmPassword,
    },
  ];
  return (
    <>
      <Title addClass="text-5xl ">Password</Title>
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
          >
            {formik.isSubmitting ? "Loading..." : "Update"}
          </button>
        </form>
      </div>
    </>
  );
};

export default Password;
