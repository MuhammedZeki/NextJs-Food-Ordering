"use client";
import React from "react";
import { useFormik } from "formik";
import Title from "@/app/ui/Title";
import Input from "../../(root)/_components/Input";
import { RegisterSchema } from "@/Schema/Register";
import axios from "axios";

import { toast } from "react-toastify";
import { redirect, useRouter } from "next/navigation";
const RegisterPage = () => {
  const { push } = useRouter();
  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    onSubmit: async (values, actions) => {
      try {
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/api/users/register`,
          values
        );
        if (res.status === 200) {
          toast.success("Giriş Başarılı");

          push("/login");

          actions.resetForm();
        }
      } catch (error) {
        toast.error("Giriş Başarısız");
      }
    },
    validationSchema: RegisterSchema,
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
      name: "email",
      type: "email",
      placeHolder: "Your Email Address",
      value: formik.values.email,
      error: formik.errors.email,
      touched: formik.touched.email,
    },
    {
      id: 3,
      name: "password",
      type: "password",
      placeHolder: "Your Password",
      value: formik.values.password,
      error: formik.errors.password,
      touched: formik.touched.password,
    },
    {
      id: 4,
      name: "confirmPassword",
      type: "password",
      placeHolder: "Your Confirm Password",
      value: formik.values.confirmPassword,
      error: formik.errors.confirmPassword,
      touched: formik.touched.confirmPassword,
    },
  ];
  return (
    <div className="container mx-auto">
      <div className="py-20  flex flex-col items-center">
        <Title addClass="text-[40px] text-center my-5">Register</Title>
        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col gap-y-3 w-full sm:w-1/2"
        >
          <div className="flex flex-col gap-y-3 ">
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
              className="bg-primary rounded-md text-white px-[55px] py-[10px]"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
