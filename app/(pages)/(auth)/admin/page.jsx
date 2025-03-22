"use client";
import React from "react";
import { useFormik } from "formik";
import Title from "@/app/ui/Title";
import Input from "../../(root)/_components/Input";
import { AdminSchema } from "@/Schema/Admin";
import { toast } from "react-toastify";
import axios from "axios";
import { useRouter } from "next/navigation";

const AdminPage = () => {
  const { push } = useRouter();
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: async (values, actions) => {
      try {
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/api/admin`,
          values
        );
        if (res.status !== 200) {
          throw new Error("Login Failed");
        } else {
          push("/admin/profile");
          toast.success("Login Success");
        }
      } catch (error) {
        toast.error("Login Failed");
      }
    },
    validationSchema: AdminSchema,
  });
  const inputs = [
    {
      id: 1,
      name: "username",
      type: "text",
      placeHolder: "Your Username",
      value: formik.values.username,
      error: formik.errors.username,
      touched: formik.touched.username,
    },
    {
      id: 2,
      name: "password",
      type: "password",
      placeHolder: "Your Password",
      value: formik.values.password,
      error: formik.errors.password,
      touched: formik.touched.password,
    },
  ];
  return (
    <div className="container mx-auto">
      <div className="py-20 flex flex-col items-center">
        <Title addClass="text-[40px] text-center my-5">Admin Login</Title>
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
              Admin
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminPage;
