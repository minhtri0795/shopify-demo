import React, { useContext } from "react";
import { ShopContext } from "../../context/shopContext";
import Image from "next/image";
import { parseShopifyResponse } from "../../lib/shopify";
const Cart = () => {

  const { isCartOpen, checkout, closeCart } = useContext(ShopContext);
  let data = parseShopifyResponse(checkout)
  return (
   <>
     <div className={`absolute right-5 rounded-md px-5 py-5 bg-white shadow-xl z-10 ${isCartOpen? 'block': 'hidden'}`}>
      <div className="side-content">
        <div className="cart-content-container">
              {data.lineItems &&
                data.lineItems.map((item:any) => (
                  <div key={item.id} className="flex items-center my-3">
                    <Image
                      width={100}
                      height={100}
                      src={item.variant.image.src}
                      alt={item.title}
                    />
                    <div className="item-content ml-3 flex items-center">
                      <div className="title">{item.title}</div>
                      <div className="quantity mx-4 border p-2 border-solid">{item.quantity}</div>
                      <div className="mr-4">x</div>
                      <div className="price">TWD {item.variant.price.amount}</div>
                    </div>
                  </div>
                ))}
        </div>
        <a href={checkout.webUrl} className="bg-[#ff013f] text-white px-4 py-3 grid place-items-center mt-10 text-xl">Checkout items</a>
      </div>
    </div>
    {isCartOpen&&<div onClick={() => closeCart()} className="absolute top-0 left-0 w-full h-full z-[5]" />}
   </>
  );
};
export default Cart;