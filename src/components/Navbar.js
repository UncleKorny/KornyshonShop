import { Dialog, Menu, Popover, Tab, Transition } from '@headlessui/react'
import { ShoppingBagIcon } from '@heroicons/react/outline'
import { Fragment, useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { Store } from '../Store'
import { XIcon } from '@heroicons/react/solid'
const navigation = {
    categories: [
        {
            id: 'Сувениры',
            name: 'Сувениры',
            featured: [
                {
                    name: 'Тест',
                    href: '#',
                    imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-category-01.jpg',
                    imageAlt: 'Models sitting back to back, wearing Basic Tee in black and bone.',
                },
                {
                    name: 'тест2',
                    href: '#',
                    imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-category-02.jpg',
                    imageAlt: 'Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees.',
                },
            ],
            sections: [
                {
                    id: 'clothing',
                    name: 'Clothing',
                    items: [
                        { name: 'Tops', href: '#' },
                        { name: 'Dresses', href: '#' },
                        { name: 'Pants', href: '#' },
                        { name: 'Denim', href: '#' },
                        { name: 'Sweaters', href: '#' },
                        { name: 'T-Shirts', href: '#' },
                        { name: 'Jackets', href: '#' },
                        { name: 'Activewear', href: '#' },
                        { name: 'Browse All', href: '#' },
                    ],
                },
                {
                    id: 'accessories',
                    name: 'Accessories',
                    items: [
                        { name: 'Watches', href: '#' },
                        { name: 'Wallets', href: '#' },
                        { name: 'Bags', href: '#' },
                        { name: 'Sunglasses', href: '#' },
                        { name: 'Hats', href: '#' },
                        { name: 'Belts', href: '#' },
                    ],
                },
                {
                    id: 'brands',
                    name: 'Brands',
                    items: [
                        { name: 'Full Nelson', href: '#' },
                        { name: 'My Way', href: '#' },
                        { name: 'Re-Arranged', href: '#' },
                        { name: 'Counterfeit', href: '#' },
                        { name: 'Significant Other', href: '#' },
                    ],
                },
            ],
        },
        {
            id: 'simbolica',
            name: 'Символика',
            featured: [
                {
                    name: 'New Arrivals',
                    href: '#',
                    imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-04-detail-product-shot-01.jpg',
                    imageAlt: 'Drawstring top with elastic loop closure and textured interior padding.',
                },
                {
                    name: 'Artwork Tees',
                    href: '#',
                    imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-02-image-card-06.jpg',
                    imageAlt:
                        'Three shirts in gray, white, and blue arranged on table with same line drawing of hands and shapes overlapping on front of shirt.',
                },
            ],
            sections: [
                {
                    id: 'clothing',
                    name: 'Clothing',
                    items: [
                        { name: 'Tops', href: '#' },
                        { name: 'Pants', href: '#' },
                        { name: 'Sweaters', href: '#' },
                        { name: 'T-Shirts', href: '#' },
                        { name: 'Jackets', href: '#' },
                        { name: 'Activewear', href: '#' },
                        { name: 'Browse All', href: '#' },
                    ],
                },
                {
                    id: 'accessories',
                    name: 'Accessories',
                    items: [
                        { name: 'Watches', href: '#' },
                        { name: 'Wallets', href: '#' },
                        { name: 'Bags', href: '#' },
                        { name: 'Sunglasses', href: '#' },
                        { name: 'Hats', href: '#' },
                        { name: 'Belts', href: '#' },
                    ],
                },
                {
                    id: 'brands',
                    name: 'Brands',
                    items: [
                        { name: 'Re-Arranged', href: '#' },
                        { name: 'Counterfeit', href: '#' },
                        { name: 'Full Nelson', href: '#' },
                        { name: 'My Way', href: '#' },
                    ],
                },
            ],
        },
    ],
    pages: [
        { name: 'Сувениры', href: '/' },
        { name: 'Символика', href: '/simvolika' },
        { name: 'Книги и справочники', href: '/books' },
        { name: 'Подарочные наборы', href: '/presents' },
    ],
}


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}
function Navbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { cart, userInfo } = state;
    // const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

    const signoutHandler = (event) => {
        event.preventDefault();
        ctxDispatch({ type: 'USER_SIGNOUT' });
        localStorage.removeItem('userInfo');
    }

    return (
        <div>
            <div>
                {/* Mobile menu */}
                <Transition.Root show={mobileMenuOpen} as={Fragment}>
                    <Dialog as="div" className="relative z-40 lg:hidden" onClose={setMobileMenuOpen}>
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
                                enterFrom="-translate-x-full"
                                enterTo="translate-x-0"
                                leave="transition ease-in-out duration-300 transform"
                                leaveFrom="translate-x-0"
                                leaveTo="-translate-x-full"
                            >
                                <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
                                    <div className="flex px-4 pt-5 pb-2">
                                        <button
                                            type="button"
                                            className="-m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                                            onClick={() => setMobileMenuOpen(false)}
                                        >
                                            <span className="sr-only">Close menu</span>
                                            <XIcon className="h-6 w-6" aria-hidden="true" />
                                        </button>
                                    </div>

                                    <div className="space-y-6 border-t border-gray-200 py-6 px-4">
                                        {navigation.pages.map((page) => (
                                            <div key={page.name} className="flow-root" onClick={() => setMobileMenuOpen(false)}>
                                                <Link to={page.href} className="-m-2 block p-2 font-medium text-gray-900">
                                                    {page.name}
                                                </Link>
                                            </div>
                                        ))}
                                    </div>
                                    {userInfo ? (
                                        <div></div>
                                    ) : (
                                        <div className="space-y-6 border-t border-gray-200 py-6 px-4">
                                            <div className="flow-root">
                                                <Link to="/signin" className="-m-2 block p-2 font-medium text-gray-900">
                                                    Вход
                                                </Link>
                                            </div>
                                            <div className="flow-root">
                                                <Link to="/signup" className="-m-2 block p-2 font-medium text-gray-900">
                                                    Зарегистрироваться
                                                </Link>
                                            </div>
                                        </div>

                                    )}

                                    <div className="border-t border-gray-200 py-6 px-4">
                                        <a href="#" className="-m-2 flex items-center p-2">
                                            <img
                                                src="https://tailwindui.com/img/flags/flag-canada.svg"
                                                alt=""
                                                className="block h-auto w-5 flex-shrink-0"
                                            />
                                            <span className="ml-3 block text-base font-medium text-gray-900">CAD</span>
                                            <span className="sr-only">, change currency</span>
                                        </a>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </Dialog>
                </Transition.Root>

                <header className="relative bg-white">
                    <nav aria-label="Top" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="border-b border-gray-200">
                            <div className="flex h-16 items-center">
                                <button
                                    type="button"
                                    className="rounded-md bg-white p-2 text-gray-400 lg:hidden"
                                    onClick={() => setMobileMenuOpen(true)}
                                >
                                    <span className="sr-only">Open menu</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" /></svg>
                                </button>

                                {/* Logo */}
                                <div className="ml-4 flex lg:ml-0">
                                    {/* eslint-disable jsx-a11y/anchor-is-valid */}
                                    <Link to="/">
                                        <span className="sr-only">Your Company</span>
                                        <img
                                            className="h-12 w-auto"
                                            src="https://images.deal.by/212630408_w640_h640_212630408.jpg"
                                            alt=""
                                        />
                                    </Link>
                                </div>

                                {/* Flyout menus */}
                                <Popover.Group className="hidden lg:ml-8 lg:block lg:self-stretch">
                                    <div className="flex h-full space-x-8">

                                        {navigation.pages.map((page) => (
                                            <Link
                                                key={page.name}
                                                to={page.href}
                                                className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
                                            >
                                                {page.name}
                                            </Link>
                                        ))}
                                    </div>
                                </Popover.Group>

                                <div className="ml-auto flex items-center">
                                    {userInfo ? (
                                        <div>
                                            <Menu as="div" className="relative inline-block text-left">
                                                <div>
                                                    <Menu.Button className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100">
                                                        {userInfo.name}
                                                    </Menu.Button>
                                                </div>
                                                <Transition
                                                    as={Fragment}
                                                    enter="transition ease-out duration-100"
                                                    enterFrom="transform opacity-0 scale-95"
                                                    enterTo="transform opacity-100 scale-100"
                                                    leave="transition ease-in duration-75"
                                                    leaveFrom="transform opacity-100 scale-100"
                                                    leaveTo="transform opacity-0 scale-95"
                                                >
                                                    <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                        <div className="px-4 py-3">
                                                            <p className="text-sm">Вы вошли как</p>
                                                            <p className="truncate text-sm font-medium text-gray-900">{userInfo.email}</p>
                                                        </div>
                                                        <div className="py-1">
                                                            <Menu.Item>
                                                                {({ active }) => (
                                                                    <Link
                                                                        to="/user/settings"
                                                                        className={classNames(
                                                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                                            'block px-4 py-2 text-sm'
                                                                        )}
                                                                    >
                                                                        Настройки аккаунта
                                                                    </Link>
                                                                )}
                                                            </Menu.Item>
                                                            <Menu.Item>
                                                                {({ active }) => (
                                                                    <Link
                                                                        to="/user/orderhistory"
                                                                        className={classNames(
                                                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                                            'block px-4 py-2 text-sm'
                                                                        )}
                                                                    >
                                                                        История заказов
                                                                    </Link>
                                                                )}
                                                            </Menu.Item>
                                                            <Menu.Item>
                                                                {({ active }) => (
                                                                    <Link
                                                                        to="/support"
                                                                        className={classNames(
                                                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                                            'block px-4 py-2 text-sm'
                                                                        )}
                                                                    >
                                                                        Поддержка
                                                                    </Link>
                                                                )}
                                                            </Menu.Item>

                                                        </div>
                                                        <div className="py-1">
                                                            <form method="POST" action="#">
                                                                <Menu.Item>
                                                                    {({ active }) => (
                                                                        <button
                                                                            type="submit"
                                                                            onClick={signoutHandler}
                                                                            className={classNames(
                                                                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                                                'block w-full px-4 py-2 text-left text-sm'
                                                                            )}
                                                                        >
                                                                            Выйти
                                                                        </button>
                                                                    )}
                                                                </Menu.Item>
                                                            </form>
                                                        </div>
                                                    </Menu.Items>
                                                </Transition>
                                            </Menu>
                                        </div>
                                    ) : (
                                        <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                                            {/* eslint-disable jsx-a11y/anchor-is-valid */}
                                            <Link to="/signin" className="text-sm font-medium text-gray-700 hover:text-gray-800">
                                                Вход
                                            </Link>
                                            <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
                                            {/* eslint-disable jsx-a11y/anchor-is-valid */}
                                            <Link to="/signup" className="text-sm font-medium text-gray-700 hover:text-gray-800">
                                                Зарегистрироваться
                                            </Link>
                                        </div>
                                    )}
                                    <div className='pl-4'>
                                        {userInfo && (userInfo.isAdmin || userInfo.isModer) && (
                                            <div>
                                                <Menu as="div" className="relative inline-block text-left">
                                                    <div>
                                                        <Menu.Button className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100">
                                                            Админ-панель
                                                        </Menu.Button>
                                                    </div>
                                                    <Transition
                                                        as={Fragment}
                                                        enter="transition ease-out duration-100"
                                                        enterFrom="transform opacity-0 scale-95"
                                                        enterTo="transform opacity-100 scale-100"
                                                        leave="transition ease-in duration-75"
                                                        leaveFrom="transform opacity-100 scale-100"
                                                        leaveTo="transform opacity-0 scale-95"
                                                    >
                                                        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">

                                                            <div className="py-1">
                                                                <Menu.Item>
                                                                    {({ active }) => (
                                                                        <Link
                                                                            to="/admin/products"
                                                                            className={classNames(
                                                                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                                                'block px-4 py-2 text-sm'
                                                                            )}
                                                                        >
                                                                            Продукты
                                                                        </Link>
                                                                    )}
                                                                </Menu.Item>
                                                                <Menu.Item>
                                                                    {({ active }) => (
                                                                        <Link
                                                                            to="/admin/simvolika"
                                                                            className={classNames(
                                                                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                                                'block px-4 py-2 text-sm'
                                                                            )}
                                                                        >
                                                                            Символика
                                                                        </Link>
                                                                    )}
                                                                </Menu.Item>
                                                                <Menu.Item>
                                                                    {({ active }) => (
                                                                        <Link
                                                                            to="/admin/orders"
                                                                            className={classNames(
                                                                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                                                'block px-4 py-2 text-sm'
                                                                            )}
                                                                        >
                                                                            Заказы
                                                                        </Link>
                                                                    )}
                                                                </Menu.Item>
                                                                {userInfo.isAdmin ? (
                                                                    <Menu.Item>
                                                                        {({ active }) => (
                                                                            <Link
                                                                                to="/admin/users"
                                                                                className={classNames(
                                                                                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                                                    'block px-4 py-2 text-sm'
                                                                                )}
                                                                            >
                                                                                Пользователи
                                                                            </Link>
                                                                        )}
                                                                    </Menu.Item>

                                                                ) : (
                                                                    <div></div>
                                                                )}
                                                                {userInfo.isAdmin ? (
                                                                    <Menu.Item>
                                                                        {({ active }) => (
                                                                            <Link
                                                                                to="/admin/mailing"
                                                                                className={classNames(
                                                                                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                                                    'block px-4 py-2 text-sm'
                                                                                )}
                                                                            >
                                                                                Рассылка сообщений
                                                                            </Link>
                                                                        )}
                                                                    </Menu.Item>

                                                                ) : (
                                                                    <div></div>
                                                                )}

                                                            </div>

                                                        </Menu.Items>
                                                    </Transition>
                                                </Menu>
                                            </div>
                                        )}
                                    </div>

                                    <div className="hidden lg:ml-8 lg:flex">
                                        {/* eslint-disable jsx-a11y/anchor-is-valid */}
                                        <a href="#" className="flex items-center text-gray-700 hover:text-gray-800">
                                            <img
                                                src="https://upload.wikimedia.org/wikipedia/commons/8/85/Flag_of_Belarus.svg"
                                                alt=""
                                                className="block h-auto w-5 flex-shrink-0"
                                            />
                                            <span className="ml-3 block text-sm font-medium">BYN</span>
                                            <span className="sr-only">, change currency</span>
                                        </a>
                                    </div>

                                    {/* Cart */}
                                    <div className="ml-4 flow-root lg:ml-6">
                                        <Link to="/cart" className="group -m-2 flex items-center p-2">
                                            <ShoppingBagIcon
                                                className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                                                aria-hidden="true"
                                            />
                                            {cart.cartItems.length > 0 && (
                                                <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">{cart.cartItems.reduce((a, c) =>
                                                    a + c.quantity, 0
                                                )}</span>
                                            )}
                                            <span className="sr-only">items in cart, view bag</span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </nav>
                </header>
            </div>
        </div>
    )
}
export default Navbar;