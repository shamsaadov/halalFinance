import { useState, useEffect } from "react";
import Calculator from "./components/Calculator";
import Tariffs from "./components/Tariffs";
import Conditions from "./components/Conditions";
import Contact from "./components/Contact";
import Logo from "./assets/logo.svg";

function App() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // Обработка прокрутки страницы
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Шапка */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-white shadow-md py-2" : "bg-transparent py-4"
        }`}
      >
        <div className="container mx-auto px-4 flex justify-center items-center">
          <img src={Logo} alt="HalalPay" className="h-12" />
        </div>
      </header>

      {/* Главная секция с калькулятором */}
      <section className="pt-24 pb-16 bg-gradient-to-b from-primary-100 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-2">
              Исламский калькулятор рассрочки
            </h1>
            <p className="text-lg text-secondary-700 max-w-2xl mx-auto">
              Рассчитайте платежи по рассрочке в соответствии с принципами
              исламского финансирования - без процентов, без скрытых комиссий,
              прозрачно и справедливо.
            </p>
          </div>
          <Calculator />
        </div>
      </section>

      {/* Секция тарифов */}
      <section id="tariffs" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-secondary-900 mb-10">
            Наши тарифы
          </h2>
          <Tariffs />
        </div>
      </section>

      {/* Секция условий */}
      <section id="conditions" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-secondary-900 mb-10">
            Условия и положения
          </h2>
          <Conditions />
        </div>
      </section>

      {/* Секция контактов */}
      <section id="contact" className="py-16 bg-primary-900 text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">
            Связаться с нами
          </h2>
          <Contact />
        </div>
      </section>

      {/* Нижний колонтитул */}
      <footer className="py-6 bg-secondary-950 text-white">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} Forsa Finance. Все права защищены.
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Исламские финансовые услуги в соответствии с принципами шариата.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
