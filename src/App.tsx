
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Capabilities from "./pages/Capabilities";
import CustomizeMenu from "./pages/CustomizeMenu";
import { CapabilitiesProvider } from "./context/CapabilitiesContext";
import { MenuProvider } from "./context/MenuContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <CapabilitiesProvider>
      <MenuProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/capabilities" element={<Capabilities />} />
              <Route path="/customize-menu" element={<CustomizeMenu />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </MenuProvider>
    </CapabilitiesProvider>
  </QueryClientProvider>
);

export default App;
