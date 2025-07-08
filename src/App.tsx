import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LoaderCircle } from "lucide-react";
import PrivateRoute from "./components/PrivateRoute";
const DogList = lazy(() => import("./pages/DogList"));
const Login = lazy(() => import("./pages/Login"));

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ToastContainer position="top-right" autoClose={3000} />
      <BrowserRouter>
        <Suspense
          fallback={
            <div className="flex justify-center items-center min-h-screen">
              <LoaderCircle color="black" size={100} className="animate-spin" />
            </div>
          }
        >
          <Routes>
            <Route
              path="/dogs"
              element={
                <PrivateRoute>
                  <DogList />
                </PrivateRoute>
              }
            />
            <Route path="/auth" element={<Login />} />
            <Route path="*" element={<Navigate to="/dogs" replace />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
