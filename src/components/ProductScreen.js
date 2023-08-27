
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
import Rating from 'react-rating-stars-component';

const breadcrumbs = [
  { id: 1, name: 'Сувениры', href: '/' },
]
const product = {
  name: 'Zip Tote Basket',
  price: '$140',
  rating: 4,
  images: [
    {
      id: 1,
      name: 'Angled view',
      src: 'https://tailwindui.com/img/ecommerce-images/product-page-03-product-01.jpg',
      alt: 'Angled front view with bag zipped and handles upright.',
    }, {
      id: 2,
      name: 'Angled view',
      src: 'https://tailwindui.com/img/ecommerce-images/product-page-03-product-02.jpg',
      alt: 'Angled front view with bag zipped and handles upright.',
    }, {
      id: 3,
      name: 'Angled view',
      src: 'https://tailwindui.com/img/ecommerce-images/product-page-03-product-03.jpg',
      alt: 'Angled front view with bag zipped and handles upright.',
    },
    // More images...
  ],
  colors: [
    { name: 'Washed Black', bgColor: 'bg-gray-700', selectedColor: 'ring-gray-700' },
    { name: 'White', bgColor: 'bg-white', selectedColor: 'ring-gray-400' },
    { name: 'Washed Gray', bgColor: 'bg-gray-500', selectedColor: 'ring-gray-500' },
  ],
  description: `
    <p>The Zip Tote Basket is the perfect midpoint between shopping tote and comfy backpack. With convertible straps, you can hand carry, should sling, or backpack this convenient and spacious bag. The zip top and durable canvas construction keeps your goods protected for all-day use.</p>
  `,
  details: [
    {
      name: 'Features',
      items: [
        'Multiple strap configurations',
        'Spacious interior with top zip',
        'Leather handle and tabs',
        'Interior dividers',
        'Stainless strap loops',
        'Double stitched construction',
        'Water-resistant',
      ],
    },
    // More sections...
  ],
}
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

