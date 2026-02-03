import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { promoSlides } from "@/data/mockData";

const PromoSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % promoSlides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + promoSlides.length) % promoSlides.length);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    // Resume autoplay after 5 seconds
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide]);

  const slide = promoSlides[currentSlide];

  return (
    <div className="relative w-full overflow-hidden rounded-3xl">
      {/* Slides container */}
      <div className="relative aspect-[16/9] sm:aspect-[21/9] md:aspect-[3/1] lg:aspect-[4/1]">
        {promoSlides.map((s, index) => (
          <div
            key={s.id}
            className={`absolute inset-0 transition-all duration-700 ease-in-out ${
              index === currentSlide
                ? "opacity-100 translate-x-0"
                : index < currentSlide
                ? "opacity-0 -translate-x-full"
                : "opacity-0 translate-x-full"
            }`}
          >
            {/* Background image */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${s.imageUrl})` }}
            />
            {/* Gradient overlay */}
            <div className={`absolute inset-0 bg-gradient-to-r ${s.gradient}`} />

            {/* Content */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="container mx-auto px-14 sm:px-16 md:px-20 lg:px-24 flex justify-center">
                <div className="max-w-lg space-y-1 sm:space-y-4 text-center">
                  <h2 className="text-base sm:text-2xl md:text-4xl lg:text-5xl font-bold text-white drop-shadow-lg">
                    {s.title}
                  </h2>
                  <p className="text-white/90 text-[10px] sm:text-sm md:text-base lg:text-lg drop-shadow line-clamp-2">
                    {s.description}
                  </p>
                  <div className="flex justify-center">
                    <Link
                      to={s.link}
                      className="inline-block glass-strong px-2 py-1 sm:px-6 sm:py-3 rounded-lg sm:rounded-xl text-xs sm:text-base font-medium text-white hover:bg-white/30 transition-all hover:scale-105"
                    >
                      {s.buttonText}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation arrows */}
      <button
        onClick={() => {
          prevSlide();
          setIsAutoPlaying(false);
          setTimeout(() => setIsAutoPlaying(true), 5000);
        }}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 md:p-3 rounded-full glass hover:bg-white/30 transition-all hover:scale-110"
        aria-label="Previous slide"
      >
        <HiChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-white" />
      </button>
      <button
        onClick={() => {
          nextSlide();
          setIsAutoPlaying(false);
          setTimeout(() => setIsAutoPlaying(true), 5000);
        }}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 md:p-3 rounded-full glass hover:bg-white/30 transition-all hover:scale-110"
        aria-label="Next slide"
      >
        <HiChevronRight className="w-5 h-5 md:w-6 md:h-6 text-white" />
      </button>

      {/* Dots indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {promoSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`slider-dot ${index === currentSlide ? "active" : ""}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default PromoSlider;
