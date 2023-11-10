import "./App.scss";
import React, {
  Suspense,
  useEffect,
  useState,
} from "react";
import NavBar from "./components/Navbar";
import Footer from "./components/Footer";
import Spinner from "./components/Spinner";
import { createBrowserHistory } from "history";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { routes } from "./config/router/path";
import smoothscroll from "smoothscroll-polyfill";
import FloatButton from "./components/FloatButton";
import {
  sendWACS,
  smoothScrollTop,
} from "./utils/functions/global";
import { styleInitialState } from "./variables/styles/app";
import { Cache, ConfigProvider } from "react-avatar";

// FIXED Implement the IS_OTP_NOT_VERIFIED function to all authentication validation,
// TODO: Test auth/security leak
function App() {
  // STATE
  const [style, setStyle] = useState(styleInitialState);

  // VARIABLES
  let timer = null;
  const history = createBrowserHistory({
    forceRefresh: true,
  });
  const cache = new Cache({
    // Keep cached source failures for up to 7 days
    sourceTTL: 7 * 24 * 3600 * 1000,

    // Keep a maximum of 20 entries in the source cache
    sourceSize: 20,
  });

  // POLLYFILLS
  // kick off the polyfill!
  // smoothen scrolling on iphone
  smoothscroll.polyfill();

  // FUNCTIONS SPECIFIC //
  function sendWA() {
    sendWACS();
  }

  function handleStyleChange() {
    if (window.scrollY > 200)
      setStyle({
        floatButton: { transform: "scale(0)" },
        ScrollTopButton: { transform: "scale(1)" },
      });
  }

  useEffect(() => {
    const handleScroll = () => {
      // Clear the previous timer if it exists
      if (timer) clearTimeout(timer);
      if (window.scrollY <= 80)
        setStyle({
          floatButton: { transform: "scale(1)" },
          ScrollTopButton: { transform: "scale(0)" },
        });
      // Set a new timer to execute the scroll handling function after a delay
      timer = setTimeout(() => {
        // Your scroll handling logic here
        // Update your state or perform any necessary actions
        handleStyleChange();
      }, 150); // Adjust the delay as needed (300 milliseconds in this example)
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (timer) clearTimeout(timer);
    };
  }, []);

  return (
    <ConfigProvider cache={cache}>
      <Router
        history={history}
        basename="/">
        <NavBar />
        <Routes>
          {routes.map((item, index) => {
            return (
              <Route
                key={`route-${index}`}
                path={item.path}
                element={
                  <Suspense fallback={<p>Loading...</p>}>
                    {item.component}
                  </Suspense>
                }
                exact
              />
            );
          })}
        </Routes>
        <Footer />
        <FloatButton
          style={{
            transform: `${style.ScrollTopButton.transform}`,
          }}
          onClick={() => smoothScrollTop()}
          className="fixed-app-button main-bg-color">
          <span
            style={{ transform: "rotate(180deg)" }}
            className="hero-round-button-icon"
          />
        </FloatButton>
        {!window.location.pathname.includes(
          "creative-store"
        ) ? (
          <FloatButton
            style={{
              transform: `${style.floatButton.transform}`,
            }}
            onClick={() => sendWA()}
            className="fixed-app-button main-bg-color">
            <p className="light-color">Help</p>
          </FloatButton>
        ) : null}
        <Spinner />
      </Router>
    </ConfigProvider>
  );
}

export default App;
