"use client";
import Title from "@/app/ui/Title";
import { useFormik } from "formik";
import Input from "@/app/(pages)/(root)/_components/Input";
import { FooterSchema } from "@/Schema/admin/profile/Footer";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Footer = () => {
  const [footer, setFooter] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/admin/footer`
        );
        if (res.status === 200) {
          setFooter(res.data[0]);
        }
      } catch (error) {
        console.log(error.message || error.response.data.message);
      }
    }
    fetchData();
  }, []);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      location: footer?.location || "",
      phoneNumber: footer?.phoneNumber || "",
      email: footer?.email || "",
      description: footer?.description || "",
      day: footer?.time?.day || "",
      time: footer?.time?.hour || "",
    },
    onSubmit: async (values, actions) => {
      try {
        const res = await axios.put(
          `${process.env.NEXT_PUBLIC_API_URL}/api/admin/footer/${footer?._id}`,
          {
            location: values.location,
            phoneNumber: values.phoneNumber,
            email: values.email,
            description: values.description,
            time: {
              day: values.day,
              hour: values.time,
            },
          }
        );
        if (res.status === 200) {
          toast.success("Updated To Form");
          formik.setValues({
            ...res.data,
            day: res.data.time.day,
            time: res.data.time.hour,
          });
        }
      } catch (error) {
        console.log(error.message || error.response.data.message);
      }
    },
    validationSchema: FooterSchema,
  });
  const inputs = [
    {
      id: 1,
      name: "location",
      type: "text",
      placeHolder: "Your Location",
      value: formik.values.location,
      error: formik.errors.location,
      touched: formik.touched.location,
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
      name: "description",
      type: "text",
      placeHolder: "Your Description",
      value: formik.values.description,
      error: formik.errors.description, //schemanın içinde belirlediğimiz valid değer varsa onu yazdır
      touched: formik.touched.description, //dışarı dokundugu zaman bir error varsa yazdır
    },
    {
      id: 5,
      name: "day",
      type: "text",
      placeHolder: "Write a Day",
      value: formik.values.day,
      error: formik.errors.day,
      touched: formik.touched.day,
    },
    {
      id: 6,
      name: "time",
      type: "text",
      placeHolder: "Write a Time",
      value: formik.values.time,
      error: formik.errors.time,
      touched: formik.touched.time,
    },
  ];
  return (
    <>
      <Title addClass="text-5xl ">Footer</Title>
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
            className="text-white bg-primary py-2 px-4 rounded-lg mt-3"
          >
            Update
          </button>
        </form>
      </div>
    </>
  );
};

export default Footer;
