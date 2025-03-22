"use client";
import Title from "@/app/ui/Title";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { GiCancel } from "react-icons/gi";
import OutsideClickHandler from "react-outside-click-handler";
import { toast } from "react-toastify";

const AddNewProduct = ({ setIsProduct }) => {
  const [file, setFile] = useState();
  const [imageSrc, setImageSrc] = useState();
  const [category, setCategory] = useState("pizza");
  const [categories, setCategories] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [prices, setPrices] = useState([]);
  const [extra, setExtra] = useState({
    text: "",
    price: "",
  });
  const [extraOptions, setExtraOptions] = useState([]);
  const changePrice = (e, i) => {
    setPrices((prevPrices) => {
      const updatedPrices = [...prevPrices];
      updatedPrices[i] = e.target.value;
      return updatedPrices;
    });
  };
  const handleOnChange = (changeEvent) => {
    const reader = new FileReader();

    reader.onload = function (onLoadEvent) {
      setImageSrc(onLoadEvent.target.result);
      setFile(changeEvent.target.files[0]);
    };
    reader.readAsDataURL(changeEvent.target.files[0]);
  };
  const SetOptions = () => {
    if (extra) {
      if (extra.text && extra.price) {
        setExtraOptions((prevState) => [...prevState, extra]);
      }
    }
  };
  const DeleteOptions = (index) => {
    setExtraOptions((prevState) => prevState.filter((_, i) => i !== index));
  };
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/admin/categories`
        );
        if (res.status === 200) {
          setCategories(res.data);
        } else {
          console.log("[CATEGORİES]");
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchCategory();
  }, []);

  const handleCreate = async () => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "food-ordering");
    try {
      const uploadData = await axios.post(
        "https://api.cloudinary.com/v1_1/drr2gjkuo/image/upload",
        data
      );
      const { url } = uploadData.data;
      const NewData = {
        image: url,
        title,
        description,
        category: category.toLowerCase(),
        prices,
        extraOptions,
      };
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/addProduct`,
        NewData
      );
      console.log(res.data);
      if (res.status === 200) {
        toast.success("Succes");
        setIsProduct(false);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div
      className='w-screen h-screen z-50 top-0 left-0 fixed
    after:content-[""] after:w-screen after:h-screen after:absolute 
    after:top-0 after:left-0 grid place-content-center
    after:bg-white after:opacity-70
'
    >
      <OutsideClickHandler onOutsideClick={() => setIsProduct(false)}>
        <div className="grid place-content-center">
          <div
            className="relative z-50 sm:w-[650px] sm:h-[680px] w-[450px] h-[750px] bg-white border-2
            p-5"
          >
            <button className=" absolute top-4 right-5">
              <GiCancel
                onClick={() => setIsProduct(false)}
                size={20}
                className="hover:text-primary transition-all
                    hover:duration-300"
              />
            </button>
            <Title addClass="text-[40px] text-center">Add a New Product</Title>
            <div className="flex-col gap-y-1 items-center">
              <div className=" flex flex-col p-1 mt-4 space-y-1">
                <label className="flex gap-2 items-center">
                  <input
                    type="file"
                    onChange={(e) => handleOnChange(e)}
                    className="hidden"
                  />
                  <button className="btn-primary rounded-md px-2 py-1 text-white bg-blue-400 pointer-events-none">
                    Choose an Image
                  </button>
                  {imageSrc && (
                    <div>
                      {/*eslint-disable-next-line @next/next/no-img-element*/}
                      <img
                        src={imageSrc}
                        alt=""
                        className="w-12 h-12 rounded-full"
                      />
                    </div>
                  )}
                </label>
              </div>
              <div className="flex flex-col my-3 space-y-1">
                <span className="text-sm font-semibold">Title</span>
                <input
                  type="text"
                  placeholder="Write a title..."
                  className="border-2 px-2 py-1"
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="flex flex-col my-3 space-y-1">
                <span className="text-sm font-semibold">Description</span>
                <textarea
                  className=" border-2 py-1 px-2"
                  placeholder="Write a Desc."
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>
              <div className="flex flex-col my-3 space-y-1">
                <span className="text-sm font-semibold">Categories</span>
                <select
                  className="border-2 py-1 px-2"
                  onChange={(e) => setCategory(e.target.value)}
                >
                  {categories.length > 0 &&
                    categories.map((category) => (
                      <option
                        value={category.title.toLowerCase()}
                        key={category._id}
                      >
                        {category.title}
                      </option>
                    ))}
                </select>
              </div>
              <div className="flex flex-col my-3 space-y-1">
                <span className="text-sm font-semibold">Prices</span>
                <div className="flex justify-between gap-6 w-full md:flex-nowrap flex-wrap">
                  {category === "pizza" ? (
                    <>
                      <input
                        type="number"
                        className="border-b-2 p-1 pl-0 text-sm px-1 outline-none w-36"
                        placeholder="small"
                        onChange={(e) => changePrice(e, 0)}
                      />
                      <input
                        type="number"
                        className="border-b-2 p-1 pl-0 text-sm px-1 outline-none w-36"
                        placeholder="medium"
                        onChange={(e) => changePrice(e, 1)}
                      />
                      <input
                        type="number"
                        className="border-b-2 p-1 pl-0 text-sm px-1 outline-none w-36"
                        placeholder="large"
                        onChange={(e) => changePrice(e, 2)}
                      />
                    </>
                  ) : (
                    <>
                      <input
                        type="number"
                        className="border-b-2 p-1 pl-0 text-sm px-1 outline-none w-36"
                        placeholder="small"
                        onChange={(e) => changePrice(e, 0)}
                      />
                    </>
                  )}
                </div>
              </div>
              <div className="flex flex-col my-3 space-y-1 ">
                <span className="text-sm font-semibold">Extra</span>
                <div className="flex  gap-6 w-full md:flex-nowrap flex-wrap">
                  <input
                    type="text"
                    className="border-b-2 p-1 pl-0 text-sm px-1 outline-none w-36"
                    placeholder="item"
                    name="text"
                    onChange={(e) =>
                      setExtra((prevState) => ({
                        ...prevState,
                        [e.target.name]: e.target.value,
                      }))
                    }
                  />
                  <input
                    type="number"
                    className="border-b-2 p-1 pl-0 text-sm px-1 outline-none w-36"
                    placeholder="Price"
                    name="price"
                    onChange={(e) =>
                      setExtra((prevState) => ({
                        ...prevState,
                        [e.target.name]: e.target.value,
                      }))
                    }
                  />
                  <button
                    onClick={SetOptions}
                    className="bg-primary rounded-md px-4 py-2 text-white"
                  >
                    Add
                  </button>
                </div>
              </div>
              <div>
                {extraOptions.length > 0 &&
                  extraOptions.map((extra, i) => (
                    <span
                      key={i}
                      className="border-2 rounded-md text-red-400 border-red-400 px-2 py-1 my-2 cursor-pointer mx-1"
                      onClick={() => DeleteOptions(i)}
                    >
                      {extra.text}
                    </span>
                  ))}
              </div>
              <div className="flex flex-col my-3 space-y-1 ">
                <button
                  className="bg-green-400 text-white rounded-md px-2 py-4 my-2 "
                  onClick={() => handleCreate()}
                >
                  Create
                </button>
              </div>
            </div>
          </div>
        </div>
      </OutsideClickHandler>
    </div>
  );
};

export default AddNewProduct;
