import { Link } from "react-router-dom";

export default function NotFound() {
    return (
      <>
        {/*
          This example requires updating your template:
  
          ```
          <html class="h-full">
          <body class="h-full">
          ```
        */}
        <div className="min-h-full bg-white py-16 px-6 sm:py-24 md:grid md:place-items-center lg:px-8">
          <div className="mx-auto max-w-max pt-20 pb-16">
            <main className="sm:flex">
              <p className="text-4xl font-bold tracking-tight text-indigo-600 sm:text-5xl">404</p>
              <div className="sm:ml-6">
                <div className="sm:border-l sm:border-gray-200 sm:pl-6">
                  <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">Страница не найдена</h1>
                  <p className="mt-1 text-base text-gray-500">Пожалуйста, проверьте ваш URL-адрес и попробуйте еще раз.</p>
                </div>
                <div className="mt-10 flex space-x-3 sm:border-l sm:border-transparent sm:pl-6">
                {/* eslint-disable jsx-a11y/anchor-is-valid */}
                  <Link
                    to="/"
                    className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    На главную
                  </Link>
                {/* eslint-disable jsx-a11y/anchor-is-valid */}
                  <Link
                    to='/support'
                    className="inline-flex items-center rounded-md border border-transparent bg-indigo-100 px-4 py-2 text-sm font-medium text-indigo-700 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Написать в поддержку
                  </Link>
                </div>
              </div>
            </main>
          </div>
        </div>
      </>
    )
  }
  