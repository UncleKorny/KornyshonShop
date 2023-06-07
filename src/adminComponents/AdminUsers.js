import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Store } from "../Store";
// import { Store } from "../Store";
export default function AdminUsers(){
    const [editableRow, setEditableRow] = useState(-1);
    const [people, setPeople] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { userInfo } = state;
    const handleEditClick = (index) => {
        setEditableRow(index);
        setIsEditing(true);
    };
    const instance = axios.create({
      baseURL: 'http://localhost:5000',
    });
    // const {state, dispatch: ctxDispatch} = useContext(Store);
    // const {userInfo} = state;
    const handleSaveClick = (index) => {
      handleInputChange(null, index);
      setIsEditing(false);
      setEditableRow(-1);
      const updatedUser = people[index];
      instance.patch(`/api/users/${updatedUser._id}`, updatedUser).then(
        (response) =>{
          // console.log(response.data);
          setIsEditing(false);
          setEditableRow(-1);
        }
      ).catch((error) => {
        console.log(error);
      });
      console.log(updatedUser);
    };
    const handleRoleChange = (event, index, key) => {
      const newPeopls = [...people];
      newPeopls[index].isAdmin = event.target.value === 'admin';
      newPeopls[index].isModer = event.target.value === 'moder';
      // console.log(event.target.value === 'admin');
      setPeople(newPeopls);
    }
    const handleInputChange = (event, index, key) => {
        const newPeople = [...people];
        newPeople[index][key] = event ? event.target.value : newPeople[index][key];
        setPeople(newPeople); // Обновление состояния people  
    };
    useEffect(()=>{
      // console.log(people);
    }, [people])

    const handleDeleteClick = (index) =>{
      const confirmation = window.confirm(`Вы действительно хотите удалить ${people[index].name}?`);
      if (confirmation) {
        const newPeople = [...people];
        const _id = newPeople[index]._id;
        if(_id === userInfo._id){
          // localStorage.removeItem('userInfo');
          alert("Вы не можете удалить сами себя!");
          return;
        }
        newPeople.splice(index, 1);
        setPeople(newPeople);
        // console.log(_id);
        instance.delete(`/api/users/${_id}`).then(
          response =>{
            // console.log(response.data);
            // localStorage.removeItem('userInfo');
          }
        ).catch(error=>{
          console.log(error);
        })
      } 
      // console.log(people);
    }
    const renderCell = (value, index, key) => {
          if (index === editableRow) {
            if(key === "role"){
              // console.log(value);
              return (
                <td key={`${index}-${key}`}>
                    <select defaultValue={value === "Пользователь" ? "user" : value === "Модератор" ? "moder" : "admin"}  onChange={(e) => handleRoleChange(e, index, key)}>
                        <option value="user">Пользователь</option> 
                        <option value="admin">Администратор</option>
                        <option value="moder">Модератор</option>
                    </select>
                </td>
              );
            }
            else{
              return (
                <td key={`${index}-${key}`}>
                  <input type="text" value={value} onChange={(e) => handleInputChange(e, index, key)} />
                </td>
              );
            }
          } else {
            return <td key={`${index}-${key}`}>{value}</td>;
          }
    };    
    const renderRow = (person, index) => {
      const date = new Date(person.createdAt);
      const formattedDate = date.toLocaleString();
        return (
            <tr key={person._id}>
            {renderCell(person.name, index, "name")}
            {renderCell(formattedDate, index, "createdAt")}
            {renderCell(person.email, index, "email")}
            {person.isModer ? renderCell("Модератор", index, "role") : person.isAdmin ? renderCell("Администратор", index, "role") : renderCell("Пользователь", index, "role")}
            
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
        );
    };
    useEffect(()=>{
      const fetchData = async () => {
        const instance = axios.create({
          baseURL: 'http://localhost:5000',
        });
    
        instance.get('/api/users').then(
          response =>{
            setPeople(response.data);
        }).catch(error =>{
            console.log(error);
        });
      }
      fetchData();
    }, []);
    return (
    <div className="px-4 sm:px-6 lg:px-6 lg:pb-20 lg:pt-10 2xl:px-80">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">Пользователи</h1>
          <p className="mt-2 text-sm text-gray-700">
            Список пользователей, включающий в себя имя, дату создания, почту и роль.
          </p>
        </div>
      </div>
      <div className="-mx-4 mt-8 overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:-mx-6 md:mx-0 md:rounded-lg">
        <table className="min-w-full divide-y divide-gray-300">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                Имя
              </th>
              <th
                scope="col"
                className=" px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
              >
                Дата создания
              </th>
              <th
                scope="col"
                className=" px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell"
              >
                Email
              </th>
              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                Роль
              </th>
              <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                <span className="sr-only">Изменить</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
          {people.map((person, index) => renderRow(person, index, `person-${index}`))}
          </tbody>
        </table>
      </div>
    </div>
    )
}