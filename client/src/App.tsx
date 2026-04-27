import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import ChatWidget from "@/components/ChatWidget";
import SocialPopup from "@/components/SocialPopup";
import IntroLoader from "@/components/IntroLoader";
import ScrollIndicator from "@/components/ScrollIndicator";
import Home from "@/pages/home";
import Contact from "@/pages/contact";
import Store from "@/pages/store";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/contact" component={Contact} />
      <Route path="/store" component={Store} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <IntroLoader />
      <ScrollIndicator />
      <Toaster />
      <Router />
      <ChatWidget />
      <SocialPopup />
    </QueryClientProvider>
  );
}

export default App;
