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
    <div className="max-w-4xl mx-auto">
      <div className="bg-white shadow-xl border-0 overflow-hidden rounded-xl">
        {/* Выбор типа товара */}
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 border-b">
          <div className="text-center">
            <label className="block text-xl font-semibold text-blue-900 mb-4">
              Выберите тип товара
            </label>
            <select
              value={markupType}
              onChange={(e) =>
                setMarkupType(
                  e.target.value as "Прочее" | "Автомобиль" | "Гаджеты",
                )
              }
              className="w-full max-w-xs mx-auto bg-white border-blue-200 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all font-medium"
            >
              <option value="Прочее">Прочее</option>
              <option value="Автомобиль">Автомобиль</option>
              <option value="Гаджеты">Гаджеты</option>
            </select>
          </div>
        </div>

        <div className="p-6 space-y-8">
          {/* Цена товара */}
          <div className="space-y-4">
            <label className="block text-lg font-medium text-gray-800">
              Цена товара
            </label>
            <div className="flex items-center gap-3">
              <button
                className="h-12 w-12 border-2 rounded-lg hover:bg-blue-50 hover:border-blue-300 flex items-center justify-center font-semibold transition-colors"
                onClick={() => {
                  const minAllowedPrice =
                    markupType === "Автомобиль" ? 500000 : MIN_PRICE;
                  setPrice((prev) => Math.max(prev - 500, minAllowedPrice));
                }}
              >
                –
              </button>
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={formatter.format(price)}
                  onChange={handlePriceChange}
                  onBlur={handlePriceBlur}
                  className="w-full text-center text-lg font-semibold bg-gray-50 border-2 rounded-lg p-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                />
              </div>
              <button
                className="h-12 w-12 border-2 rounded-lg hover:bg-blue-50 hover:border-blue-300 flex items-center justify-center font-semibold transition-colors"
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
          {/* Первоначальный взнос */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <label className="block text-lg font-medium text-gray-800">
                Первоначальный взнос
              </label>
              <span className="text-blue-600 font-semibold">
                ({initialFeePercentage}%)
              </span>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <button
                  className="h-12 w-12 border-2 rounded-lg hover:bg-blue-50 hover:border-blue-300 flex items-center justify-center font-semibold transition-colors"
                  onClick={() =>
                    setInitialFee((prev) => Math.max(prev - 500, 0))
                  }
                >
                  –
                </button>
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={formatter.format(initialFee)}
                    onChange={handleInitialFeeChange}
                    className="w-full text-center text-lg font-semibold bg-gray-50 border-2 rounded-lg p-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                  />
                </div>
                <button
                  className="h-12 w-12 border-2 rounded-lg hover:bg-blue-50 hover:border-blue-300 flex items-center justify-center font-semibold transition-colors"
                  onClick={() =>
                    setInitialFee((prev) => Math.min(prev + 500, price - 500))
                  }
                >
                  +
                </button>
              </div>

              <div className="px-2">
                <input
                  type="range"
                  min={0}
                  max={price - 500}
                  step={500}
                  value={initialFee}
                  onChange={(e) => setInitialFee(Number(e.target.value))}
                  className="w-full h-4 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-sm text-gray-500 mt-2">
                  <span>0 ₽</span>
                  <span>{formatter.format(price - 500)} ₽</span>
                </div>
              </div>
            </div>
          </div>
          {/* Срок рассрочки */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <label className="block text-lg font-medium text-gray-800">
                Срок рассрочки
              </label>
              <span className="text-blue-600 font-semibold text-lg">
                {term} {term === 1 ? "месяц" : term < 5 ? "месяца" : "месяцев"}
              </span>
            </div>

            <div className="flex items-center gap-4">
              <button
                className="h-12 w-14 border-2 rounded-lg hover:bg-blue-50 hover:border-blue-300 flex items-center justify-center font-semibold transition-colors"
                onClick={() => setTerm((prev) => Math.max(prev - 1, MIN_TERM))}
              >
                –
              </button>

              <div className="flex-1 px-2">
                <input
                  type="range"
                  min={MIN_TERM}
                  max={MAX_TERM}
                  value={term}
                  onChange={(e) => setTerm(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-sm text-gray-500 mt-2">
                  <span>1 месяц</span>
                  <span>24 месяца</span>
                </div>
              </div>

              <button
                className="h-12 w-14 border-2 rounded-lg hover:bg-blue-50 hover:border-blue-300 flex items-center justify-center font-semibold transition-colors"
                onClick={() => setTerm((prev) => Math.min(prev + 1, MAX_TERM))}
              >
                +
              </button>
            </div>
          </div>{" "}
          <button
            onClick={() => setIsResultModalOpen(true)}
            className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white text-lg py-4 rounded-lg font-semibold transition-colors"
          >
            Посмотреть результат
          </button>
          {/* Результат */}
          {/* <div className="bg-gradient-to-r from-blue-50 to-green-50 border-2 border-blue-200 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-blue-900 flex items-center gap-2">
                <FaInfoCircle className="h-5 w-5" />
                Расчет рассрочки
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Стоимость товара:</span>
                  <span className="font-semibold">
                    {formatter.format(price)} ₽
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Первоначальный взнос:</span>
                  <span className="font-semibold">
                    {formatter.format(initialFee)} ₽
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">К доплате:</span>
                  <span className="font-semibold">
                    {formatter.format(price - initialFee)} ₽
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Срок рассрочки:</span>
                  <span className="font-semibold">{term} мес.</span>
                </div>
                <div className="flex justify-between text-lg">
                  <span className="text-green-700 font-medium">
                    Ежемесячный платеж:
                  </span>
                  <span className="font-bold text-green-700 text-xl">
                    {formatter.format(monthlyPayment)} ₽
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsResultModalOpen(true)}
              className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white text-lg py-4 rounded-lg font-semibold transition-colors"
            >
              Посмотреть результат
            </button>
          </div> */}
          {/* Дополнительная информация */}
          {/* {showInfo && (
            <div className="mt-6 p-4 border border-gray-200 rounded-lg bg-gray-50">
              <div className="text-sm text-gray-600 space-y-2">
                <p>
                  <strong>Требуется поручителей:</strong>{" "}
                  {requiredGuarantors === 0
                    ? "Не требуется"
                    : `${requiredGuarantors} ${requiredGuarantors === 1 ? "поручитель" : "поручителей"}`}
                </p>
                <p>• Должны быть старше 21 года</p>
                <p>• Должны иметь действительное удостоверение личности</p>
                <p>• Должны быть способны производить платежи</p>
                <p>
                  • Необходимо уведомить члена семьи (родителя, брата/сестру,
                  супруга)
                </p>
              </div>
            </div>
          )} */}
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
