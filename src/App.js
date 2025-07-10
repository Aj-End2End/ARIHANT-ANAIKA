import "./App.css";
import NavBar from "./component/NavBar";
import BodyContent from "./component/BodyContent";
import Footer from "./component/Footer";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Terms from "./component/Terms";
import Policy from "./component/Policy";
import ThankYouScreen from "./component/ThankYouScreen";
import Chatbot from "./component/Chatbot"

const App = () => {
  return (
    <Router>
      <MainApp />
    </Router>
  );
};

const MainApp = () => {
  const location = useLocation();

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<BodyContent />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="/thank-you" element={<ThankYouScreen />} />
      </Routes>
      <Chatbot />
      {location.pathname !== "/thank-you" && <Footer />}
    </>
  );
};
export default App;
