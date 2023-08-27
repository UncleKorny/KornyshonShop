import axios from "axios";
import { useContext } from "react";
import { Store } from "../Store";
import { useLocation } from "react-router-dom";

export default function Shipping() {
    const { state } = useContext(Store);
    const { cart, userInfo } = state;
    // console.log(cart.cartItems);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const totalAmount = queryParams.get('totalPrice');
    const instance = axios.create({
        baseURL: 'http://localhost:5000',
    });
    const createOrderHandler = async (e) => {
        e.preventDefault();
        const newOrder = {
            products: cart.cartItems,
            user: userInfo._id,
            status: "in progress",
            totalPrice: totalAmount
        }
        await instance.post('/api/orders/addOrder', newOrder);
        localStorage.removeItem('cartItems');
        window.location.reload();

    }
    return (
        <div className="my-48 flex justify-center items-center flex-col">
            <p className="mb-10 text-3xl">
                Имитация покупки товаров!
            </p>
            <button
                onClick={createOrderHandler}
                className="flex max-w-xs flex-1 items-center justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-8 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50 sm:w-full sm:mb-10"
            >
                Заказать
            </button>
        </div>
    )
}