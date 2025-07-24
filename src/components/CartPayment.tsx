"use client";

import { SiMediamarkt } from "react-icons/si";
import FormattedPrice from "./FormattedPrice";
import { useSelector } from "react-redux";
import { StateProps, StoreProduct } from "../../type";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

const CartPayment = () => {
  const { productData, userInfo } = useSelector(
    (state: StateProps) => state.next
  );
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    const amt = productData.reduce(
      (acc: number, item: StoreProduct) =>
        acc + item.price * (item.quantity || 1),
      0
    );
    setTotalAmount(amt);
  }, [productData]);

  const handleCheckout = () => {
    if (productData.length === 0) return;
    router.push("/checkout");
  };

  const isLoggedIn = !!session || !!userInfo;
  const isCartEmpty = productData.length === 0;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2">
        <span className="bg-green-600 rounded-full p-1 h-6 w-6 text-sm text-white flex items-center justify-center mt-1">
          <SiMediamarkt />
        </span>
        <p className="text-sm">
          Your order qualifies for{" "}
          <span className="font-semibold">FREE Shipping</span> by choosing this
          option at checkout. See details...
        </p>
      </div>

      <p className="flex items-center justify-between px-2 font-semibold">
        Total:{" "}
        <span className="font-bold text-xl">
          <FormattedPrice amount={totalAmount} />
        </span>
      </p>

      {isLoggedIn ? (
        <div className="flex flex-col items-center w-full">
          <button
            onClick={handleCheckout}
            disabled={isCartEmpty}
            className={`w-full h-10 text-sm font-semibold rounded-lg duration-300 ${
              isCartEmpty
                ? "bg-gray-400 cursor-not-allowed text-white"
                : "bg-amazon_blue text-white hover:bg-amazon_yellow hover:text-black"
            }`}
          >
            {isCartEmpty ? "Cart is Empty" : "Proceed to Buy"}
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center w-full">
          <button
            disabled
            className="w-full h-10 text-sm font-semibold bg-amazon_blue bg-opacity-50 text-white rounded-lg cursor-not-allowed"
          >
            Proceed to Buy
          </button>
          <p className="text-xs mt-1 text-red-500 font-semibold animate-bounce">
            Please login to continue
          </p>
        </div>
      )}
    </div>
  );
};

export default CartPayment;
