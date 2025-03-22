import Title from "@/app/ui/Title";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Products = () => {
  const [products, setProducts] = useState([]);

  const fetchProduct = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/addProduct`
      );
      if (res.status === 200) {
        setProducts(res.data);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleDelete = async (productId) => {
    try {
      const res = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/addProduct/${productId}`
      );
      if (res.status === 200) {
        toast.success("Product is deleted");
        setProducts((prevState) =>
          prevState.filter((product) => product._id !== productId)
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <div className="flex-1 lg:mt-0 mt-5">
      <Title addClass="text-[40px]">Products</Title>
      <div className="overflow-auto max-h-[400px] w-full mt-5">
        <table className="w-full text-sm text-center text-gray-500 min-w-[1000px]">
          <thead className="text-xs text-gray-400 uppercase bg-gray-700">
            <tr>
              <th scope="col" className="py-3 px-6">
                Image
              </th>
              <th scope="col" className="py-3 px-6">
                Id
              </th>
              <th scope="col" className="py-3 px-6">
                Title
              </th>
              <th scope="col" className="py-3 px-6">
                Price
              </th>
              <th scope="col" className="py-3 px-6">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 &&
              products.map((product) => (
                <tr
                  key={product._id}
                  className="transition-all bg-secondary border-gray-700 hover:bg-primary "
                >
                  <td className=" py-4 px-6 font-medium whitespace-nowrap hover:text-white flex items-center gap-x-1 justify-center">
                    <div className="relative w-10 h-10">
                      <Image
                        alt={product.title}
                        src={product.image}
                        fill
                        style={{ objectFit: "contain" }}
                      />
                    </div>
                  </td>
                  <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                    {product._id.substring(0, 5)}...
                  </td>
                  <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                    {product.title}
                  </td>
                  <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                    ${product.prices[0]}
                  </td>
                  <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                    <button
                      className="bg-red-500 rounded-md py-1 px-2 text-white"
                      onClick={() => handleDelete(product._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Products;
