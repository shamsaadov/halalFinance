import {
  FaPhone,
  FaMapMarkerAlt,
  FaInstagram,
  FaEnvelope,
  FaWhatsapp,
} from "react-icons/fa";

const Contact = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="bg-primary-800 p-8 rounded-lg">
        <h3 className="text-xl font-semibold mb-6 text-white">
          Связаться с нами
        </h3>

        <div className="space-y-4">
          <div className="flex items-center">
            <FaPhone className="text-primary-300 mr-4" />
            <a
              href="tel:+71234567890"
              className="text-white hover:text-primary-200 transition-colors"
            >
              +7 (123) 456-7890
            </a>
          </div>

          <div className="flex items-center">
            <FaMapMarkerAlt className="text-primary-300 mr-4" />
            <span className="text-white">
              ул. Финансовая, 123, Грозный, Россия
            </span>
          </div>

          <div className="flex items-center">
            <FaInstagram className="text-primary-300 mr-4" />
            <a
              href="https://www.instagram.com/halalpay"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-primary-200 transition-colors"
            >
              @halalpay
            </a>
          </div>

          <div className="flex items-center">
            <FaEnvelope className="text-primary-300 mr-4" />
            <a
              href="mailto:info@halalpay.com"
              className="text-white hover:text-primary-200 transition-colors"
            >
              info@halalpay.com
            </a>
          </div>
        </div>

        <a
          href="https://wa.me/79825029591"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 flex items-center bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg transition-colors w-3/6"
        >
          <FaWhatsapp className="mr-2" />
          Связаться через WhatsApp
        </a>
      </div>

      <div className="bg-white p-8 rounded-lg">
        <h3 className="text-xl font-semibold mb-6 text-secondary-900">
          Отправить нам сообщение
        </h3>

        <form>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 mb-2">
              Ваше имя
            </label>
            <input
              type="text"
              id="name"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-black"
              placeholder="Введите ваше имя"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 mb-2">
              Электронная почта
            </label>
            <input
              type="email"
              id="email"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-black"
              placeholder="Введите ваш email"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="message" className="block text-gray-700 mb-2">
              Сообщение
            </label>
            <textarea
              id="message"
              rows={4}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-black"
              placeholder="Чем мы можем помочь?"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-primary-600 hover:bg-primary-700 text-white py-3 px-6 rounded-lg transition-colors font-medium"
          >
            Отправить сообщение
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
