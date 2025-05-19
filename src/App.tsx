
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { AuthProvider } from "./contexts/AuthContext";
import LoginPage from "./pages/LoginPage";
import UserDashboard from "./pages/UserDashboard";
import UnauthorizedPage from "./pages/UnauthorizedPage";
import PrivateRoute from "./components/PrivateRoute";
import PdfQueryPage from "./pages/PdfQueryPage";
import UserAnalyticsPage from "./pages/UserAnalyticsPage";
import UserSettingsPage from "./pages/UserSettingsPage";
import GenerateReportPage from "./pages/GenerateReportPage";
import { ThemeProvider } from "@/components/ThemeProvider";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light" storageKey="rag-spring-theme">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/unauthorized" element={<UnauthorizedPage />} />
              
              <Route 
                path="/user/dashboard" 
                element={
                  <PrivateRoute>
                    <UserDashboard />
                  </PrivateRoute>
                } 
              />

              <Route 
                path="/user/pdf-query" 
                element={
                  <PrivateRoute>
                    <PdfQueryPage />
                  </PrivateRoute>
                } 
              />

              <Route 
                path="/user/analytics" 
                element={
                  <PrivateRoute>
                    <UserAnalyticsPage />
                  </PrivateRoute>
                } 
              />

              <Route 
                path="/user/settings" 
                element={
                  <PrivateRoute>
                    <UserSettingsPage />
                  </PrivateRoute>
                } 
              />

              <Route 
                path="/user/reports" 
                element={
                  <PrivateRoute>
                    <GenerateReportPage />
                  </PrivateRoute>
                } 
              />

              <Route path="*" element={<NotFound />} />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
