import { useState, useEffect } from "react";
import { FaInfoCircle } from "react-icons/fa";
import ResultModal from "./ResultModal.tsx";
import { formatter } from "../shared/constants.ts";

const MIN_PRICE = 0; // 0 рублей
const MIN_TERM = 1; // 1 месяц
const MAX_TERM = 24; // 24 месяцев

const MAX_PRICE_OTHER = 10000000;
const MAX_PRICE_AUTO = 10000000;
const MAX_PRICE_GADGETS = 5000000; // Максимальная цена для гаджетов

const Calculator = () => {
  // Состояние для входных данных калькулятора
  const [price, setPrice] = useState<number>(3000);
  const [initialFee, setInitialFee] = useState<number>(0);
  const [term, setTerm] = useState<number>(1);
  const [showInfo, setShowInfo] = useState<boolean>(false);
  const [markupType, setMarkupType] = useState<
    "Прочее" | "Автомобиль" | "Гаджеты"
  >("Гаджеты");

  const [isResultModalOpen, setIsResultModalOpen] = useState<boolean>(false);

  // Рассчитываемые значения
  const [monthlyPayment, setMonthlyPayment] = useState<number>(0);
  const [monthlyMarkup, setMonthlyMarkup] = useState<number>(0);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [requiredGuarantors, setRequiredGuarantors] = useState<number>(0);

  // Расчет всех значений при изменении входных данных
  useEffect(() => {
    // Расчет оставшейся суммы после первоначального взноса
    const remainingAmount = price - initialFee;
    const computedMarkupPercentage =
      markupType === "Автомобиль" ? 4 : markupType === "Гаджеты" ? 6.5 : 5.5;
    const markup = Math.round(
      remainingAmount * (computedMarkupPercentage / 100),
    );
    // Расчет ежемесячного платежа (оставшаяся сумма / срок + наценка)
    const monthly = Math.round(remainingAmount / term) + markup;
    // Расчет общей суммы к оплате
    const total = monthly * term + initialFee;
    // Обновление состояний
    setMonthlyPayment(monthly);
    setMonthlyMarkup(markup);
    setTotalAmount(total);
    // Расчет необходимых поручителей на основе суммы и наличия первоначального взноса
    calculateGuarantors(remainingAmount, initialFee > 0);
  }, [price, initialFee, term, markupType]);

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
    setPrice(value);
    if (initialFee > value) {
      setInitialFee(Math.floor(value * 0.3));
    }
  };

  // Обработка потери фокуса поля цены
  const handlePriceBlur = () => {
    const maxAllowedPrice =
      markupType === "Прочее"
        ? MAX_PRICE_OTHER
        : markupType === "Гаджеты"
          ? MAX_PRICE_GADGETS
          : MAX_PRICE_AUTO;

    const minAllowedPrice = markupType === "Автомобиль" ? 500000 : MIN_PRICE;

    if (price < minAllowedPrice) {
      setPrice(minAllowedPrice);
    } else if (price > maxAllowedPrice) {
      setPrice(maxAllowedPrice);
    }
  };

  useEffect(() => {
    //const maxAllowedPrice =
    //  markupType === "Прочее"
    //    ? MAX_PRICE_OTHER
    //    : markupType === "Гаджеты"
    //      ? MAX_PRICE_GADGETS
    //      : MAX_PRICE_AUTO;
    const minAllowedPrice = markupType === "Автомобиль" ? 500000 : MIN_PRICE;
    if (price < minAllowedPrice) {
      setPrice(minAllowedPrice);
    }
  }, [markupType]);

  // Обработка изменения первоначального взноса
  const handleInitialFeeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value.replace(/[^0-9]/g, ""));
    if (value >= 0 && value < price) {
      setInitialFee(value);
    }
  };

  const totalMarkup = monthlyMarkup * term;
  const totalMarkupPercent = (totalMarkup / price) * 100; // от цены без вычета взноса

  const monthlyMarkupPercent = totalMarkupPercent / term;

  // Расчет процента первоначального взноса
  const initialFeePercentage =
    totalAmount > 0 ? Math.round((initialFee / totalAmount) * 100) : 0;

  const remainingAmount = price - initialFee;

  let requiredGuarantorsToModal = 0;

  if (remainingAmount <= 149999) {
    requiredGuarantorsToModal = 1;
  } else if (remainingAmount <= 499999) {
    requiredGuarantorsToModal = 2;
  } else {
    requiredGuarantorsToModal = 3;
  }

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
      {/* Добавленный блок выбора типа товара для расчёта наценки */}
      <div className="mb-6 mt-2 flex flex-col items-center text-center border border-gray-200 rounded-xl py-6 px-4 shadow-sm hover:shadow-md transition-shadow">
        <label className="block text-xl font-semibold text-gray-800 mb-4">
          Выберите тип товара
        </label>
        <select
          value={markupType}
          onChange={(e) =>
            setMarkupType(e.target.value as "Прочее" | "Автомобиль" | "Гаджеты")
          }
          className="w-48 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all bg-white text-gray-700 font-medium"
        >
          <option value="Прочее">Прочее</option>
          <option value="Автомобиль">Автомобиль</option>
          <option value="Гаджеты">Гаджеты</option>
        </select>
      </div>

      <div className="p-1">
        {/* Цена товара с кнопками */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Цена товара
          </label>
          <div className="flex items-center space-x-2">
            <button
              className="px-3 py-1 border border-gray-300 rounded-lg bg-gray-100 hover:bg-gray-200"
              onClick={() => {
                const minAllowedPrice =
                  markupType === "Автомобиль" ? 500000 : MIN_PRICE;
                setPrice((prev) => Math.max(prev - 500, minAllowedPrice));
              }}
            >
              –
            </button>
            <input
              type="text"
              value={formatter.format(price)}
              onChange={handlePriceChange}
              onBlur={handlePriceBlur}
              className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
            />
            <button
              className="px-3 py-1 border border-gray-300 rounded-lg bg-gray-100 hover:bg-gray-200"
              onClick={() => {
                const maxAllowedPrice =
                  markupType === "Прочее"
                    ? MAX_PRICE_OTHER
                    : markupType === "Гаджеты"
                      ? MAX_PRICE_GADGETS
                      : MAX_PRICE_AUTO;
                setPrice((prev) => Math.min(prev + 500, maxAllowedPrice));
              }}
            >
              +
            </button>
          </div>
        </div>

        {/* Первоначальный взнос с кнопками */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Первоначальный взнос ({initialFeePercentage}%)
          </label>
          <div className="flex items-center space-x-2 mb-3">
            <button
              className="px-3 py-1 border border-gray-300 rounded-lg bg-gray-100 hover:bg-gray-200"
              onClick={() => setInitialFee((prev) => Math.max(prev - 500, 0))}
            >
              –
            </button>
            <input
              type="text"
              value={formatter.format(initialFee)}
              onChange={handleInitialFeeChange}
              className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
            />
            <button
              className="px-3 py-1 border border-gray-300 rounded-lg bg-gray-100 hover:bg-gray-200"
              onClick={() =>
                setInitialFee((prev) => Math.min(prev + 500, price - 500))
              }
            >
              +
            </button>
          </div>
          {/* Ползунок для первоначального взноса */}
          <div>
            <input
              type="range"
              min={0}
              max={price - 500}
              step={500}
              value={initialFee}
              onChange={(e) => setInitialFee(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>0₽</span>
              <span>{formatter.format(price - 500)}₽</span>
            </div>
          </div>
        </div>

        {/* Срок рассрочки */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Срок рассрочки{" "}
            <span className="ml-4 text-blue-700 font-medium min-w-20">
              {term} {term === 1 ? "месяц" : "месяцев"}
            </span>
          </label>
          <div className="flex items-center space-x-2">
            <button
              className="px-3 py-1 border border-gray-300 rounded-lg bg-gray-100 hover:bg-gray-200"
              onClick={() => setTerm((prev) => Math.max(prev - 1, MIN_TERM))}
            >
              –
            </button>
            <input
              type="range"
              min={MIN_TERM}
              max={MAX_TERM}
              value={term}
              onChange={(e) => setTerm(Number(e.target.value))}
              className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <button
              className="px-3 py-1 border border-gray-300 rounded-lg bg-gray-100 hover:bg-gray-200"
              onClick={() => setTerm((prev) => Math.min(prev + 1, MAX_TERM))}
            >
              +
            </button>
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>{MIN_TERM} месяц</span>
            <span>{MAX_TERM} месяцев</span>
          </div>
        </div>

        {/* Результаты*/}
        {/*<div className="mt-8 grid grid-cols-2 md:grid-cols-2 gap-6 flex">*/}
        {/*  <div className="p-4 bg-gray-50 rounded-lg">*/}
        {/*    <h3 className="text-sm text-gray-500 mb-1">Месячный платеж:</h3>*/}
        {/*    <p className="text-2xl font-bold text-primary-700">*/}
        {/*      {formatter.format(monthlyPayment)}₽*/}
        {/*    </p>*/}
        {/*  </div>*/}
        {/*  <div className="p-4 bg-gray-50 rounded-lg">*/}
        {/*    <h3 className="text-sm text-gray-500 mb-1">*/}
        {/*      Общая сумма рассрочки:*/}
        {/*    </h3>*/}
        {/*    <p className="text-2xl font-bold text-primary-700">*/}
        {/*      {formatter.format(totalAmount)}₽*/}
        {/*    </p>*/}
        {/*  </div>*/}
        {/*</div>*/}

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
          <div className="mt-4 grid grid-cols-1 gap-4">
            <button
              onClick={() => setIsResultModalOpen(true)}
              className="py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
            >
              Посмотреть результат
            </button>
          </div>
        </div>
      </div>
      <ResultModal
        isOpen={isResultModalOpen}
        onClose={() => setIsResultModalOpen(false)}
        price={price}
        initialFee={initialFee}
        monthlyPayment={monthlyPayment}
        term={term}
        totalAmount={totalAmount}
        monthlyMarkupPercent={monthlyMarkupPercent}
        totalMarkupPercent={totalMarkupPercent}
        totalMarkup={totalMarkup}
        amountPercent={initialFeePercentage}
        requiredGuarantorsToModal={requiredGuarantorsToModal}
      />
    </div>
  );
};

export default Calculator;
