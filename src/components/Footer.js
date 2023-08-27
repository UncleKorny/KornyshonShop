import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
const footerNavigation = {
    products: [
      { name: 'Сувениры', href: '#' },
      { name: 'Символика', href: '#' },
      { name: 'Книги и справочники', href: '#' },
      { name: 'Подарочные наборы', href: '#' },
    ],
    company: [
      { name: 'О нас', href: '#' },
      { name: 'Условия использованния', href: '#' },
      { name: 'Политика конфиденциальности', href: '#' },
    ],
    customerService: [
      { name: 'Контакты', href: '#' },
      { name: 'Доставка', href: '/maps' },
      { name: 'Возврат', href: '#' },
      { name: 'Гарантия', href: '#' },
      { name: 'Безопасные платежи', href: '#' },
      { name: 'FAQ', href: '#' }
    ],
  }
function Footer(){
  const [email, setEmail] = useState('');
  const handlerChange = (e)=>{
    setEmail(e.target.value);
  }
  const handlerSubmit = async (e)=>{
    e.preventDefault();
    if (email.trim() === '') {
      alert('Пожалуйста, введите адрес электронной почты');
      return;
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      alert('Пожалуйста, введите корректный адрес электронной почты');
      return;
    }
    const instance = axios.create({
      baseURL: 'http://localhost:5000',
    });
    await instance.post('/api/mailing/addEmail', {email}).then(
      response => console.log(response.data)
    ).catch(
      err=> console.log(err)
    )
  }
    return (
        <footer aria-labelledby="footer-heading" className="border-t border-gray-200 bg-white">
          <h2 id="footer-heading" className="sr-only">
            Footer
          </h2>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="py-8">
              <div className="grid grid-cols-1 md:grid-flow-col md:auto-rows-min md:grid-cols-12 md:gap-x-8 md:gap-y-16">
                {/* Image section */}
                <div className="col-span-1 md:col-span-2 lg:col-start-1 lg:row-start-1">
                  <img
                    src="https://images.deal.by/212630408_w640_h640_212630408.jpg"
                    alt=""
                    className="h-12 w-auto"
                  />
                </div>

                {/* Sitemap sections */}
                <div className="col-span-6 mt-10 grid grid-cols-2 gap-8 sm:grid-cols-3 md:col-span-8 md:col-start-3 md:row-start-1 md:mt-0 lg:col-span-6 lg:col-start-2">
                  <div className="grid grid-cols-1 gap-y-12 sm:col-span-2 sm:grid-cols-2 sm:gap-x-8">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">Продукты</h3>
                      <ul className="mt-6 space-y-6">
                        {footerNavigation.products.map((item) => (
                          <li key={item.name} className="text-sm">
                            <a href={item.href} className="text-gray-500 hover:text-gray-600">
                              {item.name}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">Компания</h3>
                      <ul className="mt-6 space-y-6">
                        {footerNavigation.company.map((item) => (
                          <li key={item.name} className="text-sm">
                            <a href={item.href} className="text-gray-500 hover:text-gray-600">
                              {item.name}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">Обслуживание клиентов</h3>
                    <ul className="mt-6 space-y-6">
                      {footerNavigation.customerService.map((item) => (
                        <li key={item.name} className="text-sm">
                          <Link to={item.href} className="text-gray-500 hover:text-gray-600">
                            {item.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Newsletter section */}
                <div className="mt-12 md:col-span-8 md:col-start-3 md:row-start-2 md:mt-0 lg:col-span-4 lg:col-start-9 lg:row-start-1">
                  <h3 className="text-sm font-medium text-gray-900">Подпишись на нашу рассылку!:)</h3>
                  <p className="mt-6 text-xs text-gray-500">Последние предложения и скидки, еженедельно отправляемые на вашу почту.</p>
                  <form className="mt-2 flex sm:max-w-md">
                    <label htmlFor="email-address" className="sr-only">
                      Email address
                    </label>
                    <input
                      id="email-address"
                      type="email"
                      autoComplete="email"
                      onChange={handlerChange}
                      value={email}
                      required
                      className="w-full min-w-0 appearance-none rounded-md border border-gray-300 bg-white py-2 px-4 text-base text-gray-900 placeholder-gray-500 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    />
                    <div className="ml-4 flex-shrink-0">
                      <button
                        onClick={handlerSubmit}
                        className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      >
                        Подписаться
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-100 py-6 text-center">
              <p className="text-sm text-gray-500">&copy; 2023 Kornyshon, Inc. Все права защищены.</p>
            </div>
          </div>
        </footer>
    );
}

export default Footer;