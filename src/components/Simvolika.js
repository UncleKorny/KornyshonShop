import { Fragment, useEffect, useReducer, useRef, useState } from 'react'
import { Dialog, Disclosure, Transition } from '@headlessui/react'
import { ChevronDownIcon, PlusIcon } from '@heroicons/react/solid'
import { Link } from 'react-router-dom'
import axios from 'axios';
import LoadingBox from './LoadingBox';
const breadcrumbs = [
  { id: 1, name: 'Символика', href: '#' },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

// function Test(){
//   return <h1>adsf</h1>;
// }

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, products: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}
export default function Simvolika() {
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(10000);
  const [selectFilter, setSelectFilter] = useState({});
  const minPriceRef = useRef();
  const maxPriceRef = useRef();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filterss, setFilters] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const [{ loading, error, products }, dispatch] = useReducer(reducer, {
    products: [],
    loading: true,
    error: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      const instance = axios.create({
        baseURL: 'http://localhost:5000',
      });
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await instance.get('/api/simvolika');
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
        await instance.get('/api/filters').then(
          response => {
            setFilters(response.data);
          }).catch(error => {
            console.log(error);
          });

      }
      catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
      }
    };
    fetchData();
  }, []);
  const handlerSaveClick = (e) => {
    e.preventDefault();
    const minPriceValue = minPriceRef.current.value;
    const maxPriceValue = maxPriceRef.current.value;
    const filterSelect = selectFilter["type"] || selectFilter["material"];
    const newFilteredProducts = products.filter(
      (product) => Number(product.price) >= minPriceValue && Number(product.price) <= maxPriceValue
    );
    setFilteredProducts(newFilteredProducts);
    console.log(newFilteredProducts);
    // console.log(filteredProducts);
    // console.log(minPriceValue, maxPriceValue);
  }
  const onChangeFilter = (sectionId, optionValue) => {
    setSelectFilter(prevOptions => ({
      ...prevOptions,
      [sectionId]: optionValue,
    }));
  }
  const onHandlerResetFilters = (e) => {
    e.preventDefault();
    setSelectFilter({});
  }
  const handlerSearchChange = async (e) => {
    // setSearchValue(e.target.value);
    // console.log(e.target.value);
    const value = e.target.value;
    const instance = axios.create({
      baseURL: 'http://localhost:5000',
    });
    try {
      const response = await instance.get(`/api/simvolika/search?query=${value}`);
      setFilteredProducts(response.data);
    } catch (err) {

    }
  }
  return (
    <div className="bg-white">
      <div>
        {/* Mobile filter dialog */}
        <Transition.Root show={mobileFiltersOpen} as={Fragment}>
          <Dialog as="div" className="relative z-40 lg:hidden" onClose={setMobileFiltersOpen}>
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 z-40 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-6 shadow-xl">
                  <div className="flex items-center justify-between px-4">
                    <h2 className="text-lg font-medium text-gray-900">Фильтры</h2>
                    <button
                      type="button"
                      className="-mr-2 flex h-10 w-10 items-center justify-center p-2 text-gray-400 hover:text-gray-500"
                      onClick={() => setMobileFiltersOpen(false)}
                    >
                      <span className="sr-only">Close menu</span>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>

                    </button>
                  </div>

                  {/* Filters */}

                  <form className="mt-4">
                    {filterss && filterss.map((section) => (
                      <Disclosure as="div" key={section.name} className="border-t border-gray-200 pt-4 pb-4">
                        {({ open }) => (
                          <fieldset>
                            <legend className="w-full px-2">
                              <Disclosure.Button className="flex w-full items-center justify-between p-2 text-gray-400 hover:text-gray-500">
                                <span className="text-sm font-medium text-gray-900">{section.name}</span>
                                <span className="ml-6 flex h-7 items-center">
                                  <ChevronDownIcon
                                    className={classNames(open ? '-rotate-180' : 'rotate-0', 'h-5 w-5 transform')}
                                    aria-hidden="true"
                                  />
                                </span>
                              </Disclosure.Button>
                            </legend>
                            <Disclosure.Panel className="px-4 pt-4 pb-2">
                              <div className="space-y-6">
                                {section.options.map((option, optionIdx) => (
                                  <div key={option.value} className="flex items-center">
                                    <input
                                      id={`${section.id}-${optionIdx}-mobile`}
                                      name={`${section.id}[]`}
                                      defaultValue={option.value}
                                      type="checkbox"
                                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                    />
                                    <label
                                      htmlFor={`${section.id}-${optionIdx}-mobile`}
                                      className="ml-3 text-sm text-gray-500"
                                    >
                                      {option.label}
                                    </label>
                                  </div>
                                ))}
                              </div>
                            </Disclosure.Panel>
                          </fieldset>
                        )}
                      </Disclosure>
                    ))}
                    <div className="container mx-auto p-4">
                      <h1 className="text-2xl font-bold mb-4">Фильтрация по цене</h1>
                      <div className="flex items-center mb-4">
                        <span className="mr-2">Минимальная цена:</span>
                        <input
                          type="number"
                          value={minPrice}
                          onChange={(e) => setMinPrice(Number(e.target.value))}
                          // className="border p-1"
                          className='block w-36 appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
                        />
                      </div>
                      <div className="flex items-center mb-4">
                        <span className="mr-2">Максимальная цена:</span>
                        <input
                          type="number"
                          value={maxPrice}
                          onChange={(e) => setMaxPrice(Number(e.target.value))}
                          // className="border p-1"
                          className='block w-36 appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
                        />
                      </div>
                      <div className='flex items-center mb-4 py-4'>
                        <button
                          className="inline-flex items-center  justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
                          onClick={(e) => { handlerSaveClick(e) }}
                        >
                          Применить
                        </button>
                      </div>
                      {/* <ProductList minPrice={minPrice} maxPrice={maxPrice} /> */}
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        <div className="border-b border-gray-200">
          <nav aria-label="Breadcrumb" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <ol className="flex items-center space-x-4 py-4">
              {breadcrumbs.map((breadcrumb) => (
                <li key={breadcrumb.id}>
                  <div className="flex items-center">
                    <a href={breadcrumb.href} className="mr-4 text-sm font-medium text-gray-900">
                      {breadcrumb.name}
                    </a>
                    <svg
                      viewBox="0 0 6 20"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                      className="h-5 w-auto text-gray-300"
                    >
                      <path d="M4.878 4.34H3.551L.27 16.532h1.327l3.281-12.19z" fill="currentColor" />
                    </svg>
                  </div>
                </li>
              ))}
              <li className="text-sm">
                {/* eslint-disable jsx-a11y/anchor-is-valid */}
                <a href="#" aria-current="page" className="font-medium text-gray-500 hover:text-gray-600">

                </a>
              </li>
            </ol>
          </nav>
        </div>

        <main className="mx-auto max-w-2xl px-4 lg:max-w-7xl lg:px-8">
          <div className="border-b border-gray-200 pt-9 pb-5">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">Сувениры</h1>
            <p className="mt-4 text-base text-gray-500">
              Лучшие сувениры по самым лучшим ценам!
            </p>
          </div>

          <div className="pt-12 pb-24 lg:grid lg:grid-cols-3 lg:gap-x-8 xl:grid-cols-4">
            <aside>
              <h2 className="sr-only">Фильтры</h2>

              <button
                type="button"
                className="inline-flex items-center lg:hidden"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <span className="text-sm font-medium text-gray-700">Фильтры</span>
                <PlusIcon className="ml-1 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
              </button>

              <div className="hidden lg:block">
                <form className="space-y-10 divide-y divide-gray-200">
                  {/* {filterss && filterss.map((section, sectionIdx) => (
                    <div key={section.name} className={sectionIdx === 0 ? null : 'pt-10'}>
                      <fieldset>
                        <legend className="block text-sm font-medium text-gray-900">{section.name}</legend>
                        <div className="space-y-3 pt-6">
                          {section.options.map((option, optionIdx) => (
                            <div key={option.value} className="flex items-center">
                              <input
                                id={`group-${sectionIdx}-${optionIdx}`}
                                name={`group-${sectionIdx}`}
                                defaultValue={option.value}
                                type="checkbox"
                                checked={selectFilter[section.id] === option.value}
                                onChange={() => onChangeFilter(section.id, option.value)}
                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                              />
                              <label htmlFor={`${section.id}-${optionIdx}`} className="ml-3 text-sm text-gray-600">
                                {option.label}
                              </label>
                            </div>
                          ))}
                        </div>
                      </fieldset>
                    </div>
                  ))} */}
                  <div className='text- text-lg'>
                    <button
                      onClick={onHandlerResetFilters}
                    >
                      Сбросить фильтры
                    </button>
                    <div className='text-sm text-gray-400' hidden={!filteredProducts === 0}>
                      Продукты по заданным фильтрам не найдены!
                    </div>
                  </div>
                  <div className="container mx-auto p-4">
                    <h1 className="text-xl font-normal mb-4">Фильтрация по цене</h1>
                    <div className="flex items-center mb-4">
                      <span className="mr-2 text-sm">Минимальная цена:</span>
                      <input
                        type="number"
                        value={minPrice}
                        ref={minPriceRef}
                        onChange={(e) => setMinPrice(Number(e.target.value))}
                        // className="border p-1 w-36 "
                        className='block w-36 appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
                      />
                    </div>
                    <div className="flex items-center mb-4">
                      <span className="mr-2 text-sm">Максимальная цена:</span>
                      <input
                        type="number"
                        value={maxPrice}
                        ref={maxPriceRef}
                        onChange={(e) => setMaxPrice(Number(e.target.value))}
                        // className="border p-1 max-w-xs w-36"
                        className='block w-36 appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
                      />
                    </div>
                    <div className='flex items-center mb-4 py-4'>
                      <button
                        className="inline-flex items-center  justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
                        onClick={(e) => { handlerSaveClick(e) }}
                      >
                        Применить
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </aside>
            <section aria-labelledby="product-heading" className="mt-6 lg:col-span-2 lg:mt-0 xl:col-span-3">
              <div>
                <input
                  type="text"
                  placeholder="Поиск"
                  onChange={handlerSearchChange}
                  className="block w-full mb-4 appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                />
                {/* <input className='block w-auto appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm' /> */}
              </div>
              <h2 id="product-heading" className="sr-only">
                Products
              </h2>
              <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:gap-x-2 xl:grid-cols-3">
                {loading ? (
                  <LoadingBox />
                ) : error ? (
                  <div>{error}</div>
                ) : (
                  filteredProducts.length > 0 ? filteredProducts.map((product) => (
                    <div
                      key={product._id}
                      className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white"
                    >
                      <div className="aspect-w-3 aspect-h-4 bg-gray-200 group-hover:opacity-75 sm:aspect-none sm:h-96">
                        <img
                          src={`${product.imageSrc[0].src}`}
                          alt={product.imageAlt}
                          className="h-full w-full object-cover object-center sm:h-full sm:w-full"
                        />
                      </div>
                      <div className="flex flex-1 flex-col space-y-2 p-4">
                        <h3 className="text-sm font-medium text-gray-900">
                          <Link to={'/simvolika/' + product._id}>
                            <span aria-hidden="true" className="absolute inset-0" />
                            {product.name}
                          </Link>
                        </h3>
                        <p className="text-sm text-gray-500">{product.description}</p>
                        <div className="flex flex-1 flex-col justify-end">
                          {/* <p className="text-sm italic text-gray-500">{product.options}</p> */}
                          <p className="text-base font-medium text-gray-900">{product.price} бел.руб.</p>
                        </div>
                      </div>
                    </div>
                  )) : products.map((product) => (
                    <div
                      key={product._id}
                      className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white"
                    >
                      <div className="aspect-w-3 aspect-h-4 bg-gray-200 group-hover:opacity-75 sm:aspect-none sm:h-96">
                        <img
                          src={process.env.PUBLIC_URL + product.imageSrc[0].src}
                          alt={product.imageAlt}
                          className="h-full w-full object-cover object-center sm:h-full sm:w-full"
                        />
                      </div>
                      <div className="flex flex-1 flex-col space-y-2 p-4">
                        <h3 className="text-sm font-medium text-gray-900">
                          <Link to={'/simvolika/' + product._id}>
                            <span aria-hidden="true" className="absolute inset-0" />
                            {product.name}
                          </Link>
                        </h3>
                        <p className="text-sm text-gray-500">{product.description}</p>
                        <div className="flex flex-1 flex-col justify-end">
                          <p className="text-sm italic text-gray-500">{product.options}</p>
                          <p className="text-base font-medium text-gray-900">{product.price} бел.руб.</p>
                        </div>
                      </div>
                    </div>
                  )))}
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}