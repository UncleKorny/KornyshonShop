import axios from "axios";
import { useEffect, useRef, useState, Fragment } from "react";
import { Dialog, Transition } from '@headlessui/react'
import { XIcon } from '@heroicons/react/solid'
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/outline'
export default function SimvolikaScreen() {
  const [editableRow, setEditableRow] = useState(-1);
  const [people, setPeople] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [open, setOpen] = useState(false)
  const [discountOpen, setDiscountOpen] = useState(false);
  const [filters, setFilters] = useState();
  const [selectedValue, setSelectedValue] = useState("");
  const [selectedTypeDiscount, setSelectedTypeDiscount] = useState('');
  const [successShow, setSuccessShow] = useState(false);
  const [problemShow, setProblemShow] = useState(false);
  const cancelButtonRef = useRef(null)

  const handleEditClick = (index) => {
    setEditableRow(index);
    setIsEditing(true);
  };
  const instance = axios.create({
    baseURL: 'http://localhost:5000',
  });
  const handleSaveClick = (index) => {
    handleInputChange(null, index);
    setIsEditing(false);
    setEditableRow(-1);

    const updatedProduct = people[index];
    instance.patch(`/api/simvolika/${updatedProduct._id}`, updatedProduct).then(
      (response) => {
        console.log(response.data);
        setIsEditing(false);
        setEditableRow(-1);
      }
    ).catch((error) => {
      console.log(error);
    });
    // console.log(updatedProduct);
  };
  const handleInputChange = (event, index, key) => {
    const newPeople = [...people];
    newPeople[index][key] = event ? event.target.value : newPeople[index][key];
    setPeople(newPeople); // Обновление состояния people  
  };
  useEffect(() => {
    // console.log(people);
  }, [people])
  const deleteImage = async (filename) => {
    try {
      const response = await instance.delete(`${filename}`);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const handleDeleteClick = (index) => {
    const confirmation = window.confirm(`Вы действительно хотите удалить ${people[index].name}?`);
    if (confirmation) {
      const newPeople = [...people];
      const _id = newPeople[index]._id;
      newPeople.splice(index, 1);
      setPeople(newPeople);
      // console.log(_id);
      instance.delete(`/api/simvolika/${_id}`).then(
        response => {
          console.log(response.data);
          deleteImage(people[index].imageSrc[0].src);
        }
      ).catch(error => {
        console.log(error);
      })
    }
    // console.log(people);
  }
  const [selectedSelectValue, setSelectedSelectValue] = useState();
  const handleRoleChange = (e, index, key) => {
    const newPeopls = [...people];
    newPeopls[index].filter = e.target.value;
    setPeople(newPeopls);
  }
  const renderCell = (value, index, key) => {
    if (index === editableRow) {
      if (key === "filter") {
        return (
          <td key={`${index}-${key}`}>
            <select value={selectedSelectValue} onChange={(e) => handleRoleChange(e, index, key)}>
              {filters && filters.map((filter) => (
                <optgroup key={filter.id} label={filter.name} data-te-select-init data-te-select-filter="true">
                  {filter.options.map((filterr) => (
                    <option key={filterr._id} value={filterr.value}>{filterr.label}</option>
                  ))}
                </optgroup>
              ))}
            </select>
          </td>
        );
      }
      else {
        return (
          <td key={`${index}-${key}`}>
            <input type="text" value={value} onChange={(e) => handleInputChange(e, index, key)} />
          </td>
        );
      }
    }
    else {
      if (key === "description") {
        return <td key={`${index}-${key}`} className="max-w-lg pr-10" style={{ maxHeight: "2rem", overflowY: "auto", overflowX: "auto" }}>{value}</td>;
      }
      else return <td key={`${index}-${key}`} className="max-w-lg pr-10">{value}</td>;
    }
  };
  const renderRow = (person, index) => {
    //   const date = new Date(person.createdAt);
    //   const formattedDate = date.toLocaleString();
    return (
      <tr key={person._id}>
        {renderCell(person.name, index, "name")}
        {renderCell(person.description, index, "description")}
        {renderCell(person.countInStock, index, "countInStock")}
        {renderCell(person.price, index, "price")}
        {renderCell(person.filter, index, "filter")}


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
  useEffect(() => {
    const fetchData = async () => {
      const instance = axios.create({
        baseURL: 'http://localhost:5000',
      });

      instance.get('/api/simvolika').then(
        response => {
          setPeople(response.data);
        }).catch(error => {
          console.log(error);
        });
    }
    fetchData();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      const instance = axios.create({
        baseURL: 'http://localhost:5000',
      });
      instance.get('/api/filters').then(
        response => {
          setFilters(response.data);
        }).catch(error => {
          console.log(error);
        });
    }
    fetchData();
  }, []);
  const handleSelectChange = (e) => {
    setSelectedValue(e.target.value);
  }
  const [selectedFile, setSeletedFile] = useState(null);
  const handleFileInput = (event) => {
    setSeletedFile(event.target.files[0]);
    // console.log(event.target.files[0]);
  }
  const handleSelectTypeDiscountChange = (e) => {
    setSelectedTypeDiscount(e.target.value);
  }
  const nameDiscountRef = useRef();
  const countDiscountRef = useRef();
  const amountDiscountRef = useRef();
  const handlerAddDiscountButton = async (event) => {
    event.preventDefault();
    const nameDiscountValue = nameDiscountRef.current.value;
    const countDiscountValue = countDiscountRef.current.value;
    const amountDiscountValue = amountDiscountRef.current.value;
    const typeDiscountValue = selectedTypeDiscount;
    const newDiscount = {
      nameDiscountValue,
      countDiscountValue,
      amountDiscountValue,
      typeDiscountValue
    }
    try {
      const response = await instance.post('/api/discount/addDiscount', newDiscount);
      console.log(response.data);
    }
    catch (err) {

    }

  }
  const nameProductRef = useRef();
  const countInStockRef = useRef();
  const descriptionRef = useRef();
  const priceRef = useRef();
  const handlerAddButton = async (event) => {
    event.preventDefault();
    const nameProductValue = nameProductRef.current.value;
    const countInStockValue = countInStockRef.current.value;
    const descriptionValue = descriptionRef.current.value;
    const priceValue = priceRef.current.value;
    const filterValue = selectedValue;
    const fileName = selectedFile.name;
    const newProduct = {
      nameProductValue,
      countInStockValue,
      descriptionValue,
      priceValue,
      filterValue,
      fileName
    }
    const formData = new FormData();
    formData.append('image', selectedFile);
    try {
      const response = await instance.post('/api/simvolika/addProduct', newProduct);
      const fileResponse = await instance.post('/image', formData);
      console.log(fileResponse.data);
      console.log(response.data);
      setSuccessShow(true);
    } catch (error) {
      console.log(error);
      setProblemShow(true);
    }
  }
  return (
    <div className="px-4 sm:px-6 lg:px-40 lg:pb-20 lg:pt-10">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">Символика</h1>
          <p className="mt-2 text-sm text-gray-700">
            Список товаров, включающий в себя название, ссылку, количество, цену и изображение.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
          >
            Добавить товар
          </button>
          <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
              </Transition.Child>

              <div className="fixed inset-0 z-10 overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    enterTo="opacity-100 translate-y-0 sm:scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                    leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  >
                    <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                      <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                        <div className="sm:items-start">
                          <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                            <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                              Добавление товара
                            </Dialog.Title>
                            <div className="mt-2">
                              <p className="text-sm text-gray-500">
                                Здесь вы можете добавить товар.
                              </p>
                              <form className="mt-6" encType="multipart/form-data">
                                <div className="mt-2">
                                  <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
                                    Название товара
                                  </label>
                                  <div className="mt-1">
                                    <input
                                      type="text"
                                      id="nameProduct"
                                      name="nameProduct"
                                      autoComplete="nameProduct"
                                      ref={nameProductRef}
                                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    />
                                  </div>
                                </div>
                                <div className="mt-2">
                                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                                    Количество в наличии
                                  </label>
                                  <div className="mt-1">
                                    <input
                                      type="text"
                                      name="countInStock"
                                      id="countInStock"
                                      autoComplete="countInStock"
                                      ref={countInStockRef}
                                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    />
                                  </div>
                                </div>
                                <div className="mt-2">
                                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                                    Описание
                                  </label>
                                  <div className="mt-1">
                                    <input
                                      type="text"
                                      name="description"
                                      id="description"
                                      autoComplete="description"
                                      ref={descriptionRef}
                                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    />
                                  </div>
                                </div>
                                <div className="mt-2">
                                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                                    Цена
                                  </label>
                                  <div className="mt-1">
                                    <input
                                      type="text"
                                      name="price"
                                      id="price"
                                      autoComplete="price"
                                      ref={priceRef}
                                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    />
                                  </div>
                                </div>
                                <div className="mt-2">
                                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                                    Категория
                                  </label>
                                  <div className="mt-1">
                                    <select defaultValue={selectedValue} onChange={handleSelectChange} className="block appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                                      <option value="" disabled>Выберите фильтр</option>
                                      {filters && filters.map((filter) => (
                                        <optgroup key={filter.id} label={filter.name} data-te-select-init data-te-select-filter="true">
                                          {filter.options.map((filterr) => (
                                            <option key={filterr._id} value={filterr.value}>{filterr.label}</option>
                                          ))}
                                        </optgroup>
                                      ))}
                                    </select>
                                  </div>
                                </div>
                                <div className="mt-2">
                                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                                    Изображение
                                  </label>
                                  <div className="mt-1">
                                    <input
                                      type="file"
                                      name="filedata"
                                      id="files"
                                      autoComplete="files"
                                      onChange={handleFileInput}
                                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    />
                                  </div>
                                </div>

                              </form>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                        <button
                          type="button"
                          className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 sm:ml-3 sm:w-auto"
                          onClick={(event) => {
                            handlerAddButton(event);
                            setOpen(false)
                          }}
                        >
                          Добавить
                        </button>
                        <button
                          type="button"
                          className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                          onClick={() => setOpen(false)}
                          ref={cancelButtonRef}
                        >
                          Отменить
                        </button>
                      </div>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </Dialog>
          </Transition.Root>
          <Transition.Root show={discountOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setDiscountOpen}>
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
              </Transition.Child>

              <div className="fixed inset-0 z-10 overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    enterTo="opacity-100 translate-y-0 sm:scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                    leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  >
                    <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                      <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                        <div className="sm:items-start">
                          <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                            <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                              Добавление купона на скидку.
                            </Dialog.Title>
                            <div className="mt-2">
                              <p className="text-sm text-gray-500">
                                Здесь вы можете добавить купон.
                              </p>
                              <form className="mt-6" encType="multipart/form-data">
                                <div className="mt-2">
                                  <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
                                    Содержание купона
                                  </label>
                                  <div className="mt-1">
                                    <input
                                      type="text"
                                      id="nameProduct"
                                      name="nameProduct"
                                      autoComplete="nameProduct"
                                      ref={nameDiscountRef}
                                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    />
                                  </div>
                                </div>
                                <div className="mt-2">
                                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                                    Количество использований
                                  </label>
                                  <div className="mt-1">
                                    <input
                                      type="text"
                                      name="countInStock"
                                      id="countInStock"
                                      autoComplete="countInStock"
                                      ref={countDiscountRef}
                                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    />
                                  </div>
                                </div>
                                <div className="mt-2">
                                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                                    Размер скидки
                                  </label>
                                  <div className="mt-1">
                                    <input
                                      type="text"
                                      name="description"
                                      id="description"
                                      autoComplete="description"
                                      ref={amountDiscountRef}
                                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    />
                                  </div>
                                </div>
                                <div className="mt-2">
                                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                                    Категория
                                  </label>
                                  <div className="mt-1">
                                    <select defaultValue={selectedTypeDiscount} onChange={handleSelectTypeDiscountChange} className="block appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                                      <option value="" disabled>Выберите тип</option>
                                      <option value="percent">Скидка в %</option>
                                      <option value="currency">Скидка в валюте</option>
                                    </select>
                                  </div>
                                </div>


                              </form>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                        <button
                          type="button"
                          className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 sm:ml-3 sm:w-auto"
                          onClick={(event) => {
                            handlerAddDiscountButton(event);
                            setDiscountOpen(false)
                          }}
                        >
                          Добавить
                        </button>
                        <button
                          type="button"
                          className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                          onClick={() => setDiscountOpen(false)}
                          ref={cancelButtonRef}
                        >
                          Отменить
                        </button>
                      </div>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </Dialog>
          </Transition.Root>
        </div>
      </div>
      <div className="-mx-4 mt-8 overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:-mx-6 md:mx-0 md:rounded-lg">
        <table className="min-w-full divide-y divide-gray-300">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="py-3.5 pl-4 pr-3 w-32 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                Название
              </th>
              <th scope="col" className="py-3.5 pl-4 pr-3 w-64 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                Описание
              </th>
              <th
                scope="col"
                className="px-1 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell"
              >
                Количество в наличии
              </th>
              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                Цена
              </th>
              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                Категория
              </th>
              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                Изображения
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
      <div
        aria-live="assertive"
        className="pointer-events-none fixed inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6"
      >
        <div className="flex w-full flex-col items-center space-y-4 sm:items-end">
          {/* Notification panel, dynamically insert this into the live region when it needs to be displayed */}
          <Transition
            show={successShow}
            as={Fragment}
            enter="transform ease-out duration-300 transition"
            enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
            enterTo="translate-y-0 opacity-100 sm:translate-x-0"
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
              <div className="p-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <CheckCircleIcon className="h-6 w-6 text-green-400" aria-hidden="true" />
                  </div>
                  <div className="ml-3 w-0 flex-1 pt-0.5">
                    <p className="text-sm font-medium text-gray-900">Товар успешно добавлен!</p>
                  </div>
                  <div className="ml-4 flex flex-shrink-0">
                    <button
                      type="button"
                      className="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      onClick={() => {
                        setSuccessShow(false)
                      }}
                    >
                      <span className="sr-only">Закрыть</span>
                      <XIcon className="h-5 w-5" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </div>
      <div
        aria-live="assertive"
        className="pointer-events-none fixed inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6"
      >
        <div className="flex w-full flex-col items-center space-y-4 sm:items-end">
          {/* Notification panel, dynamically insert this into the live region when it needs to be displayed */}
          <Transition
            show={problemShow}
            as={Fragment}
            enter="transform ease-out duration-300 transition"
            enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
            enterTo="translate-y-0 opacity-100 sm:translate-x-0"
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
              <div className="p-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <XCircleIcon className="h-6 w-6 text-red-400" aria-hidden="true" />
                  </div>
                  <div className="ml-3 w-0 flex-1 pt-0.5">
                    <p className="text-sm font-medium text-gray-900">Ошибка при добавлении товара!</p>
                  </div>
                  <div className="ml-4 flex flex-shrink-0">
                    <button
                      type="button"
                      className="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      onClick={() => {
                        setProblemShow(false)
                      }}
                    >
                      <span className="sr-only">Закрыть</span>
                      <XIcon className="h-5 w-5" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </div>

    </div>
  )
}