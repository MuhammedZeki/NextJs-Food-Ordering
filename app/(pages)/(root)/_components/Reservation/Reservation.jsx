"use client"
import Title from '@/app/ui/Title'
import React from 'react'
import Input from '../Input'
import { useFormik } from 'formik';
import { reservationSchema } from '@/Schema/Reservation';

const Reservation = () => {
  const formik = useFormik({
    initialValues: {
      fullName: '',
      phoneNumber: '',
      email: '',
      persons: '',
      date: '',
    },
    onSubmit: async(values,actions) => {
      console.log("Form verileri:", values);
      alert(JSON.stringify(values, null, 2));
      await new Promise((resolve)=>setTimeout(resolve,1000))
      actions.resetForm()
    },
    validationSchema:reservationSchema
  });
  const inputs=[
    {
      id:1,
      name:"fullName",
      type:"text",
      placeHolder:"Your Full Name",
      value:formik.values.fullName,
      error:formik.errors.fullName,
      touched:formik.touched.fullName
    },
    {
      id:2,
      name:"phoneNumber",
      type:"number",
      placeHolder:"Your Phone Number",
      value:formik.values.phoneNumber,
      error:formik.errors.phoneNumber,
      touched:formik.touched.phoneNumber

    },
    {
      id:3,
      name:"email",
      type:"email",
      placeHolder:"Your Email Address",
      value:formik.values.email,
      error:formik.errors.email,
      touched:formik.touched.email
    },
    {
      id:4,
      name:"persons",
      type:"number",
      placeHolder:"How Many Persons?",
      value:formik.values.persons,
      error:formik.errors.persons,//schemanın içinde belirlediğimiz valid değer varsa onu yazdır
      touched:formik.touched.persons//dışarı dokundugu zaman bir error varsa yazdır
    },
    {
      id:5,
      name:"date",
      type:"date",
      value:formik.values.date,
      error:formik.errors.date,
      touched:formik.touched.date
    }
  ]
  return (
    <div className='container mx-auto mb-20'>
        <Title addClass="text-[40px] mt-[90px] mb-[25px]">Book A Table</Title>
        <div className='flex flex-col gap-y-6 lg:flex lg:flex-row lg:gap-x-6'>
            <form onSubmit={formik.handleSubmit} className='flex flex-col gap-y-3 lg:flex-1'>
              <div className='flex flex-col gap-y-3 lg:flex-1'>
                  {
                    inputs.map((input)=>(
                      <Input 
                      key={input.id}
                      data={input}
                      handleChange={formik.handleChange}    
                      handleBlur={formik.handleBlur}                 
                      />
                    ))
                  }
                  <button type='submit' className='bg-primary rounded-md text-white px-[55px] py-[10px]'>BOOK NOW</button>
              </div>
            </form>
            <div className='mt-1 lg:flex-1'>
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d24078.705833563854!2d28.945857234765626!3d41.0287950307761!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cab76fa59d9485%3A0xea0e81c673996ed1!2sPoint%20Hotel%20Taksim!5e0!3m2!1str!2str!4v1740498219195!5m2!1str!2str" width="600" height="450" loading="lazy" ></iframe>
            </div>
        </div>
    </div>
  )
}

export default Reservation