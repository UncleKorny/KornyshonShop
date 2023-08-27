import { CheckIcon, ClockIcon, QuestionMarkCircleIcon, XIcon as XMarkIconMini } from '@heroicons/react/solid'
import { useContext, useEffect, useState } from 'react'
import { Store } from '../Store'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'


// const relatedProducts = [
//   {
//     id: 1,
//     name: 'Billfold Wallet',
//     href: '#',
//     imageSrc: 'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-01-related-product-01.jpg',
//     imageAlt: 'Front of Billfold Wallet in natural leather.',
//     price: '$118',
//     color: 'Natural',
//   },
//   // More products...
// ]

export default function CartScreen() {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const [isInputDisabled, setIsInputDisabled] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isSetDiscount, setIsSetDiscount] = useState(false);
  const [discountPercent, setDiscountPercent] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [typeOfDiscount, setTypeOfDiscount] = useState('');
  // const [totalPrice, setTotalPrice] = useState();
  // const [discount, setDiscount] = useState();

  const {
    cart: { cartItems },
    userInfo
  } = state;
  const updateCartHandler = async (item, quantity) => {
    const instance = axios.create({
      baseURL: 'http://localhost:5000',
    });
    const { data } = await instance.get(`api/products/${item._id}`);
    if (data.countInStock < quantity) {
      window.alert('Sorry. Product out of stock');
      return;
    }
    ctxDispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...item, quantity },
    });
  }
  useEffect(() => {
    typeOfDiscount === "percent" ?
      setTotalAmount((cartItems.reduce((a, c) => a + c.price * c.quantity, 0) - (cartItems.reduce((a, c) => a + c.price * c.quantity, 0) * (discountPercent / 100))).toFixed(2)) :
      setTotalAmount((cartItems.reduce((a, c) => a + c.price * c.quantity, 0) - discountPercent))
  }, [cartItems, isSetDiscount])
  const removeItemHandler = async (item) => {
    ctxDispatch({ type: 'CART_REMOVE_ITEM', payload: item });
  }

  const checkoutHandler = () => {
    if(userInfo){
      navigate(`/shipping?totalPrice=${totalAmount}`);
    }
    else{
      navigate('/signin');
    }
  }
  useEffect(() => {
    isSetDiscount ? setIsInputDisabled(true) : setIsInputDisabled(false);
  }, [isSetDiscount]);
  const discountSetHandler = async (e) => {
    e.preventDefault();
    const instance = axios.create({
      baseURL: 'http://localhost:5000',
    });
    const response = await instance.get('/api/discount');
    const filteredData = response.data.filter(item => item.name === inputValue);
    setTypeOfDiscount(filteredData[0].type);
    console.log(filteredData);
    if (filteredData.length > 0) {
      setIsSetDiscount(true);
      setDiscountPercent(filteredData[0].amount)
    }
  }
  return (
    <div className="bg-white">


      <main className="mx-auto max-w-2xl px-4 pt-16 pb-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Корзина</h1>

        <form className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
          <section aria-labelledby="cart-heading" className="lg:col-span-7">
            <h2 id="cart-heading" className="sr-only">
              Items in your shopping cart
            </h2>

            <ul className="divide-y divide-gray-200 border-t border-b border-gray-200">

              {/* SHOPPING CART */}
              {
                cartItems.length === 0 ? (
                  <div>
                    <h1 className="text-3xl pb-8 pt-4">Корзина пуста.</h1>
                    <Link to='/' className='text-indigo-500'><h1 className='pb-2'>Добавьте что-нибудь</h1></Link>
                  </div>
                ) :
                  cartItems.map((product, productIdx) => (
                    <li key={product._id} className="flex py-6 sm:py-10">
                      <div className="flex-shrink-0">
                        <img
                          src={product.imageSrc[0].src}
                          alt={product.imageAlt}
                          className="h-24 w-24 rounded-md object-cover object-center sm:h-48 sm:w-48"
                        />
                      </div>

                      <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                        <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                          <div>
                            <div className="flex justify-between">
                              <h3 className="text-sm">
                                <Link to={product.href} className="font-medium text-gray-700 hover:text-gray-800">
                                  {product.name}
                                </Link>
                              </h3>
                            </div>
                            <div className="mt-1 flex text-sm">
                              <p className="text-gray-500">{product.color}</p>
                              {product.size ? (
                                <p className="ml-4 border-l border-gray-200 pl-4 text-gray-500">{product.size}</p>
                              ) : null}
                            </div>
                            <p className="mt-1 text-sm font-medium text-gray-900">{product.price} бел.руб.</p>
                          </div>

                          <div className="mt-4 sm:mt-0 sm:pr-9">
                            <label htmlFor={`quantity-${productIdx}`} className="sr-only">
                              Quantity, {product.name}
                            </label>
                            <div className="flex-auto">
                              <button
                                disabled={product.quantity === 1}
                                onClick={(event) => {
                                  event.preventDefault();
                                  updateCartHandler(product, product.quantity - 1)
                                }
                                }
                              >
                                <svg className="h-5 w-5 text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">  <circle cx="12" cy="12" r="10" />  <line x1="8" y1="12" x2="16" y2="12" /></svg>
                              </button> {'   '}
                              <span className="text-2xl px-5">{product.quantity}</span> {'   '}
                              {/* <PlusIcon
                            className="h-5 w-5" aria-hidden="true"
                          ></PlusIcon> */}
                              <button
                                disabled={product.quantity === product.countInStock}
                                onClick={(event) => {
                                  event.preventDefault();
                                  updateCartHandler(product, product.quantity + 1)
                                }
                                }
                              >
                                <svg className="h-5 w-5 text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">  <circle cx="12" cy="12" r="10" />  <line x1="12" y1="8" x2="12" y2="16" />  <line x1="8" y1="12" x2="16" y2="12" /></svg>
                              </button>
                            </div>
                            {/* <select
                          id={`quantity-${productIdx}`}
                          name={`quantity-${productIdx}`}
                          className="max-w-full rounded-md border border-gray-300 py-1.5 text-left text-base font-medium leading-5 text-gray-700 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                        >
                          <option value={1}>1</option>
                          <option value={2}>2</option>
                          <option value={3}>3</option>
                          <option value={4}>4</option>
                          <option value={5}>5</option>
                          <option value={6}>6</option>
                          <option value={7}>7</option>
                          <option value={8}>8</option>
                        </select> */}

                            <div className="absolute top-0 right-0">
                              <button onClick={(event) => {
                                event.preventDefault();
                                removeItemHandler(product);
                              }} type="button" className="-m-2 inline-flex p-2 text-gray-400 hover:text-gray-500">
                                <span className="sr-only">Remove</span>
                                <XMarkIconMini className="h-5 w-5" aria-hidden="true" />
                              </button>
                            </div>
                          </div>
                        </div>

                        <p className="mt-4 flex space-x-2 text-sm text-gray-700">
                          {product.inStock ? (
                            <CheckIcon className="h-5 w-5 flex-shrink-0 text-green-500" aria-hidden="true" />
                          ) : (
                            <ClockIcon className="h-5 w-5 flex-shrink-0 text-gray-300" aria-hidden="true" />
                          )}

                          <span>{product.inStock ? 'В наличии' : `Доставка через ${product.leadTime}`}</span>
                        </p>
                      </div>
                    </li>
                  ))}


            </ul>
          </section>

          {/* Order summary */}
          {cartItems.length > 0 ? (

            <section
              aria-labelledby="summary-heading"
              className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8"
            >
              <h2 id="summary-heading" className="text-lg font-medium text-gray-900">
                Сумма заказа
              </h2>

              <dl className="mt-6 space-y-4">
                <div className="flex items-center justify-between">
                  <dt className="text-sm text-gray-600">Цена за товары</dt>

                  <dd className="text-sm font-medium text-gray-900">{
                    cartItems.reduce((a, c) => a + c.price * c.quantity, 0)
                  } бел.руб.</dd>
                </div>
                <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                  <dt className="flex items-center text-sm text-gray-600">
                    <span>Ваша скидка</span>
                    {/* eslint-disable jsx-a11y/anchor-is-valid */}
                    <a href="#" className="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500">
                      <QuestionMarkCircleIcon className="h-5 w-5" aria-hidden="true" />
                    </a>
                  </dt>
                  <dd className="text-sm font-medium text-gray-900">{discountPercent} {typeOfDiscount === "percent" ? "%" : "бел.руб"}</dd>
                </div>

                <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                  <dt className="text-base font-medium text-gray-900">Общая сумма</dt>
                  <dd className="text-base font-medium text-gray-900">{totalAmount} бел.руб.</dd>
                </div>
              </dl>

              <div className="mt-6">
                <button
                  type="submit"
                  // disabled={cartItems.length === 0}
                  onClick={(event) => {
                    event.preventDefault();
                    checkoutHandler();
                  }}
                  className="w-full rounded-md border border-transparent bg-indigo-600 py-3 px-4 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                >

                  Оплатить
                </button>
              </div>
              <div className="mt-4 flex justify-center items-center">
                <div className=" flex-1 mr-2">
                  <input
                    type="text"
                    name="description"
                    id="description"
                    autoComplete="description"
                    placeholder="Промокод"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    disabled={isInputDisabled}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
                <button className='w-auto rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50'
                  onClick={discountSetHandler}
                  disabled={isInputDisabled}
                >
                  Применить
                </button>
              </div>
            </section>

          ) : (
            <div></div>
          )}
        </form>
      </main>
    </div>
  )
}
