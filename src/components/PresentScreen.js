import axios from "axios";
import { useParams } from "react-router-dom";

export default function PresentScreen() {
    const params = useParams();
    const { present } = params;
    const characters = 'abcdefghijklmnopqrstuvwxyz';
    

    const generateRandomWord = () => {
        let randomWord = '';
        for (let i = 0; i < 10; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            randomWord += characters[randomIndex];
        }
        return randomWord;
    };
    const createDiscountHandler = async (e) => {
        e.preventDefault();
        const nameDiscountValue = generateRandomWord();
        const countDiscountValue = 1;
        const amountDiscountValue = present;
        const typeDiscountValue = "currency";
        const instance = axios.create({
            baseURL: 'http://localhost:5000'
        });
        const response = await instance.post('/api/discount/addDiscount', {
            nameDiscountValue,
            countDiscountValue,
            amountDiscountValue,
            typeDiscountValue
        });
        console.log(response.data);
        alert(`Ваш промокод на ${present} byn: `+ nameDiscountValue);
    }
    return (
        <div className="my-48 flex justify-center items-center flex-col">
            <p className="mb-10 text-3xl">
                Имитация покупки купона!
            </p>
            <button
                onClick={createDiscountHandler}
                className="flex max-w-xs flex-1 items-center justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-8 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50 sm:w-full sm:mb-10"
            >
                Получить купон на {present} byn
            </button>
        </div>
    )
}