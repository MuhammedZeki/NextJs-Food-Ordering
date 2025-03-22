"use client";
import React, { useEffect } from "react";
import { useFormik } from "formik";
import { LoginSchema } from "@/Schema/Login";
import Title from "@/app/ui/Title";
import Input from "../../(root)/_components/Input";
import { FaGithub, FaGoogle } from "react-icons/fa";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import { toast } from "react-toastify";
const LoginPage = () => {
  const { push } = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (session?.user && status === "authenticated") {
      push(`/profile/${session.user.id}`);
    }
  }, [session, push, status]);
  console.log(session);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values, actions) => {
      const res = await signIn("credentials", {
        redirect: false,
        email: values.email,
        password: values.password,
      });
      if (res.error) {
        toast.error(`Giriş Başarısız: ${res.error}`, { autoClose: 3000 });
      } else {
        toast.success("Giriş başarılı", { autoClose: 2000 });
      }
    },
    validationSchema: LoginSchema,
  });
  const inputs = [
    {
      id: 1,
      name: "email",
      type: "email",
      placeHolder: "Your Email Address",
      value: formik.values.email,
      error: formik.errors.email,
      touched: formik.touched.email,
    },
    {
      id: 2,
      name: "password",
      type: "password",
      placeHolder: "Your Password Address",
      value: formik.values.password,
      error: formik.errors.password,
      touched: formik.touched.password,
    },
  ];
  return (
    <div className="container mx-auto">
      <div className="py-20 flex flex-col items-center">
        <Title addClass="text-[40px] text-center my-5">Login</Title>
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
              Login
            </button>

            <button
              onClick={() => signIn("github")}
              type="button"
              className="bg-secondary rounded-md text-white px-[55px] py-[10px] flex justify-center items-center gap-x-1"
            >
              <FaGithub /> Github
            </button>
            <button
              onClick={() => signIn("google")}
              type="button"
              className="bg-green-800 rounded-md text-white px-[55px] py-[10px] flex justify-center items-center gap-x-1"
            >
              <FaGoogle /> Google
            </button>

            <button
              onClick={() => signOut()}
              type="button"
              className="bg-green-800 rounded-md text-white px-[55px] py-[10px] flex justify-center items-center gap-x-1"
            >
              <FaGoogle /> Log Out
            </button>

            <Link
              href="/register"
              className="my-2 underline underline-offset-2 hover:text-slate-600 text-sm"
            >
              Dou you have a account?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
