import { Toaster } from "react-hot-toast"
import AppRouter from "./routes/AppRouter"
import { useAuth, UserProvider } from "./contexts/authContext"
import { ResponseInterceptor } from "./interceptors/ResponseInterceptor"
import SplashScreen from "./features/auth/components/SplashScreen";


function AppContent() {
  const { isLoadingUser } = useAuth();

  if (isLoadingUser) {
    return <SplashScreen />;
  }

  return <AppRouter />;
}

export default function App() {
  return (
    <UserProvider>
      <ResponseInterceptor />
      <Toaster position="top-center" />
      <AppContent />
    </UserProvider>
  );
}
