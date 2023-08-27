import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import { Store } from "../Store";

export default function SettingsScreen() {
    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { userInfo } = state;
    const [selectedImage, setSelectedImage] = useState(null);
    const [addImage, setAddImage] = useState(null);
    const nameRef = useRef();
    const emailRef = useRef();
    const handleDrop = (event) => {
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        setSelectedImage(URL.createObjectURL(file));
        setAddImage(file);
    };
    const handleDragOver = (event) => {
        event.preventDefault();
    };
    const submitHandler = async(e) => {
        e.preventDefault();
        const instance = axios.create({
            baseURL: 'http://localhost:5000'
        })
        const name = nameRef.current.value;
        const email = emailRef.current.value;
        let fileName;
        if(addImage){
            fileName = addImage.name;
            const formData = new FormData();
            formData.append('image', addImage);
            await instance.post('/image', formData);
        }
        const updatedUser = {};
        if (name) {
            updatedUser.name = name;
        }
        if (email) {
            updatedUser.email = email;
        }
        if (fileName) {
            updatedUser.fileName = fileName;
        }
        if(userInfo.isAdmin){
            updatedUser.isAdmin = true;
        }
        else{
            updatedUser.isAdmin = false;
        }
        if(userInfo.isModer){
            updatedUser.isModer = true;
        }
        else{
            updatedUser.isModer = false;
        }
        console.log(updatedUser);
        const {data} = await instance.patch(`/api/users/${userInfo._id}`, updatedUser);
        ctxDispatch({ type: 'USER_SIGNIN', payload: data });
        localStorage.setItem('userInfo', JSON.stringify(data));
    }
    return (
        <div className="py-10 px-96">
            <form className="space-y-8 divide-y divide-gray-200">
                <div className="space-y-8 divide-y divide-gray-200">
                    <div>
                        <div>
                            <h3 className="text-lg font-medium leading-6 text-gray-900">Профиль</h3>
                            <p className="mt-1 text-sm text-gray-500">
                                Эта информация отображаемая, так что будьте аккуратны с изменением данных.
                            </p>
                        </div>

                        <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                            <div className="sm:col-span-4">
                                <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                                    Имя пользователя
                                </label>
                                <div className="mt-1 flex rounded-md shadow-sm">
                                    <input
                                        type="text"
                                        name="username"
                                        id="username"
                                        ref={nameRef}
                                        autoComplete="username"
                                        className="block w-full min-w-0 flex-1 rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    />
                                </div>
                            </div>
                            <div className="sm:col-span-6">
                                <label htmlFor="photo" className="block text-sm font-medium text-gray-700">
                                    Фотография
                                </label>
                                <div className="mt-1 flex items-center">
                                    <span className="h-36 w-36 overflow-hidden rounded-full bg-gray-100">
                                        <img className="inline-block h-36 w-36 rounded-full" src={selectedImage ? selectedImage : userInfo.profileImage}>
                                        </img>
                                    </span>
                                </div>
                            </div>

                            <div className="sm:col-span-6">
                                <label htmlFor="cover-photo" className="block text-sm font-medium text-gray-700">
                                    Добавление изображения
                                </label>
                                <div className="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6" onDrop={handleDrop} onDragOver={handleDragOver}>
                                    <div className="space-y-1 text-center">
                                        <svg
                                            className="mx-auto h-12 w-12 text-gray-400"
                                            stroke="currentColor"
                                            fill="none"
                                            viewBox="0 0 48 48"
                                            aria-hidden="true"
                                        >
                                            <path
                                                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                                strokeWidth={2}
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                        <div className="flex text-sm text-gray-600" >
                                            <label
                                                htmlFor="file-upload"
                                                className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500"
                                            >
                                                <span>Загрузите файл</span>
                                                <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                                            </label>
                                            <p className="pl-1">или перетащите и отпустите</p>
                                        </div>
                                        <p className="text-xs text-gray-500">PNG, JPG до 10MB</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="pt-8">
                        <div>
                            <h3 className="text-lg font-medium leading-6 text-gray-900">Персональная информация</h3>
                            <p className="mt-1 text-sm text-gray-500">Используйте работающую почту для того чтобы получать сообщения.</p>
                        </div>
                        <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                            <div className="sm:col-span-4">
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    Почта
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        ref={emailRef}
                                        autoComplete="email"
                                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="pt-5">
                    <div className="flex justify-end">
                        <button
                            onClick={submitHandler}
                            className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                            Сохранить изменения
                        </button>
                    </div>
                </div>
            </form>
        </div>

    )
}