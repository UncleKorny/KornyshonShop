import axios from "axios";
import { useEffect, useState } from "react";

export default function OrdersScreen() {
    const [orders, setOrders] = useState([]);
    const [editableRow, setEditableRow] = useState(-1);
    const [isEditing, setIsEditing] = useState(false);
    const [status, setStatus] = useState('');
    const instance = axios.create({
        baseURL: 'http://localhost:5000'
    })
    useEffect(() => {
        const fetchData = async () => {
            const response = await instance.get('/api/orders/');
            setOrders(response.data);
        }
        fetchData();
    }, [])
    const handleEditClick = (index) => {
        setEditableRow(index);
        setIsEditing(true);
    };
    const handleDeleteClick = (index) => {
        const confirmation = window.confirm(`Вы действительно хотите удалить №${orders[index]._id}?`);
        if (confirmation) {
            const newPeople = [...orders];
            const _id = newPeople[index]._id;
            newPeople.splice(index, 1);
            setOrders(newPeople);
            // console.log(_id);
            instance.delete(`/api/orders/${_id}`).then(
                response => {
                    console.log(response.data);
                }
            ).catch(error => {
                console.log(error);
            })
        }
        // console.log(people);
    }
    const handleInputChange = (event, index, key) => {
        setStatus(event ? event.target.value : '');
        const newPeople = [...orders];
        newPeople[index].status = event ? event.target.value : newPeople[index].status;
        setOrders(newPeople); // Обновление состояния people  
    };
    const handleSaveClick = (index) => {
        handleInputChange(null, index);
        setIsEditing(false);
        setEditableRow(-1);
        const updatedOrder = orders[index];
        const newStatus = {
            status: status
        }
        console.log(status);
        instance.patch(`/api/orders/${updatedOrder._id}`, newStatus).then(
            (response) => {
                console.log(response.data);
                setIsEditing(false);
                setEditableRow(-1);
            }
        ).catch((error) => {
            console.log(error);
        });
        // console.log(updatedOrder);
    };
    const renderCell = (value, index, key) => {
        if (Array.isArray(value)) {
            value = value.map(product => product.name).join(', '); // Преобразование массива в строку
        }
        // return <td key={`${index}-${key}`} className="max-w-lg pr-10">{value}</td>;
        if (index === editableRow) {
            if (key === 'status') {
                return (
                    // <td key={`${index}-${key}`}>
                    //     <input type="text" value={value} onChange={(e) => handleInputChange(e, index, key)} />
                    // </td>
                        <td key={`${index}-${key}`}>
                            <select defaultValue={value === "В процессе" ? "in progress" : value === "Успешно" ? "success" : "failure"} onChange={(e) => handleInputChange(e, index, key)}>
                                <option value="in progress">В процессе</option>
                                <option value="success">Успешно</option>
                                <option value="failure">Неудачно</option>
                            </select>
                        </td>

                );
            }
            else {
                return <td key={`${index}-${key}`} className="max-w-lg pr-10">{value}</td>;
            }
        }
        else {
            return <td key={`${index}-${key}`} className="max-w-lg pr-10">{value}</td>;
        }
    };
    const renderRow = (person, index) => {
        return (
            <tr key={person._id}>
                {renderCell(person._id, index, "order")}
                {renderCell(person.user.name, index, "name")}
                {renderCell(person.products, index, "products")}
                {renderCell(person.totalPrice, index, "totalPrice")}
                {/* {renderCell(person.status, index, "status")} */}
                {person.status === "in progress" ? renderCell("В процессе", index, "status") : person.status === "success" ? renderCell("Успешно", index, "status") : renderCell("Неудачно", index, "status")}
                <td className="py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                    {isEditing && editableRow === index ? (
                        <button
                            className="text-indigo-600 hover:text-indigo-900"
                            onClick={() => handleSaveClick(index)}
                        >
                            Сохранить<span className="sr-only">, {person.name}</span>
                        </button>
                    ) : (
                        <div>
                            <button
                                className="text-indigo-600 hover:text-indigo-900"
                                onClick={() => handleEditClick(index)}
                            >
                                Изменить<span className="sr-only">, {person.name}</span>
                            </button>
                            <button
                                className="text-indigo-600 hover:text-indigo-900 pl-10"
                                onClick={() => handleDeleteClick(index)}
                            >
                                Удалить<span className="sr-only">, {person.name}</span>
                            </button>
                        </div>

                    )}
                </td>
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
                            Имя пользователя
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
                        <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                            <span className="sr-only">Изменить</span>
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