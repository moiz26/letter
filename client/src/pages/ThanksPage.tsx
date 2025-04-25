import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Heart } from "lucide-react";

const FloatingHeart = ({ size = 20, color = "text-primary-400", delay = 0, duration = 8, left = "50%" }: {
  size?: number;
  color?: string;
  delay?: number;
  duration?: number;
  left?: string;
}) => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay * 1000);
    
    return () => clearTimeout(timer);
  }, [delay]);
  
  return (
    <div 
      className={`absolute bottom-0 transition-opacity duration-1000 ${isVisible ? 'opacity-70' : 'opacity-0'}`}
      style={{ 
        left, 
        animation: `floatUp ${duration}s ease-in-out infinite`,
        animationDelay: `${delay}s`
      }}
    >
      <Heart 
        className={`h-${size} w-${size} ${color}`} 
        fill="currentColor"
      />
    </div>
  );
};

const ThanksPage = () => {
  const [isAnimated, setIsAnimated] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimated(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-primary-50 to-secondary-50 relative overflow-hidden">
      <div className="heart-bg"></div>
      
      {/* Floating hearts animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <FloatingHeart size={6} color="text-primary-300" delay={1} duration={12} left="20%" />
        <FloatingHeart size={8} color="text-primary-400" delay={2} duration={15} left="30%" />
        <FloatingHeart size={5} color="text-primary-300" delay={0.5} duration={10} left="40%" />
        <FloatingHeart size={10} color="text-primary-500" delay={3} duration={18} left="50%" />
        <FloatingHeart size={6} color="text-primary-400" delay={1.5} duration={14} left="60%" />
        <FloatingHeart size={7} color="text-primary-300" delay={2.5} duration={13} left="70%" />
        <FloatingHeart size={5} color="text-primary-200" delay={0.8} duration={11} left="80%" />
      </div>
      
      <Card className={`w-full max-w-md bg-white rounded-xl shadow-lg transition-all duration-1000 ${isAnimated ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
        <CardContent className="p-8 text-center">
          <div className={`mb-8 transition-all duration-1000 delay-300 ${isAnimated ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>
            <div className="relative inline-block">
              <Heart className="h-16 w-16 text-primary-500 animate-pulse" fill="currentColor" />
              <Heart className="h-16 w-16 text-primary-600 absolute top-0 left-0 animate-ping opacity-70" />
            </div>
          </div>
          
          <div className="space-y-6">
            <h2 className={`font-dancing text-4xl font-bold text-primary-700 mb-4 transition-all duration-1000 delay-500 ${isAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'}`}>
              Shukriya
            </h2>
            <p className={`text-gray-700 leading-relaxed text-lg transition-all duration-1000 delay-700 ${isAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              Aap ka itna waqt dene ke liye.
            </p>
            <p className={`text-gray-700 leading-relaxed font-medium mt-6 text-lg transition-all duration-1000 delay-900 ${isAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              From love to you 💌
            </p>
          </div>
          
          <div className={`mt-10 flex justify-center space-x-6 transition-all duration-1000 delay-1200 ${isAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="animate-float delay-100">
              <Heart className="h-8 w-8 text-primary-400" fill="currentColor" />
            </div>
            <div className="animate-float delay-300">
              <Heart className="h-10 w-10 text-primary-500" fill="currentColor" />
            </div>
            <div className="animate-float delay-500">
              <Heart className="h-8 w-8 text-primary-600" fill="currentColor" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ThanksPage;
