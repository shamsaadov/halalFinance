import {
  FaMosque,
  FaHandHoldingUsd,
  FaUserClock,
  FaMapMarkerAlt,
  FaMoneyCheckAlt,
  FaUsers,
} from "react-icons/fa";

interface ConditionCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

// Компонент карточки условий
const ConditionCard: React.FC<ConditionCardProps> = ({
  icon,
  title,
  description,
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex items-start">
      <div className="text-primary-600 mr-4 mt-1">{icon}</div>
      <div>
        <h3 className="font-medium text-lg text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
};

const Conditions = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <ConditionCard
        icon={<FaMosque size={24} />}
        title="Принципы исламского финансирования"
        description="Наши планы рассрочки соответствуют принципам исламского финансирования без процентных ставок, только фиксированная наценка на товары."
      />

      <ConditionCard
        icon={<FaHandHoldingUsd size={24} />}
        title="Без штрафов и сборов"
        description="Мы не взимаем штрафы за просрочку или дополнительные сборы. Наша система основана на взаимном уважении и прозрачном ценообразовании."
      />

      <ConditionCard
        icon={<FaUserClock size={24} />}
        title="Требование к возрасту"
        description="Планы рассрочки доступны клиентам, достигшим 21 года и старше."
      />

      <ConditionCard
        icon={<FaMapMarkerAlt size={24} />}
        title="Требование к месту жительства"
        description="У вас должно быть зарегистрированное место жительства, чтобы претендовать на наши планы рассрочки."
      />

      <ConditionCard
        icon={<FaMoneyCheckAlt size={24} />}
        title="Способность к оплате"
        description="Клиенты должны продемонстрировать наличие стабильного дохода, достаточного для ежемесячных платежей."
      />

      <ConditionCard
        icon={<FaUsers size={24} />}
        title="Уведомление семьи"
        description="Один член семьи (родитель, брат/сестра или супруг) должен быть проинформирован о вашем плане рассрочки."
      />
    </div>
  );
};

export default Conditions;
