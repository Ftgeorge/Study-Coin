import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../components/ui/button";

interface Slide {
  title: string;
  subtitle?: string;
  image?: string;
  extraContent?: React.ReactNode;
  showPrevArrow?: boolean;
  showNextArrow?: boolean;
  autoAdvance?: boolean;
}

const slides: Slide[] = [
  {
    title: "Every task has a reward. \nWelcome to Learnit, where academic activities meet rewards",
    showPrevArrow: false,
    showNextArrow: false,
    autoAdvance: true,
  },
  {
    image: "/images/Dayflow.png",
    subtitle: "Earn 0.01 points per class",
    title: "",
    showPrevArrow: false,
    showNextArrow: true,
    autoAdvance: true,
  },
  {
    image: "/images/Allura.png",
    subtitle: "Earn points for early tune-ins",
    title: "",
    showPrevArrow: true,
    showNextArrow: true,
    autoAdvance: true,
  },
  {
    title: "Every study clock is a mining clock",
    subtitle: "Earn points for early tune-ins",
    extraContent: (
      <div className="flex flex-col md:flex-row justify-center gap-8 md:gap-20 mt-8">
        <div className="text-center">
          <img
            src="/images/book.png"
            alt="Book icon"
            className="w-16 h-16 md:w-24 md:h-24 text-[#0066FF] mx-auto"
          />
          <p className="text-[#0066FF] text-sm md:text-base mt-2">Mining as you read alone</p>
        </div>
        <div className="text-center">
          <img
            src="/images/studygroup.png"
            alt="Group study icon"
            className="w-24 h-24 md:w-32 md:h-32 mx-auto"
          />
          <p className="text-[#0066FF] text-sm md:text-base mt-2">Earn for group study</p>
        </div>
      </div>
    ),
    showPrevArrow: true,
    showNextArrow: true,
  },
];

export default function OnboardingCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (slides[currentSlide].autoAdvance) {
      timer = setTimeout(() => {
        nextSlide();
      }, 3000);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [currentSlide]);

  const nextSlide = () => {
    if (currentSlide === slides.length - 1) {
      navigate("/login");
    } else {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const { title, subtitle, image, extraContent, showPrevArrow, showNextArrow } = slides[currentSlide];

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-full max-w-2xl mx-auto px-6 relative">
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-[#0066FF] text-2xl md:text-3xl font-medium mb-4 whitespace-pre-line">
            {title}
          </h1>
        </div>

        <div className="flex flex-col items-center relative">
          {image && (
            <div className="relative w-full h-48 md:h-64">
              <img
                src={image}
                alt={`Slide ${currentSlide + 1}`}
                className="object-contain w-full h-full"
              />
            </div>
          )}
          {extraContent}
          {subtitle && (
            <p className="text-[#0066FF] text-lg md:text-xl whitespace-pre-line mt-4 mb-8">
              {subtitle}
            </p>
          )}

          <NavigationArrows
            onPrevClick={prevSlide}
            onNextClick={nextSlide}
            showPrev={showPrevArrow || false}
            showNext={showNextArrow || false}
          />
        </div>

        <DotNavigation
          totalDots={slides.length}
          activeDot={currentSlide}
          onDotClick={setCurrentSlide}
        />
      </div>
    </div>
  );
}

// NavigationArrows Component
interface NavigationArrowsProps {
  onPrevClick: () => void;
  onNextClick: () => void;
  showPrev: boolean;
  showNext: boolean;
}

function NavigationArrows({ onPrevClick, onNextClick, showPrev, showNext }: NavigationArrowsProps) {
  return (
    <div className="absolute top-1/2 left-2 right-2 transform -translate-y-1/2 flex items-center justify-between z-10">
      {showPrev && (
        <button
          onClick={onPrevClick}
          className="text-[#0066FF] text-2xl bg-white/50 rounded-full p-2 hover:bg-white/80 transition-all"
        >
          <img
            src="images/leftarrow.png"
            alt="left"
            className="w-6 h-6 object-contain"
          />
        </button>
      )}

      {showNext && (
        <button
          onClick={onNextClick}
          className="text-[#0066FF] text-2xl bg-white/50 rounded-full p-2 hover:bg-white/80 transition-all"
        >
          <img
            src="images/rightarrow.png"
            alt="right"
            className="w-6 h-6 object-contain"
          />
        </button>
      )}
    </div>
  );
}

// DotNavigation Component
interface DotNavigationProps {
  totalDots: number;
  activeDot: number;
  onDotClick: (index: number) => void;
}

function DotNavigation({ totalDots, activeDot, onDotClick }: DotNavigationProps) {
  return (
    <div className="flex justify-center mt-8">
      {Array.from({ length: totalDots }).map((_, index) => (
        <Button
          key={index}
          onClick={() => onDotClick(index)}
          className={`w-2 h-2 md:w-3 md:h-3 rounded-full mx-1 ${
            index === activeDot ? "bg-[#0066FF]" : "bg-gray-300"
          }`}
        />
      ))}
    </div>
  );
}