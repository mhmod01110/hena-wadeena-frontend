import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import LogisticsPage from "./pages/LogisticsPage";
import MarketplacePage from "./pages/MarketplacePage";
import InvestmentPage from "./pages/InvestmentPage";
import TourismPage from "./pages/TourismPage";
import NotFound from "./pages/NotFound";

// Logistics pages
import CreateTripPage from "./pages/logistics/CreateTripPage";
import BookTripPage from "./pages/logistics/BookTripPage";
import RouteDetailsPage from "./pages/logistics/RouteDetailsPage";

// Marketplace pages
import PricesPage from "./pages/marketplace/PricesPage";

// Investment pages
import OpportunityDetailsPage from "./pages/investment/OpportunityDetailsPage";
import ContactPage from "./pages/investment/ContactPage";

// Tourism pages
import GuideBookingPage from "./pages/tourism/GuideBookingPage";
import AccommodationDetailsPage from "./pages/tourism/AccommodationDetailsPage";
import AttractionsPage from "./pages/tourism/AttractionsPage";
import AccommodationInquiryPage from "./pages/tourism/AccommodationInquiryPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/logistics" element={<LogisticsPage />} />
          <Route path="/logistics/create-trip" element={<CreateTripPage />} />
          <Route path="/logistics/book/:id" element={<BookTripPage />} />
          <Route path="/logistics/route/:id" element={<RouteDetailsPage />} />
          {/* Alternate routes - redirects */}
          <Route path="/logistics/:id" element={<RouteDetailsPage />} />
          <Route path="/book-trip/:id" element={<BookTripPage />} />
          <Route path="/marketplace" element={<MarketplacePage />} />
          <Route path="/marketplace/prices" element={<PricesPage />} />
          <Route path="/investment" element={<InvestmentPage />} />
          <Route path="/investment/opportunity/:id" element={<OpportunityDetailsPage />} />
          <Route path="/investment/contact/:id" element={<ContactPage />} />
          <Route path="/tourism" element={<TourismPage />} />
          <Route path="/tourism/attractions" element={<AttractionsPage />} />
          <Route path="/tourism/guide-booking/:id" element={<GuideBookingPage />} />
          <Route path="/tourism/accommodation/:id" element={<AccommodationDetailsPage />} />
          <Route path="/tourism/accommodation-inquiry/:id" element={<AccommodationInquiryPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
