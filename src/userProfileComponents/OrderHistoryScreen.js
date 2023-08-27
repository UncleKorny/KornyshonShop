import axios from "axios";
import { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Store } from "../Store";

export default function OrderHistoryScreen() {
    const [orders, setOrders] = useState();
    const instance = axios.create({
        baseURL: 'http://localhost:5000'
    });
    const { state } = useContext(Store);
    const { userInfo } = state;
    useEffect(() => {
        const fetchData = async () => {
            const response = await instance.get(`/api/orders/${userInfo._id}`);
            setOrders(response.data);
        }
        fetchData();
    })
    const renderCell = (value, index, key) => {
        if (Array.isArray(value)) {
            value = value.map(product => product.name).join(', '); // Преобразование массива в строку
        }
        return <td key={`${index}-${key}`} className="max-w-lg pr-10">{value}</td>;
    };
    const renderRow = (person, index) => {
        return (
            <tr key={person._id}>
                {renderCell(person._id, index, "order")}
                {renderCell(person.products, index, "products")}
                {renderCell(person.totalPrice, index, "totalPrice")}
                {renderCell(person.status, index, "status")}
            </tr>
        )
    }
    return (
        <div className="-mx-4 mt-8 overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:-mx-6 md:mx-0 md:rounded-lg">
            <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                    <tr>
                        <th scope="col" className="py-3.5 pl-4 pr-3 w-64 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                            № заказа
                        </th>
                        <th scope="col" className="py-3.5 pl-4 pr-3 w-64 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                            Товары
                        </th>
                        <th
                            scope="col"
                            className="px-1 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell"
                        >
                            Полная цена
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                            Статус заказа
                        </th>

                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                    {orders && orders.map((person, index) => renderRow(person, index, `person-${index}`))}
                </tbody>
            </table>
        </div>
    )
}
