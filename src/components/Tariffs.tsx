import { FaUserFriends, FaMoneyBillWave } from "react-icons/fa";

interface TariffCardProps {
  type: "withDownPayment" | "noDownPayment";
  priceRange: string;
  guarantors: number;
}

// Компонент карточки тарифа
const TariffCard: React.FC<TariffCardProps> = ({
  type,
  priceRange,
  guarantors,
}) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="flex items-center mb-4">
        {type === "withDownPayment" ? (
          <div className="bg-primary-100 text-primary-700 p-3 rounded-full">
            <FaMoneyBillWave size={24} />
          </div>
        ) : (
          <div className="bg-secondary-100 text-secondary-700 p-3 rounded-full">
            <FaUserFriends size={24} />
          </div>
        )}
        <h3 className="ml-4 text-lg font-semibold">
          {type === "withDownPayment"
            ? "С первоначальным взносом"
            : "Без первоначального взноса"}
        </h3>
      </div>
      <div className="mt-2 text-gray-700">
        <p className="mb-2">Диапазон цен: {priceRange}</p>
        <p>
          {guarantors === 0
            ? "Поручители не требуются"
            : `${guarantors} ${guarantors === 1 ? "поручитель" : "поручителей"} требуется`}
        </p>
      </div>
    </div>
  );
};

const Tariffs = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <TariffCard
        type="noDownPayment"
        priceRange="0₽ до 50,000₽"
        guarantors={1}
      />
      <TariffCard
        type="noDownPayment"
        priceRange="50,001₽ до 100,000₽"
        guarantors={2}
      />
      <TariffCard
        type="withDownPayment"
        priceRange="0₽ до 50,000₽"
        guarantors={0}
      />
      <TariffCard
        type="withDownPayment"
        priceRange="50,001₽ до 150,000₽"
        guarantors={1}
      />
      <TariffCard
        type="withDownPayment"
        priceRange="150,001₽ до 300,000₽"
        guarantors={2}
      />
      <TariffCard
        type="withDownPayment"
        priceRange="300,001₽ до 3,000,000₽"
        guarantors={3}
      />
    </div>
  );
};

export default Tariffs;
