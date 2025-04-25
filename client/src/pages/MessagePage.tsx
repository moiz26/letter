import { useEffect, useState, useRef } from "react";
import { useLocation } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

const MessagePage = () => {
  const [, navigate] = useLocation();
  const [name, setName] = useState("");
  const [visibleParagraphs, setVisibleParagraphs] = useState(0);
  const [showButton, setShowButton] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  
  useEffect(() => {
    // Check if user came through the validation process
    const userName = sessionStorage.getItem('userName');
    if (!userName) {
      navigate('/');
      return;
    }
    
    setName(userName);
    
    // Sequentially reveal paragraphs
    let count = 0;
    const revealNextParagraph = () => {
      count += 1;
      setVisibleParagraphs(count);
      
      if (count < paragraphs.length) {
        timerRef.current = setTimeout(revealNextParagraph, 800);
      } else {
        setTimeout(() => setShowButton(true), 800);
      }
    };
    
    // Start the sequence after a short delay
    timerRef.current = setTimeout(revealNextParagraph, 800);
    
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [navigate]);
  
  const handleNext = () => {
    navigate('/my-feelings');
  };
  
  // Custom message for Zubiyah
  const paragraphs = [
    <>Dear <span className="font-medium text-primary-700">{name}</span>,</>,
    "This is not just a message. It's a feeling that couldn't be kept hidden.",
    "Maybe this is strange, maybe it's sudden... but it's real.",
    "From the one whose heart skips when you smile."
  ];
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-pink-50 to-purple-50 relative overflow-hidden">
      <div className="heart-bg"></div>
      
      {/* Large Hearts */}
      <div className="absolute top-10 left-1/4">
        <Heart className="h-10 w-10 text-red-500 animate-float delay-300" fill="currentColor" />
      </div>
      <div className="absolute bottom-32 right-1/3">
        <Heart className="h-12 w-12 text-gray-800 animate-float delay-500" fill="currentColor" />
      </div>
      <div className="absolute top-1/4 right-20">
        <Heart className="h-9 w-9 text-red-600 animate-float delay-200" fill="currentColor" />
      </div>
      
      {/* Medium Hearts */}
      <div className="absolute top-1/3 right-16">
        <Heart className="h-6 w-6 text-red-400 animate-float delay-700" fill="currentColor" />
      </div>
      <div className="absolute bottom-1/4 left-20">
        <Heart className="h-7 w-7 text-gray-800 animate-float delay-150" fill="currentColor" />
      </div>
      <div className="absolute top-20 right-1/4">
        <Heart className="h-8 w-8 text-red-600 animate-float delay-400" fill="currentColor" />
      </div>
      <div className="absolute bottom-40 left-1/4">
        <Heart className="h-7 w-7 text-red-500 animate-float delay-600" fill="currentColor" />
      </div>
      
      {/* Small Hearts */}
      <div className="absolute top-1/2 right-12">
        <Heart className="h-4 w-4 text-red-500 animate-float delay-350" fill="currentColor" />
      </div>
      <div className="absolute bottom-24 left-16">
        <Heart className="h-3 w-3 text-gray-900 animate-float delay-450" fill="currentColor" />
      </div>
      <div className="absolute top-28 left-1/3">
        <Heart className="h-4 w-4 text-red-400 animate-float delay-250" fill="currentColor" />
      </div>
      
      {/* Extra Small Hearts for Detail */}
      <div className="absolute top-40 right-28">
        <Heart className="h-2 w-2 text-red-500 animate-float delay-550" fill="currentColor" />
      </div>
      <div className="absolute bottom-48 left-40">
        <Heart className="h-2 w-2 text-gray-800 animate-float delay-800" fill="currentColor" />
      </div>
      
      {/* Scattered Medium Hearts */}
      <div className="absolute top-3/4 right-1/4">
        <Heart className="h-6 w-6 text-red-600 animate-float delay-650" fill="currentColor" />
      </div>
      <div className="absolute top-1/3 left-1/3">
        <Heart className="h-5 w-5 text-gray-900 animate-float delay-750" fill="currentColor" />
      </div>
      <div className="absolute bottom-1/3 right-36">
        <Heart className="h-8 w-8 text-red-400 animate-float delay-275" fill="currentColor" />
      </div>
      
      <Card className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden relative">
        <div className="absolute -top-1 -right-1 rotate-45 opacity-60">
          <Heart className="h-16 w-16 text-primary-200" fill="currentColor" />
        </div>
        
        <CardContent className="p-8 relative">
          <div className="text-center mb-8 animate-fade-in">
            <h2 className="font-dancing text-4xl font-bold text-pink-700 mb-1">A Message From the Heart</h2>
          </div>
          
          <div className="space-y-6 min-h-[220px]">
            {paragraphs.map((paragraph, index) => (
              <p 
                key={index} 
                className={`text-gray-700 leading-relaxed transition-all duration-1000 ${
                  index < visibleParagraphs 
                    ? 'opacity-100 transform translate-y-0' 
                    : 'opacity-0 transform translate-y-4'
                }`}
              >
                {paragraph}
              </p>
            ))}
          </div>
          
          <div className={`mt-12 text-center transition-all duration-1000 ${
            showButton ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'
          }`}>
            <Button 
              onClick={handleNext}
              className="bg-gradient-to-r from-[#f857a6] to-[#ff5858] text-white font-medium py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-md hover:opacity-90"
            >
              <span>Next</span>
              <span className="ml-2 inline-block transform translate-x-0 transition-transform group-hover:translate-x-1">→</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MessagePage;
