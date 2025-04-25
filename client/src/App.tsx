import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import LandingPage from "@/pages/LandingPage";
import MessagePage from "@/pages/MessagePage";
import MyFeelings from "@/pages/MyFeelings";
import QuestionsPage from "@/pages/QuestionsPage";
import ThanksPage from "@/pages/ThanksPage";

function Router() {
  return (
    <Switch>
      <Route path="/" component={LandingPage} />
      <Route path="/message" component={MessagePage} />
      <Route path="/my-feelings" component={MyFeelings} />
      <Route path="/questions" component={QuestionsPage} />
      <Route path="/thanks" component={ThanksPage} />
      {/* Fallback to 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
