import { Toaster } from "react-hot-toast"
import AppRouter from "./routes/AppRouter"
import { UserProvider } from "./contexts/authContext"
import { ResponseInterceptor } from "./interceptors/ResponseInterceptor"

function App() {

  return <>
    <UserProvider>
      <ResponseInterceptor />
      <Toaster position="top-center" />
      <AppRouter />
    </UserProvider>

  </>
}

export default App
