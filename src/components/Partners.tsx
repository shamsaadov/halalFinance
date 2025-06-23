import { useState, useEffect } from "react";
import part1 from "../assets/partner1.png";
import part2 from "../assets/partner2.png";
import part3 from "../assets/partner3.png";
import part4 from "../assets/partner4.png";

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
    {
      id: 4,
      name: "Форса - Натяжные потолки",
      logo: part4,
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
  const [currentSlide, setCurrentSlide] = useState(0);
  const [visibleCards, setVisibleCards] = useState(1);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  // Количество видимых карточек в зависимости от размера экрана
  const getVisibleCards = () => {
    if (typeof window !== "undefined") {
      if (window.innerWidth >= 1024) return 4; // lg и больше
      if (window.innerWidth >= 768) return 3; // md
      if (window.innerWidth >= 640) return 2; // sm
    }
    return 1; // мобильные
  };

  // Обновление количества видимых карточек при изменении размера экрана
  useEffect(() => {
    const updateVisibleCards = () => {
      const newVisibleCards = getVisibleCards();
      setVisibleCards(newVisibleCards);

      // Сброс слайда если текущий слайд выходит за границы
      const newMaxSlide = Math.max(
        0,
        Math.ceil(partners.length / newVisibleCards) - 1
      );
      if (currentSlide > newMaxSlide) {
        setCurrentSlide(newMaxSlide);
      }
    };

    updateVisibleCards();
    window.addEventListener("resize", updateVisibleCards);

    return () => window.removeEventListener("resize", updateVisibleCards);
  }, [currentSlide, partners.length]);

  const maxSlide = Math.max(0, Math.ceil(partners.length / visibleCards) - 1);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev >= maxSlide ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev <= 0 ? maxSlide : prev - 1));
  };

  // Touch события для свайпа
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe && currentSlide < maxSlide) {
      nextSlide();
    }
    if (isRightSwipe && currentSlide > 0) {
      prevSlide();
    }
  };

  return (
    <div className="w-full">
      {/* Слайдер партнеров */}
      <div className="relative">
        {/* Кнопка влево */}
        <button
          onClick={prevSlide}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white border border-gray-200 rounded-full p-2 shadow-md transition-all duration-200 hover:shadow-lg"
          disabled={partners.length <= visibleCards}
        >
          <svg
            className="w-5 h-5 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        {/* Контейнер слайдера */}
        <div className="overflow-hidden mx-8">
          <div
            className="flex transition-transform duration-300 ease-in-out touch-pan-y"
            style={{
              transform: `translateX(-${currentSlide * 100}%)`,
            }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {Array.from({
              length: Math.ceil(partners.length / visibleCards),
            }).map((_, slideIndex) => (
              <div key={slideIndex} className="flex w-full flex-shrink-0 gap-6">
                {partners
                  .slice(
                    slideIndex * visibleCards,
                    (slideIndex + 1) * visibleCards
                  )
                  .map((partner) => (
                    <div
                      key={partner.id}
                      className={`
                         group relative bg-white rounded-lg shadow-sm border border-gray-200 
                         p-4 transition-all duration-300 hover:shadow-lg hover:border-primary-300
                         flex-1
                         ${hoveredPartner === partner.id ? "transform scale-105" : ""}
                       `}
                      onMouseEnter={() => setHoveredPartner(partner.id)}
                      onMouseLeave={() => setHoveredPartner(null)}
                    >
                      <div className="flex flex-col items-center justify-center h-full min-h-[120px]">
                        <div className="w-full h-16 flex items-center justify-center mb-2">
                          <img
                            src={partner.logo}
                            alt={partner.name}
                            className="max-w-full max-h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                          />
                        </div>
                        <p className="text-xs text-gray-600 text-center font-medium leading-tight">
                          {partner.name}
                        </p>
                      </div>
                    </div>
                  ))}
                {/* Заполнение пустых мест, если карточек меньше чем visibleCards */}
                {partners.slice(
                  slideIndex * visibleCards,
                  (slideIndex + 1) * visibleCards
                ).length < visibleCards &&
                  Array.from({
                    length:
                      visibleCards -
                      partners.slice(
                        slideIndex * visibleCards,
                        (slideIndex + 1) * visibleCards
                      ).length,
                  }).map((_, emptyIndex) => (
                    <div key={`empty-${emptyIndex}`} className="flex-1" />
                  ))}
              </div>
            ))}
          </div>
        </div>

        {/* Кнопка вправо */}
        <button
          onClick={nextSlide}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white border border-gray-200 rounded-full p-2 shadow-md transition-all duration-200 hover:shadow-lg"
          disabled={partners.length <= visibleCards}
        >
          <svg
            className="w-5 h-5 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>

        {/* Индикаторы слайдов */}
        {maxSlide > 0 && (
          <div className="flex justify-center mt-4 space-x-2">
            {Array.from({ length: maxSlide + 1 }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 rounded-full transition-all duration-200 ${
                  currentSlide === index
                    ? "bg-primary-600 w-6"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>
        )}
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
