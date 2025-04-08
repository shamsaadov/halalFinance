import { useState, useEffect } from "react";
import { FaInfoCircle } from "react-icons/fa";

// Константы для калькулятора
const MIN_PRICE = 0; // 0 рублей
const MAX_PRICE = 3000000; // 3 миллиона рублей
const MIN_TERM = 1; // 1 месяц
const MAX_TERM = 24; // 24 месяцев
const BASE_MARKUP_PERCENTAGE = 15; // Базовый процент наценки 15% в месяц
const MARKUP_INCREASE = 5; // Увеличение наценки на 5% при достижении отметок

// Отметки для изменения процента наценки
const FIRST_MILESTONE = 500000; // Первая отметка - 300 000 рублей
const SECOND_MILESTONE = 1500000; // Вторая отметка - 1 000 000 рублей

// Форматтер для валюты
const formatter = new Intl.NumberFormat("ru-RU");

const Calculator = () => {
  // Состояние для входных данных калькулятора
  const [price, setPrice] = useState<number>(3000);
  const [initialFee, setInitialFee] = useState<number>(0);
  const [term, setTerm] = useState<number>(1);
  const [showInfo, setShowInfo] = useState<boolean>(false);

  // Рассчитываемые значения
  const [monthlyPayment, setMonthlyPayment] = useState<number>(0);
  const [monthlyMarkup, setMonthlyMarkup] = useState<number>(0);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [requiredGuarantors, setRequiredGuarantors] = useState<number>(0);

  // Расчет всех значений при изменении входных данных
  useEffect(() => {
    // Теперь не вычитаем первоначальный взнос, используем полную цену
    const remainingAmount = price;

    // Определяем процент наценки в зависимости от цены
    let currentMarkupPercentage = BASE_MARKUP_PERCENTAGE;
    if (price >= SECOND_MILESTONE) {
      currentMarkupPercentage += MARKUP_INCREASE * 2; // 15% + 10% = 25%
    } else if (price >= FIRST_MILESTONE) {
      currentMarkupPercentage += MARKUP_INCREASE; // 15% + 5% = 20%
    }

    // Расчет месячной наценки - текущий процент от полной суммы
    const markup = Math.round(
      remainingAmount * (currentMarkupPercentage / 100),
    );

    // Расчет ежемесячного платежа (полная сумма / срок + наценка)
    const monthly = Math.round(remainingAmount / term) + markup;

    // Расчет общей суммы к оплате
    const total = monthly * term;

    // Обновление состояний
    setMonthlyPayment(monthly);
    setMonthlyMarkup(markup);
    setTotalAmount(total);

    // Расчет необходимых поручителей на основе суммы и наличия первоначального взноса
    calculateGuarantors(remainingAmount, initialFee > 0);
  }, [price, initialFee, term]);

  // Функция для расчета необходимых поручителей на основе диапазона суммы и наличия первоначального взноса
  const calculateGuarantors = (amount: number, hasDownPayment: boolean) => {
    if (hasDownPayment) {
      if (amount <= 50000) {
        setRequiredGuarantors(0);
      } else if (amount <= 150000) {
        setRequiredGuarantors(1);
      } else if (amount <= 300000) {
        setRequiredGuarantors(2);
      } else {
        setRequiredGuarantors(3);
      }
    } else {
      if (amount <= 50000) {
        setRequiredGuarantors(1);
      } else if (amount <= 100000) {
        setRequiredGuarantors(2);
      } else {
        setRequiredGuarantors(3);
      }
    }
  };

  // Обработка изменения цены
  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value.replace(/[^0-9]/g, ""));
    if (value >= MIN_PRICE && value <= MAX_PRICE) {
      setPrice(value);
      // Если первоначальный взнос больше цены, корректируем его
      if (initialFee > value) {
        setInitialFee(Math.floor(value * 0.3)); // 30% от цены
      }
    }
  };

  // Обработка изменения первоначального взноса
  const handleInitialFeeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value.replace(/[^0-9]/g, ""));
    if (value >= 0 && value < price) {
      setInitialFee(value);
    }
  };

  // Функция для скролла к форме
  const handleApplyClick = () => {
    const formElement = document.getElementById("feedback-form");
    if (formElement) {
      formElement.scrollIntoView({
        behavior: "smooth", // Плавная прокрутка
        block: "end", // Прокрутка к началу элемента
      });
    }
  };

  // Расчет процента первоначального взноса
  const initialFeePercentage =
    price > 0 ? Math.round((initialFee / price) * 100) : 0;

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
      <div className="p-8">
        {/* Цена товара */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Цена товара
          </label>
          <input
            type="text"
            value={formatter.format(price)}
            onChange={handlePriceChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
          />
          <div className="mt-2 relative">
            <input
              type="range"
              min={MIN_PRICE}
              max={MAX_PRICE}
              step={1000}
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            {/* Метки под ползунком */}
            <div className="flex justify-between text-xs text-gray-500 mt-1 relative">
              <span></span>
              <span
                className="absolute"
                style={{
                  left: `${(FIRST_MILESTONE / MAX_PRICE) * 100}%`,
                  transform: "translateX(-50%)",
                }}
              >
                {formatter.format(FIRST_MILESTONE)}₽
              </span>
              <span
                className="absolute"
                style={{
                  left: `${(SECOND_MILESTONE / MAX_PRICE) * 100}%`,
                  transform: "translateX(-50%)",
                }}
              >
                {formatter.format(SECOND_MILESTONE)}₽
              </span>
              <span>{formatter.format(MAX_PRICE)}₽</span>
            </div>
          </div>
        </div>

        {/* Первоначальный взнос */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Первоначальный взнос ({initialFeePercentage}%)
          </label>
          <input
            type="text"
            value={formatter.format(initialFee)}
            onChange={handleInitialFeeChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
          />
          <div className="mt-2">
            <input
              type="range"
              min={0}
              max={price * 0.9} // Максимум 90% от цены
              step={100}
              value={initialFee}
              onChange={(e) => setInitialFee(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>0₽</span>
              <span>{formatter.format(price * 0.9)}₽</span>
            </div>
          </div>
        </div>

        {/* Срок рассрочки */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Срок рассрочки
          </label>
          <div className="flex items-center">
            <input
              type="range"
              min={MIN_TERM}
              max={MAX_TERM}
              value={term}
              onChange={(e) => setTerm(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <span className="ml-4 text-gray-700 font-medium min-w-20 text-center">
              {term} {term === 1 ? "месяц" : "месяцев"}
            </span>
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>{MIN_TERM} месяц</span>
            <span>{MAX_TERM} месяцев</span>
          </div>
        </div>

        {/* Результаты */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="text-sm text-gray-500 mb-1">Ежемесячный платеж:</h3>
            <p className="text-2xl font-bold text-primary-700">
              {formatter.format(monthlyPayment)}₽
            </p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="text-sm text-gray-500 mb-1">Месячная наценка:</h3>
            <p className="text-2xl font-bold text-primary-700">
              {formatter.format(monthlyMarkup)}₽
            </p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="text-sm text-gray-500 mb-1">Общая сумма:</h3>
            <p className="text-2xl font-bold text-primary-700">
              {formatter.format(totalAmount)}₽
            </p>
          </div>
        </div>

        {/* Дополнительная информация */}
        <div className="mt-6 p-4 border border-gray-200 rounded-lg relative">
          <div
            className="flex items-center mb-2 cursor-pointer"
            onClick={() => setShowInfo(!showInfo)}
          >
            <h3 className="text-lg font-medium text-gray-800 mr-2">
              {initialFee > 0
                ? "С первоначальным взносом"
                : "Без первоначального взноса"}
            </h3>
            <FaInfoCircle className="text-primary-600" />
          </div>

          {showInfo && (
            <div className="mt-3 text-sm text-gray-600">
              <p className="mb-1">
                Требуется поручителей:{" "}
                {requiredGuarantors === 0
                  ? "Не требуется"
                  : `${requiredGuarantors} ${requiredGuarantors === 1 ? "поручитель" : "поручителей"}`}
              </p>
              <p className="mb-1">Должны быть старше 21 года</p>
              <p className="mb-1">
                Должны иметь действительное удостоверение личности
              </p>
              <p className="mb-1">Должны быть способны производить платежи</p>
              <p className="mb-1">
                Необходимо уведомить члена семьи (родителя, брата/сестру,
                супруга)
              </p>
            </div>
          )}

          <button
            onClick={handleApplyClick}
            className="mt-4 w-full py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
          >
            Подать заявку на рассрочку
          </button>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
