import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Heart, Sparkles } from "lucide-react";

const LandingPage = () => {
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [nameAttempts, setNameAttempts] = useState(0);
  const [dobAttempts, setDobAttempts] = useState(0);
  const [isAnimated, setIsAnimated] = useState(false);
  const [showHearts, setShowHearts] = useState(false);

  useEffect(() => {
    // Start the animations after a small delay
    const timer = setTimeout(() => {
      setIsAnimated(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      // Format date from YYYY-MM-DD to DD-MM-YYYY
      const [year, month, day] = dob.split('-');
      const formattedDate = `${day}-${month}-${year}`;

      console.log('Submitting credentials:', {
        name: name.trim(),
        originalDate: dob,
        formattedDate
      });

      const response = await fetch('/api/validate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name.trim(),
          dob: formattedDate
        }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Invalid credentials');
      }

      // Store the user's name in sessionStorage before navigation
      sessionStorage.setItem('userName', name.trim());
      
      // If validation successful, navigate to letter page
      navigate('/message');
    } catch (error) {
      console.error('Login error:', error);
      setError(error instanceof Error ? error.message : 'Invalid credentials. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Enhanced heart confetti component
  const HeartConfetti = () => {
    return (
      <div className="fixed inset-0 z-50 pointer-events-none overflow-hidden">
        {Array.from({ length: 30 }).map((_, i) => {
          const randomSize = 10 + Math.random() * 20;
          const randomDuration = 0.6 + Math.random() * 1.2;
          const randomDelay = Math.random() * 0.5;
          const randomX = Math.random() * 100;
          const randomRotation = Math.random() * 360;
          
          return (
            <div
              key={i}
              className="absolute bottom-1/3 text-red-600"
              style={{
                left: `${randomX}%`,
                width: `${randomSize}px`,
                height: `${randomSize}px`,
                animation: `confettiExplode ${randomDuration}s ease-out ${randomDelay}s forwards`,
                transform: `rotate(${randomRotation}deg)`,
              }}
            >
              <Heart
                className="w-full h-full"
                style={{
                  animation: `confettiRotate ${randomDuration * 1.2}s ease-in-out ${randomDelay}s infinite`,
                }}
                fill="currentColor"
              />
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="heart-bg" />
      
      {/* Show heart confetti when credentials are validated */}
      {showHearts && <HeartConfetti />}
      
      {/* Floating decorative elements */}
      <div className={`absolute top-10 left-1/4 transition-all duration-1000 ${isAnimated ? 'opacity-70 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
        <Heart className="h-8 w-8 text-pink-400 animate-float delay-300" fill="currentColor" />
      </div>
      <div className={`absolute bottom-20 right-1/4 transition-all duration-1000 ${isAnimated ? 'opacity-70 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <Heart className="h-6 w-6 text-pink-400 animate-float delay-500" fill="currentColor" />
      </div>
      <div className={`absolute top-1/3 right-20 transition-all duration-1000 ${isAnimated ? 'opacity-70 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <Sparkles className="h-5 w-5 text-yellow-400 animate-float" />
      </div>
      
      <div className={`glass-card p-8 w-full max-w-md relative transition-all duration-700 ${isAnimated ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95'}`}>
        <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
          <Heart className="h-12 w-12 text-pink-600 animate-float" fill="currentColor" />
        </div>
        
        <h1 className="text-4xl font-bold text-center mb-2 mt-4">
          <span className="bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
            A special message
          </span>
        </h1>
        <p className="text-gray-600 text-center mb-8 animate-shimmer">is waiting for you</p>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="input-container">
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-input"
              placeholder=" "
              required
            />
            <label htmlFor="name" className="floating-label">Name (Z..../Z.... K....)</label>
          </div>
          
          <div className="input-container">
            <input
              type="date"
              id="dob"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              className="form-input"
              required
            />
            <label htmlFor="dob" className="floating-label">Date of Birth (2_-0_-200_)</label>
          </div>
          
          {error && (
            <div className="text-red-500 text-sm text-center my-2 animate-shake">
              {error}
              {nameAttempts >= 5 && (
                <div className="mt-1 text-xs">
                  Hint: Try "z....h k.....n"
                </div>
              )}
              {dobAttempts >= 4 && (
                <div className="mt-1 text-xs">
                  Hint: Try "2_ - 0_ - 200_"
                </div>
              )}
            </div>
          )}
          
          <button 
            type="submit" 
            disabled={isLoading}
            className="btn-primary w-full text-white font-medium py-3 px-4 rounded-lg"
          >
            {isLoading ? (
              <span className="flex items-center justify-center space-x-2">
                <div className="loading-spinner" />
                <span>Verifying...</span>
              </span>
            ) : (
              <span className="flex items-center justify-center space-x-2">
                <Sparkles className="h-5 w-5" />
                <span>Access Portal</span>
              </span>
            )}
          </button>
        </form>
        
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500 animate-pulse">✨ Something special awaits you ✨</p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
