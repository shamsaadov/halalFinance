import React from "react";
import { formatter } from "../shared/constants.ts";

interface ResultModalProps {
  isOpen: boolean;
  onClose: () => void;
  price: number;
  initialFee: number;
  amountPercent: number;
  monthlyPayment: number;
  term: number;
  totalAmount: number;
  monthlyMarkupPercent: number;
  totalMarkupPercent: number;
  totalMarkup: number;
  requiredGuarantorsToModal: any;
}

const ResultModal: React.FC<ResultModalProps> = ({
  isOpen,
  onClose,
  price,
  initialFee,
  monthlyPayment,
  term,
  amountPercent,
  requiredGuarantorsToModal,
}) => {
  const roundToNearest500 = (n: number): number => Math.round(n / 500) * 500;

  const computedTotalAmount = roundToNearest500(
    roundToNearest500(monthlyPayment) * term + initialFee,
  );

  const computedTotalMarkup = roundToNearest500(computedTotalAmount - price);

  const computedTotalMarkupPercent = (computedTotalMarkup / price) * 100;

  const computedMonthlyMarkupPercent = computedTotalMarkupPercent / term;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">
            Результат расчета
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>
        <div className="space-y-3 text-gray-700">
          <p>
            <span className="font-medium">Стоимость товара:</span>{" "}
            {formatter.format(price)}₽
          </p>
          <p>
            <span className="font-medium">Взнос:</span>{" "}
            {formatter.format(initialFee)}₽ ({amountPercent}%)
          </p>
          <p>
            <span className="font-medium">Ежемесячная оплата:</span>{" "}
            {formatter.format(roundToNearest500(monthlyPayment))}₽
          </p>
          <p>
            <span className="font-medium">Срок рассрочки:</span> {term}{" "}
            {term === 1 ? "месяц" : "месяцев"}
          </p>
          <p>
            <span className="font-medium">Общая сумма рассрочки:</span>{" "}
            {/*{formatter.format(roundToNearest500(totalAmount))}₽ */}
            {formatter.format(computedTotalAmount)}₽
          </p>
          <p>
            <span className="font-medium">Месячная наценка:</span>{" "}
            {computedMonthlyMarkupPercent.toFixed(2)}%
          </p>
          <p>
            <span className="font-medium">Общая наценка:</span>{" "}
            {computedTotalMarkupPercent.toFixed(2)}% (
            {formatter.format(computedTotalMarkup)}₽)
          </p>
          <p>
            <span className="font-medium text-red-700">
              Требуется поручителей: {requiredGuarantorsToModal}
            </span>{" "}
          </p>
        </div>
        <button
          onClick={onClose}
          className="mt-6 w-full py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
        >
          Закрыть
        </button>
      </div>
    </div>
  );
};

export default ResultModal;
