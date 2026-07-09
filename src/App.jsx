import { BundleProvider } from "./context/BundleContext";
import Home from "./pages/Home";

function App() {
  return (
    <BundleProvider>
      <Home />
    </BundleProvider>
  );
}

export default App;
