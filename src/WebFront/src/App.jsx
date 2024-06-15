import AuthProvider from "./provider/authProvider";
import Routes from "./routes";

// CSS
import "./App.css";
import { PrimeReactProvider } from "primereact/api";

const App = () => {
  return (
    <PrimeReactProvider>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </PrimeReactProvider>
  );
};

export default App;