export default function ProductScreen() {
  const params = useParams();
  const { slug } = params;
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;
  const [comments, setComments] = useState(null);
  const [productId, setProductId] = useState(null);
  const [rating, setRating] = useState();
  const [hasComment, setHasComment] = useState(false);
  const [averageRating, setAverageRating] = useState(null);
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
        const result = await instance.get(`/api/products/${slug}`);
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
        setProductId(result.data._id);
      }
      catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
      }
    };
    fetchData();
  }, [slug]);
  useEffect(() => {
    const loadComments = async () => {
      if (productId !== null) {
        const instance = axios.create({
          baseURL: 'http://localhost:5000',
        });
        try {
          await instance.get(`/api/comments/${productt._id}`).then(
            response => {
              setComments(response.data);
              if (userInfo) {
                const userComment = response.data.find(comment => comment.user._id === userInfo._id);
                if (userComment) {
                  setHasComment(true);
                }
              }
              else {
                setHasComment(true);
              }
              const ratings = response.data.map(comment => comment.rating);
              const sum = ratings.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
              const averageRatingg = (sum / ratings.length).toFixed(1);
              const rating = parseFloat(averageRatingg);
              if (rating !== null) {
                setAverageRating(rating);
              }
            }
          ).catch(
            err => console.log(err)
          )
        }
        catch (err) {
        }
      }
    }
    loadComments();
  }, [productId, userInfo]);
  const addToCartHandler = async (event) => {
    event.preventDefault();
    const instance = axios.create({
      baseURL: 'http://localhost:5000',
    });
    const existItem = cart.cartItems.find((x) => x._id === productt._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await instance.get(`/api/products/${productt._id}`);
    if (data.countInStock < quantity) {
      window.alert('Sorry. Product out of stock');
      return;
    }
    ctxDispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...productt, quantity },
    });
  };
  const commentRef = useRef();
  const handlerAddButton = (e) => {
    e.preventDefault();
    if (hasComment) {
      return;
    }
    const commentValue = commentRef.current.value;
    if (commentValue !== "") {
      const instance = axios.create({
        baseURL: 'http://localhost:5000',
      });
      const comment = {
        content: commentValue,
        user: userInfo._id,
        product: productt._id,
        rating: rating
      };
      instance.post(`/api/comments/addComment`, comment).then(
        response => {
          console.log(response.data);
          window.location.reload()
        }
      )
    }
  }
  return (
    loading ? (
      <LoadingBox />
    ) : error ? (
      <div>{error}</div>
    ) : (
      // Ваше содержимое, которое должно быть отображено, когда нет загрузки и ошибки
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
                    {
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
                      ))
                    }
                  </Tab.List>
                </div>

                <Tab.Panels className="aspect-w-1 aspect-h-1 w-full">
                  {
                    productt.imageSrc.map((image) => (
                      <Tab.Panel key={image._id}>
                        <img
                          src={image.src}
                          alt={image.alt}
                          className="h-full w-full object-cover object-center sm:rounded-lg"
                        />
                      </Tab.Panel>
                    ))}
                </Tab.Panels>
              </Tab.Group>

              {/* Product info */}
              <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
                {
                  <h1 className="text-3xl font-bold tracking-tight text-gray-900">{productt.name}</h1>
                }


                <div className="mt-3">
                  <h2 className="sr-only">Product information</h2>
                  <p className="text-3xl tracking-tight text-gray-900">{productt.price} бел.руб.</p>
                </div>
                {/* Reviews */}
                {/* {
                loading ? (
                  <LoadingBox />
                ) : error ? (
                  <div>{error}</div>
                ) : (
                  <div className="mt-3">
                    <h3 className="sr-only">Отзывы</h3>
                    <div className="flex items-center">
                      <div className="flex items-center">
                        <Rating
                          value={Math.round(averageRating)}
                          count={5}
                          size={24}
                          activeColor="#6366f1"
                          edit={false}
                        />
                      </div>
                    </div>
                  </div>
                )
              } */}
                {/* {console.log(averageRating)} */}
                {
                  <div>
                    {
                      averageRating !== null ? (
                        <div className="mt-3">
                          <h3 className="sr-only">Отзывы</h3>
                          <div className="flex items-center">
                            <div className="flex items-center">
                              <Rating
                                value={Math.round(averageRating)}
                                count={5}
                                size={24}
                                activeColor="#6366f1"
                                edit={false}
                              />
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div></div>
                      )
                    }
                  </div>


                }


                <div className="mt-6">
                  <h3 className="sr-only">Описание</h3>

                  <div
                    className="space-y-6 text-base text-gray-700"
                    dangerouslySetInnerHTML={{ __html: productt.description }}
                  />
                </div>

                <form className="mt-6">
                  {/* Colors */}


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
                  // <section aria-labelledby="details-heading" className="mt-12">
                  //   <div className="divide-y divide-gray-200 border-t">
                  //     <div>
                  //       <div>Добавить отзыв:</div>
                  //       <form>
                  //         <div className="mt-1">
                  //           <input
                  //             type="text"
                  //             id="comment"
                  //             name="comment"
                  //             autoComplete="comment"
                  //             ref={commentRef}
                  //             disabled={hasComment}
                  //             className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  //           />
                  //         </div>
                  //         <div className="mt-2">
                  //           <Rating
                  //             count={5}
                  //             onChange={(rating) => setRating(rating)}
                  //             size={24}
                  //             activeColor="#6366f1"
                  //           />
                  //         </div>
                  //         <button
                  //           type="button"
                  //           className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 mt-4 sm:w-auto"
                  //           onClick={(event) => {
                  //             handlerAddButton(event);
                  //           }}
                  //           disabled={hasComment}
                  //         >
                  //           Добавить
                  //         </button>
                  //       </form>
                  //     </div>
                  //   </div>
                  // </section>
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <img
                        className="inline-block h-10 w-10 rounded-full"
                        src={userInfo.profileImage}
                        alt=""
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <form action="#" className="relative">
                        <div className="overflow-hidden rounded-lg border border-gray-300 shadow-sm focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500">
                          <textarea
                            rows={3}
                            name="comment"
                            id="comment"
                            ref={commentRef}
                            disabled={hasComment}
                            className="block w-full resize-none border-0 py-3 focus:ring-0 sm:text-sm"
                            placeholder="Напишите свой отзыв..."
                            defaultValue={''}
                          />
                          <div className="py-2" aria-hidden="true">
                            {/* Matches height of button in toolbar (1px border + 36px content height) */}
                            <div className="py-px">
                              <div className="h-9" />
                            </div>
                          </div>
                        </div>

                        <div className="absolute inset-x-0 bottom-0 flex justify-between py-2 pl-3 pr-2">
                          <div className="flex items-center space-x-5">
                            <Rating
                              count={5}
                              onChange={(rating) => setRating(rating)}
                              size={24}
                              activeColor="#6366f1"
                            />
                          </div>
                          <div className="flex-shrink-0">
                            <button
                              onClick={(event) => {
                                handlerAddButton(event);
                              }}
                              disabled={hasComment}
                              className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                              Post
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div>
              <h4 className='text-3xl font-bold pb-8'>Отзывы:</h4>
              {comments && Array.isArray(comments) && comments.map((comment, reviewIdx) => (
                <div key={comment.id} className="flex space-x-4 text-sm text-gray-500">
                  <div className="flex-none py-10">
                    <img src={comment.user.profileImage ? comment.user.profileImage : "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80"} alt="" className="h-10 w-10 rounded-full bg-gray-100" />
                  </div>
                  <div className={classNames(reviewIdx === 0 ? '' : 'border-t border-gray-200', 'flex-1 py-10')}>
                    <h3 className="font-medium text-gray-900">{comment.user.name}</h3>
                    <p>
                      <time dateTime={comment.createdAt}>{comment.createAt}</time>
                    </p>

                    <div className="mt-4 flex items-center">
                      <Rating
                        value={comment.rating}
                        count={5}
                        size={24}
                        activeColor="#6366f1"
                        edit={false}
                      />
                    </div>

                    <div
                      className="prose prose-sm mt-4 max-w-none text-gray-500"
                      dangerouslySetInnerHTML={{ __html: comment.content }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    )

  )
}