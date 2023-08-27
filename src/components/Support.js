import axios from "axios";
import { useContext, useState } from "react";
import { Store } from "../Store";
export default function Support() {
    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { userInfo } = state;
    const [message, setMessage] = useState('');
    const handlerChange = (e) => {
        setMessage(e.target.value);
    }
    const instance = axios.create({
        baseURL: 'http://localhost:5000',
    });
    const handlerSend = async (e) => {
        e.preventDefault();
        const email = userInfo.email;
        await instance.post('/api/send-mail/', { message, email }).then(
            response => console.log(response.data)
        ).catch(err => { console.log(err) });
    }
    return (
        <div>

            <div className='px-20 sm:px-20 lg:px-96 lg:pb-20 lg:pt-10'>
                <div className='text-3xl font-bold mb-4 flex flex-col items-center'>
                    Связь с администрацией
                </div>
                <input
                    id="text"
                    type="text"
                    name="text"
                    className=" block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    onChange={handlerChange}
                    value={message}
                ></input>
                <button className="inline-flex w-full mt-4 justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 sm:w-auto" onClick={handlerSend}>Отправить письмо</button>
            </div>
        </div>
    )
}