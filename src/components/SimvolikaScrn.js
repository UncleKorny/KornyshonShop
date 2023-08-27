
import { useReducer, useEffect, useContext, useState, useRef } from 'react';
import axios from 'axios';
import { Disclosure, Tab } from '@headlessui/react'
import {
  HeartIcon,
} from '@heroicons/react/outline'
import { MinusIcon, PlusIcon, StarIcon } from '@heroicons/react/solid'
import { Link, useParams } from 'react-router-dom';
import LoadingBox from './LoadingBox.js';
import { Store } from '../Store.js';

const breadcrumbs = [
  { id: 1, name: 'Символика', href: '/simvolika' },
]

// const relatedProducts = [
//   {
//     id: 1,
//     name: 'Zip Tote Basket',
//     color: 'White and black',
//     href: '#',
//     imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-03-related-product-01.jpg',
//     imageAlt: 'Front of zip tote bag with white canvas, black canvas straps and handle, and black zipper pulls.',
//     price: '$140',
//   },
//   // More products...
// ]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}


const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, productt: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

export default function SimvolikaScrn() {
  const params = useParams();
  const { simvolika } = params;
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;
  const [comments, setComments] = useState(null);
  const [productId, setProductId] = useState(null);
  const [{ loading, error, productt }, dispatch] = useReducer(reducer, {
    productt: [],
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
        const result = await instance.get(`/api/simvolika/${simvolika}`);
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
        setProductId(result.data._id);
      }
      catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
      }
    };
    fetchData();
  }, [simvolika]);
  useEffect(() => {
    const fetchData = async () => {
      if (productId !== null) {
        const instance = axios.create({
          baseURL: 'http://localhost:5000',
        });
        try {
          await instance.get(`/api/comments/${productt._id}`).then(
            response => {
              setComments(response.data);
            }
          ).catch(
            err => console.log(err)
          )
        }
        catch (err) {

        }
      }
      // console.log(productt);
    }
    fetchData();
  }, [productId]);
  const addToCartHandler = async (event) => {
    event.preventDefault();
    const instance = axios.create({
      baseURL: 'http://localhost:5000',
    });
    const existItem = cart.cartItems.find((x) => x._id === productt._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await instance.get(`/api/simvolika/${productt._id}`);
    if (data.countInStock < quantity) {
      window.alert('Sorry. Product out of stock');
      return;
    }
    ctxDispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...productt, quantity },
    });
    // navigate('/cart');
  };
  const commentRef = useRef();
  const handlerAddButton = (e) => {
    e.preventDefault();
    const commentValue = commentRef.current.value;
    if (commentValue !== "") {
      const instance = axios.create({
        baseURL: 'http://localhost:5000',
      });
      const comment = {
        content: commentValue,
        user: userInfo._id,
        product: productt._id,
      };
      instance.post(`/api/comments/addComment`, comment).then(
        response => {
          console.log(response.data);
          // const updatedComments = [...comments, comment];
          // setComments(updatedComments);
          window.location.reload()
        }
      )
    }
  }
  return (

    <div className="bg-white">
      <div className="border-b border-gray-200">
        <nav aria-label="Breadcrumb" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ol className="flex items-center space-x-4 py-4">
            {breadcrumbs.map((breadcrumb) => (
              <li key={breadcrumb.id}>
                <div className="flex items-center">
                  <Link to={breadcrumb.href} className="mr-4 text-sm font-medium text-gray-900">
                    {breadcrumb.name}
                  </Link>
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
                {productt.name}
              </a>
            </li>
          </ol>
        </nav>
      </div>
      {/* Mobile menu */}
      <main className="mx-auto max-w-7xl sm:px-6 sm:pt-16 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          {/* Product */}
          <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
            {/* Image gallery */}
            <Tab.Group as="div" className="flex flex-col-reverse">
              {/* Image selector */}
              <div className="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none pb-10">
                <Tab.List className="grid grid-cols-4 gap-6">
                  {loading ? (
                    <LoadingBox />
                  ) : error ? (
                    <div>{error}</div>
                  ) : (
                    //   productt.map((product) => (
                    //     // if(product.href === slug){
                    //     product.href === '/products/' + slug ? (
                    productt.imageSrc.map((image) => (
                      <Tab
                        key={image._id}
                        className="relative flex h-24 cursor-pointer items-center justify-center rounded-md bg-white text-sm font-medium uppercase text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-4"
                      >
                        {({ selected }) => (
                          <>
                            <span>{image.id} </span>
                            <span className="sr-only"> {image.name} </span>
                            <span className="absolute inset-0 overflow-hidden rounded-md">
                              <img src={image.src} alt="" className="h-full w-full object-cover object-center" />
                            </span>
                            <span
                              className={classNames(
                                selected ? 'ring-indigo-500' : 'ring-transparent',
                                'pointer-events-none absolute inset-0 rounded-md ring-2 ring-offset-2'
                              )}
                              aria-hidden="true"
                            />
                          </>
                        )}
                      </Tab>
                    )))
                  }
                </Tab.List>
              </div>

              <Tab.Panels className="aspect-w-1 aspect-h-1 w-full">
                {
                  loading ? (
                    <LoadingBox />
                  ) : error ? (
                    <div>{error}</div>
                  ) : (
                    productt.imageSrc.map((image) => (
                      <Tab.Panel key={image._id}>
                        <img
                          src={image.src}
                          alt={image.alt}
                          className="h-full w-full object-cover object-center sm:rounded-lg"
                        />
                      </Tab.Panel>
                    )))}
              </Tab.Panels>
            </Tab.Group>

            {/* Product info */}
            <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
              {
                loading ? (
                  <LoadingBox />
                ) : error ? (
                  <div>{error}</div>
                ) : (
                  <h1 className="text-3xl font-bold tracking-tight text-gray-900">{productt.name}</h1>
                )
              }


              <div className="mt-3">
                <h2 className="sr-only">Product information</h2>
                {
                  loading ? (
                    <LoadingBox />
                  ) : error ? (
                    <div>{error}</div>
                  ) : (
                    <p className="text-3xl tracking-tight text-gray-900">{productt.price} бел.руб.</p>
                  )
                }
              </div>
              {/* Reviews */}
              <div className="mt-3">
                <h3 className="sr-only">Отзывы</h3>
                <div className="flex items-center">
                  <div className="flex items-center">
                    {/* {[0, 1, 2, 3, 4].map((rating) => (
                      <StarIcon
                        key={rating}
                        className={classNames(
                          product.rating > rating ? 'text-indigo-500' : 'text-gray-300',
                          'h-5 w-5 flex-shrink-0'
                        )}
                        aria-hidden="true"
                      />
                    ))} */}
                  </div>
                  {/* <p className="sr-only">{product.rating} out of 5 stars</p> */}
                </div>
              </div>

              <div className="mt-6">
                <h3 className="sr-only">Описание</h3>

                <div
                  className="space-y-6 text-base text-gray-700"
                  dangerouslySetInnerHTML={{ __html: productt.description }}
                />
              </div>

              <form className="mt-6">
                <div className="mt-10 flex">
                  <button
                    onClick={addToCartHandler}
                    // type="submit"
                    className="flex max-w-xs flex-1 items-center justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-8 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50 sm:w-full sm:mb-10"
                  >
                    Добавить в корзину
                  </button>

                  <button
                    type="button"
                    className="ml-4 flex items-center justify-center rounded-md py-3 px-3 text-gray-400 hover:bg-gray-100 hover:text-gray-500 sm:mb-10"
                  >
                    <HeartIcon className="h-6 w-6 flex-shrink-0" aria-hidden="true" />
                    <span className="sr-only">Add to favorites</span>
                  </button>
                </div>
              </form>
              {userInfo && (
                <section aria-labelledby="details-heading" className="mt-12">
                  <div className="divide-y divide-gray-200 border-t">
                    <div>
                      <div>Добавить комментарий:</div>
                      <form>
                        <div className="mt-1">
                          <input
                            type="text"
                            id="comment"
                            name="comment"
                            autoComplete="comment"
                            ref={commentRef}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          />
                        </div>
                        <button
                          type="button"
                          className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 mt-4 sm:w-auto"
                          onClick={(event) => {
                            handlerAddButton(event);
                          }}
                        >
                          Добавить
                        </button>
                      </form>
                    </div>
                  </div>
                </section>
              )}
            </div>
          </div>
          <div>
            <h4 className='text-3xl font-bold pb-8'>Комментарии:</h4>
            {comments && Array.isArray(comments) && comments.map((comment) => (
              <div key={comment._id} className="sm:flex pb-8">
                <div className="mb-4 flex-shrink-0 sm:mb-0 sm:mr-4">
                  <img
                    src='https://ob-kassa.ru/content/front/buhoskol_tmp1/images/reviews-icon.jpg'
                    className="h-16 w-16 border border-gray-300 bg-white text-gray-300"
                  >
                  </img>
                </div>
                <div>
                  <h4 className="text-lg font-bold">{comment.user.name}</h4>
                  <p className="mt-1">
                    {comment.content}
                  </p>
                </div>
              </div>
            ))}
          </div>
          
        </div>
      </main>
    </div>
  )
}