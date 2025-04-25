import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

const MyFeelings = () => {
  const [, navigate] = useLocation();
  const [isAnimated, setIsAnimated] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimated(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 bg-gradient-to-br from-primary-50 to-secondary-50 relative overflow-hidden">
      <div className="heart-bg"></div>
      
      {/* Floating hearts - hidden on mobile */}
      <div className={`hidden md:block absolute top-10 left-1/4 transition-all duration-1000 ${isAnimated ? 'opacity-70' : 'opacity-0'}`}>
        <Heart className="h-6 w-6 md:h-8 md:w-8 text-primary-300 animate-float delay-300" fill="currentColor" />
      </div>
      <div className={`hidden md:block absolute bottom-20 right-1/4 transition-all duration-1000 ${isAnimated ? 'opacity-70' : 'opacity-0'}`}>
        <Heart className="h-4 w-4 md:h-6 md:w-6 text-primary-400 animate-float delay-500" fill="currentColor" />
      </div>
      
      <Card className={`w-full max-w-[95%] sm:max-w-xl md:max-w-2xl lg:max-w-3xl bg-white/90 backdrop-blur rounded-xl shadow-lg transition-all duration-700 ${isAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <CardContent className="p-4 sm:p-6 md:p-8">
          <div className="text-center mb-6 md:mb-8">
            <h2 className="font-dancing text-3xl sm:text-4xl font-bold text-primary-700 mb-2">My Feelings</h2>
          </div>
          
          <div className="prose prose-sm sm:prose-base md:prose-lg max-w-none">
            <p className="text-gray-800 font-medium mb-4 md:mb-6">Dear Zubiyah,</p>

            <p className="mb-4 md:mb-6">I hope this message finds you well.</p>

            <p className="mb-4 md:mb-6">I've wanted to tell you something for a very long time, but never found the right moment. I tried to talk to you, but you didn't listen to me.</p>

            <p className="text-primary-700 font-medium italic mb-4 md:mb-6">Aap me kuch to baat hai... jis ke liye mai aap deewana ho gaya.</p>

            <p className="mb-4 md:mb-6 font-bold">Aur aap ki muskurahat, aap ka lehja, aur jis tarah aap apne aap ko itni nazakat se pesh karte ho – yeh sab meri dhadkanon ko rok deten hai.</p>

            <p className="mb-4 md:mb-6">Jab bhi aap ko dekhta hoon, meri puri duniya ruk jaati hai… yaar bas aap hi nazar aate ho.<br className="hidden sm:block"/>
            Dil zoron se dhadakne lagta hai, aur uski goonj kaanon tak sunai deti hai.</p>

            <p className="mb-4 md:mb-6">Aisa lagta hai jaise: "Haan… yeich hai vo, jiske saath main apni poori zindagi guzaar sakta hoon.<br className="hidden sm:block"/>
            Yaich hai vo, jiske mohabbat ke bina mai adhoora hoon,<br className="hidden sm:block"/>
            Aur jiske bina jeena mushkil hi nahi, namumkin ho gaya hai."</p>

            <p className="mb-4 md:mb-6">Pehli nazar mein hi mohabbat ho gayi thi app se.<br className="hidden sm:block"/>
            Aaj bhi yaad hai vo din – aap apne friends ke saath campus mein ghum rahi thi, black dress aur hijab mein – bass wahi se ye sab shuru hua.</p>

            <p className="mb-4 md:mb-6 font-bold">Phir vo 13th October ka fest…<br className="hidden sm:block"/>
            Vo tez hawa ka aap khule baalon se takraana,<br className="hidden sm:block"/>
            phir aap ka vo zulfon ko sambhalna,<br className="hidden sm:block"/>
            vo aap ki katilana muskurahat...<br className="hidden sm:block"/>
            Kya yeh sab kaafi nahi kisi ke dil chura lene ke liye?</p>

            <p className="mb-4 md:mb-6">Aur bhi bahut kuch bolne ka hai, magar sab kuch abhi bol doon to mile jab kya bolon? Isliye kuch baatein nai bola..</p>

            <p className="mb-4 md:mb-6">Bas ek baat bolna hai…<br className="hidden sm:block"/>
            Jo bolne ka mauka ab tak nai mila, aur shayad aage bhi na mile…<br className="hidden sm:block"/>
            Isliye socha is tarah bolna behtar hai.</p>

            <p className="text-primary-700 font-medium mb-4 md:mb-6">meku app se bepanah mohabbat hai.<br className="hidden sm:block"/>
            Socha tha – aap se door rehe to aap ko bhool jaton…<br className="hidden sm:block"/>
            Lekin bhoolna to chhodo, mohabbat aur bhi gehri hoti gayi.</p>

            <p className="mb-4 md:mb-6 font-bold">Mai aapku khud se zyada chahta hoon.<br className="hidden sm:block"/>
            aapku palkon pe rakhunga.<br className="hidden sm:block"/>
            aap ki har khwahish ko apna farz bana ke poora karunga.</p>

            <p className="mb-4 md:mb-6 font-bold">Bas umeed hai... ki aap ka jawab positive hoga.</p>

            <p className="text-gray-700 text-sm sm:text-base">Agar aap kuch  bolna, ya kuch puchhna chahati ho… to agle page me likh do.<br className="hidden sm:block"/>
            <span className="font-bold">Lekin please next page me mere pehle sawaal ka jawab zarur dena…</span></p>

            <p className="mt-6 text-gray-700 text-sm sm:text-base italic">P.S. If anything in this letter has caused you any discomfort or hurt your feelings, I sincerely apologize. That was never my intention.</p>
          </div>
          
          <div className="mt-6 md:mt-8 flex justify-center">
            <Button
              onClick={() => navigate('/questions')}
              className="w-full sm:w-auto bg-gradient-to-r from-[#f857a6] to-[#ff5858] text-white text-sm sm:text-base font-medium py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-md"
            >
              Continue
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MyFeelings; 