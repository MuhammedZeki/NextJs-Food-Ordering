import { addProducts } from "@/lib/features/CardSlicer";
import Image from "next/image";
import Link from "next/link";
import { FaShoppingCart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

const MenuItems = ({ product }) => {
  const { products } = useSelector((state) => state.cart);
  const isChecked = products.find((prev) => prev._id === product._id);
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(
      addProducts({
        product: {
          ...product,
          extraOptions: {
            text: "Empty",
          },
        },
        price: product.prices[0],
        quantity: 1,
      })
    );
  };
  return (
    <div className="bg-secondary rounded-2xl">
      <div
        className="bg-[#f1f2f3] flex justify-center 
        p-6 rounded-bl-[45px] rounded-tl-xl rounded-tr-xl"
      >
        <div className="relative h-36 w-36 hover:scale-110 transition-all duration-300 cursor-pointer">
          <Link href={`/productDetails/${product._id}`}>
            <Image
              src={product.image}
              fill
              alt=""
              style={{ objectFit: "cover" }}
            />
          </Link>
        </div>
      </div>
      <div className="text-white flex flex-col p-6 my-3">
        <h4 className="text-xl">{product.title}</h4>
        <p className="text-sm py-1">{product.description}</p>
        <div className="flex items-center justify-between my-1">
          <span>${product.prices[0]}</span>
          <button
            className={`bg-primary 
                flex items-center justify-center  rounded-full p-2 ${
                  isChecked ? "bg-gray-400 cursor-not-allowed" : ""
                }`}
            disabled={isChecked}
            onClick={handleClick}
          >
            <FaShoppingCart size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuItems;
