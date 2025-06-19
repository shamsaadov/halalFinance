import { useState } from "react";
import part1 from "../assets/partner1.png";
import part2 from "../assets/partner2.png";
import part3 from "../assets/partner3.png";

const Partners = () => {
  const partners = [
    {
      id: 1,
      name: "Бытовая техника ТехноКлик",
      logo: part1,
      website: "#",
    },
    {
      id: 2,
      name: "Sham Store скупка и продаже телефонов",
      logo: part2,
      website: "#",
    },
    {
      id: 3,
      name: "Колизей - Цифровая арена",
      logo: part3,
      website: "#",
    },
  ];

  const handleGoToWhatsapp = () => {
    const message =
      "Ассаламу 1алейкум Варох1матуллох1и Вабаракатух1у, хочу стать партнером";
    const phone = "79825029591";
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  const [hoveredPartner, setHoveredPartner] = useState<number | null>(null);

  return (
    <div className="w-full">
      {/* Сетка партнеров */}
      <div className="flex justify-center content-center grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
        {partners.map((partner) => (
          <div
            key={partner.id}
            className={`
              group relative bg-white rounded-lg shadow-sm border border-gray-200 
              p-4 transition-all duration-300 hover:shadow-lg hover:border-primary-300
              ${hoveredPartner === partner.id ? "transform scale-105" : ""}
            `}
            onMouseEnter={() => setHoveredPartner(partner.id)}
            onMouseLeave={() => setHoveredPartner(null)}
          >
            <span className="block w-full h-full">
              <div className="flex flex-col items-center justify-center h-full min-h-[100px]">
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="w-full h-16 object-contain mb-2 filter grayscale group-hover:grayscale-0 transition-all duration-300"
                />
                <p className="text-xs text-gray-600 text-center font-medium leading-tight">
                  {partner.name}
                </p>
              </div>
            </span>
          </div>
        ))}
      </div>

      {/* Информационный блок */}
      <div className="mt-12 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-xl p-6 text-center">
        <h3 className="text-xl font-semibold text-secondary-900 mb-3">
          Стать партнером
        </h3>
        <p className="text-gray-700 mb-4 max-w-2xl mx-auto">
          Мы всегда открыты для новых партнерских отношений. Если вы хотите
          присоединиться к нашей сети и предлагать исламские финансовые услуги
          своим клиентам, свяжитесь с нами.
        </p>
        <button
          onClick={handleGoToWhatsapp}
          className="inline-flex items-center px-6 py-3 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
          Стать партнером
        </button>
      </div>
    </div>
  );
};

export default Partners;
