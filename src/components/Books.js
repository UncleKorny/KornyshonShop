

const actions = [
    {
        title: 'Книга-фотоальбом «Заповедная Беларусь»',
        // href: 'zapovednayabelarus',
        href: 'https://artfolk.by/product/kniga-fotoalbom-zapovednaja-belarus/',
        description: "Книга-фотоальбом «Заповедная Беларусь» с фотографиями беларуси",
    },
    {
        title: 'Книга-фотоальбом «Нечаканая Беларусь»',
        href: 'https://artfolk.by/product/kniga-fotoalbom-nechakanaja-belarus/',
        description: "Книга-фотоальбом «Нечаканая Беларусь» с иллюстрациями беларуси",
    },
    {
        title: 'Книга «Смак беларускай кухнi»',
        href: 'https://artfolk.by/product/kniga-smak-belaruskaja-kuhni/',
        description: "Книга «Смак беларускай кухнi» с иллюстрациями белорусской кухни",
    },
    {
        title: 'Книга «Минск за один день»',
        href: 'https://artfolk.by/product/kniga-minsk-za-odin-den/',
        description: "Книга-путеводитель «Минск за один день» по Минску",
    },
    {
        title: 'Книга «Путешествие во времени»',
        href: 'https://artfolk.by/product/kniga-puteshestvie-vo-vremeni/',
        description: "Книга «Путешествие во времени» про путешествие во времени",
    },
    {
        title: 'Книга «Энциклопедия рыбалки»',
        href: 'https://artfolk.by/product/kniga-jenciklopedija-rybalki/',
        description: "Книга «Энциклопедия рыбалки» с иллюстрациями рыбалки",
    },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Books() {
    return (
        <div className="divide-y px-96 py-24 divide-gray-200 overflow-hidde rounded-lg  shadow sm:grid sm:grid-cols-2 sm:gap-px sm:divide-y-0">
            {actions.map((action, actionIdx) => (
                <div
                    key={action.title}
                    className={classNames(
                        actionIdx === 0 ? 'rounded-tl-lg rounded-tr-lg sm:rounded-tr-none' : '',
                        actionIdx === 1 ? 'sm:rounded-tr-lg' : '',
                        actionIdx === actions.length - 2 ? 'sm:rounded-bl-lg' : '',
                        actionIdx === actions.length - 1 ? 'rounded-bl-lg rounded-br-lg sm:rounded-bl-none' : '',
                        'relative group bg-white p-6 m-2 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500'
                    )}
                >

                    <div className="mt-8">
                        <h3 className="text-lg font-medium">
                            <a href={action.href} target="_blank" className="focus:outline-none">
                                {/* Extend touch target to entire panel */}
                                <span className="absolute inset-0" aria-hidden="true" />
                                {action.title}
                            </a>
                        </h3>
                        <p className="mt-2 text-sm text-gray-500">
                            {action.description}
                        </p>
                    </div>
                    <span
                        className="pointer-events-none absolute top-6 right-6 text-gray-300 group-hover:text-gray-400"
                        aria-hidden="true"
                    >
                        <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z" />
                        </svg>
                    </span>
                </div>
            ))}
        </div>
    )
}
