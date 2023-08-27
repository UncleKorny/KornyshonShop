import { Link } from "react-router-dom";

export default function Presents() {
    return (
        <div className="grid 2xl:px-96 sm:px-6 py-10 grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:gap-x-2 xl:grid-cols-3 ">
            <div
                className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white"
            >
                <div className="aspect-w-3 aspect-h-4 bg-gray-200 group-hover:opacity-75 sm:aspect-none sm:h-96">
                    <img
                        src="/images/50.png"
                        alt="фыва"
                        className="h-full w-full object-cover object-center sm:h-full sm:w-full"
                    />
                </div>
                <div className="flex flex-1 flex-col space-y-2 p-4">
                    <h3 className="text-sm font-medium text-gray-900">
                        <Link to='/presents/50'>
                            <span aria-hidden="true" className="absolute inset-0" />
                            Подарочный купон на 50 рублей
                        </Link>
                    </h3>
                    <div className="flex flex-1 flex-col justify-end">
                        <p className="text-base font-medium text-gray-900">50 бел.руб.</p>
                    </div>
                </div>
            </div>
            <div
                className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white"
            >
                <div className="aspect-w-3 aspect-h-4 bg-gray-200 group-hover:opacity-75 sm:aspect-none sm:h-96">
                    <img
                        src="/images/100.png"
                        alt="фыва"
                        className="h-full w-full object-cover object-center sm:h-full sm:w-full"
                    />
                </div>
                <div className="flex flex-1 flex-col space-y-2 p-4">
                    <h3 className="text-sm font-medium text-gray-900">
                        <Link to='/presents/100'>
                            <span aria-hidden="true" className="absolute inset-0" />
                            Подарочный купон на 100 рублей
                        </Link>
                    </h3>
                    <div className="flex flex-1 flex-col justify-end">
                        <p className="text-base font-medium text-gray-900">100 бел.руб.</p>
                    </div>
                </div>
            </div>
            <div
                className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white"
            >
                <div className="aspect-w-3 aspect-h-4 bg-gray-200 group-hover:opacity-75 sm:aspect-none sm:h-96">
                    <img
                        src="/images/150.png"
                        alt="фыва"
                        className="h-full w-full object-cover object-center sm:h-full sm:w-full"
                    />
                </div>
                <div className="flex flex-1 flex-col space-y-2 p-4">
                    <h3 className="text-sm font-medium text-gray-900">
                        <Link to='/presents/150'>
                            <span aria-hidden="true" className="absolute inset-0" />
                            Подарочный купон на 150 рублей
                        </Link>
                    </h3>
                    <div className="flex flex-1 flex-col justify-end">
                        <p className="text-base font-medium text-gray-900">150 бел.руб.</p>
                    </div>
                </div>
            </div>
            <div
                className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white"
            >
                <div className="aspect-w-3 aspect-h-4 bg-gray-200 group-hover:opacity-75 sm:aspect-none sm:h-96">
                    <img
                        src="/images/200.png"
                        alt="фыва"
                        className="h-full w-full object-cover object-center sm:h-full sm:w-full"
                    />
                </div>
                <div className="flex flex-1 flex-col space-y-2 p-4">
                    <h3 className="text-sm font-medium text-gray-900">
                        <Link to='/presents/200'>
                            <span aria-hidden="true" className="absolute inset-0" />
                            Подарочный купон на 200 рублей
                        </Link>
                    </h3>
                    <div className="flex flex-1 flex-col justify-end">
                        <p className="text-base font-medium text-gray-900">200 бел.руб.</p>
                    </div>
                </div>
            </div>
            <div
                className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white"
            >
                <div className="aspect-w-3 aspect-h-4 bg-gray-200 group-hover:opacity-75 sm:aspect-none sm:h-96">
                    <img
                        src="/images/250.png"
                        alt="фыва"
                        className="h-full w-full object-cover object-center sm:h-full sm:w-full"
                    />
                </div>
                <div className="flex flex-1 flex-col space-y-2 p-4">
                    <h3 className="text-sm font-medium text-gray-900">
                        <Link to='/presents/250'>
                            <span aria-hidden="true" className="absolute inset-0" />
                            Подарочный купон на 250 рублей
                        </Link>
                    </h3>
                    <div className="flex flex-1 flex-col justify-end">
                        <p className="text-base font-medium text-gray-900">250 бел.руб.</p>
                    </div>
                </div>
            </div>
            <div
                className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white"
            >
                <div className="aspect-w-3 aspect-h-4 bg-gray-200 group-hover:opacity-75 sm:aspect-none sm:h-96">
                    <img
                        src="/images/300.png"
                        alt="фыва"
                        className="h-full w-full object-cover object-center sm:h-full sm:w-full"
                    />
                </div>
                <div className="flex flex-1 flex-col space-y-2 p-4">
                    <h3 className="text-sm font-medium text-gray-900">
                        <Link to='/presents/300'>
                            <span aria-hidden="true" className="absolute inset-0" />
                            Подарочный купон на 300 рублей
                        </Link>
                    </h3>
                    <div className="flex flex-1 flex-col justify-end">
                        <p className="text-base font-medium text-gray-900">300 бел.руб.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}