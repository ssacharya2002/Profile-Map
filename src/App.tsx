import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
// import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <AppRoutes />
        </main>
        {/* <Footer /> */}
      </div>
    </BrowserRouter>
  );
};

export default App;
