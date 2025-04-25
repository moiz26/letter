import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Heart, ExternalLink, MessageCircle } from "lucide-react";

const QuestionsPage = () => {
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAnimated, setIsAnimated] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimated(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);
  
  const [formData, setFormData] = useState({
    annualDay: "",
    additionalInfo: ""
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Submit responses to the API
      await apiRequest('POST', '/api/submit-response', formData);
      
      // Navigate to thank you page
      navigate('/thanks');
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit your responses. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 md:p-6 lg:p-8 bg-gradient-to-br from-primary-50 to-secondary-50 relative overflow-hidden">
      <div className="heart-bg"></div>
      
      {/* Floating hearts - Responsive positioning */}
      <div className={`absolute top-10 left-1/4 hidden sm:block transition-all duration-1000 ${isAnimated ? 'opacity-70' : 'opacity-0'}`}>
        <Heart className="h-6 w-6 md:h-8 md:w-8 text-primary-300 animate-float delay-300" fill="currentColor" />
      </div>
      <div className={`absolute bottom-20 right-1/4 hidden sm:block transition-all duration-1000 ${isAnimated ? 'opacity-70' : 'opacity-0'}`}>
        <Heart className="h-4 w-4 md:h-6 md:w-6 text-primary-400 animate-float delay-500" fill="currentColor" />
      </div>
      
      <Card className={`w-full max-w-[95%] sm:max-w-md md:max-w-lg lg:max-w-xl bg-white/95 backdrop-blur rounded-xl shadow-lg transition-all duration-700 ${isAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <CardContent className="p-4 sm:p-6 md:p-8">
          <div className="text-center mb-6 md:mb-8">
            <h2 className="font-dancing text-3xl sm:text-4xl font-bold text-primary-700 mb-2">Let's Connect</h2>
            <p className="text-gray-600 text-sm sm:text-base">I'd love to get to know you better</p>
            <p className="text-primary-600 font-medium mt-3 md:mt-4 text-sm sm:text-base">Whatever your answers may be, I just request you to please respond to these questions.</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            <div className={`input-container transition-all duration-700 delay-100 ${isAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <Textarea
                id="annualDay"
                name="annualDay"
                value={formData.annualDay}
                onChange={handleChange}
                className="form-input text-sm sm:text-base border-2 border-primary-200 focus:border-primary-500 min-h-[100px]"
                placeholder="Please type your response here..."
                rows={3}
              />
              <Label htmlFor="annualDay" className="block mb-2 text-sm sm:text-base font-medium text-gray-700">Are you coming today (for annual day)?</Label>
              <p className="text-xs sm:text-sm text-gray-600 mt-2 italic">Please let me know immediately!</p>
            </div>
            
            <div className={`input-container transition-all duration-700 delay-300 ${isAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <Textarea
                id="additionalInfo"
                name="additionalInfo"
                value={formData.additionalInfo}
                onChange={handleChange}
                className="form-input text-sm sm:text-base border-2 border-primary-200 focus:border-primary-500 min-h-[100px]"
                placeholder="Feel free to share your thoughts or questions here..."
                rows={3}
              />
              <Label htmlFor="additionalInfo" className="block mb-2 text-sm sm:text-base font-medium text-gray-700">Is there anything you want to know or tell me, then please let me know here</Label>
              <div className="mt-3 p-2 sm:p-3 bg-gray-50 rounded-lg border border-gray-100">
                <p className="text-xs sm:text-sm text-gray-600">
                  I would be really happy if we could connect on Snapchat:
                  <a 
                    href="https://www.snapchat.com/add/unkknown967?share_id=EfOz6Ro0rcw&locale=en-IN" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 mt-2 text-primary-600 hover:text-primary-700 font-medium transition-colors"
                  >
                    <MessageCircle className="h-4 w-4 sm:h-5 sm:w-5" />
                    <span>@unkknown967</span>
                    <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4" />
                  </a>
                </p>
              </div>
            </div>
            
            <div className={`mt-6 sm:mt-8 transition-all duration-700 delay-900 ${isAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-[#f857a6] to-[#ff5858] text-white font-medium py-2.5 sm:py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-md text-sm sm:text-base"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <span className="animate-spin mr-2">
                      <Heart className="h-4 w-4 sm:h-5 sm:w-5" />
                    </span>
                    <span>Submitting...</span>
                  </span>
                ) : (
                  "Submit"
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuestionsPage;
