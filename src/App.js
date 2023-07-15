import './App.scss';
import React,
{
  Suspense,
  useEffect,
  useState
} from 'react';
import NavBar from './components/Navbar';
import Footer from './components/Footer';
import { createBrowserHistory } from 'history';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import { routes } from './config/router/path'
import smoothscroll from 'smoothscroll-polyfill';
import FloatButton from './components/FloatButton';
import { sendWACS, smoothScrollTop } from './utils/functions/global';
import { styleInitialState } from './variables/styles/app';
import { Cache, ConfigProvider } from 'react-avatar';
import Spinner from './components/Spinner';

function App() {

  const [style, setStyle] = useState(styleInitialState);
  const [pathname, setPathName] = useState(window.location.pathname);

  const history = createBrowserHistory({ forceRefresh: true });
  const cache = new Cache({

    // Keep cached source failures for up to 7 days
    sourceTTL: 7 * 24 * 3600 * 1000,

    // Keep a maximum of 20 entries in the source cache
    sourceSize: 20
  });

  // kick off the polyfill!
  // smoothen scrolling on iphone
  smoothscroll.polyfill();

  // FUNCTIONS SPECIFIC //
  function sendWA() {
    sendWACS();
  }

  function handleStyleChange() {
    if (window.scrollY > 200) setStyle({ floatButton: { transform: "scale(0)" }, ScrollTopButton: { transform: "scale(1)" } });
    else setStyle({ floatButton: { transform: "scale(1)" }, ScrollTopButton: { transform: "scale(0)" } });
  }

  //COMPONENT FUNCTION
  function ShowNavbar() {
    if (pathname.includes("creative-store")) return null;
    return <NavBar />
  }

  function ShowFooter() {
    if (pathname.includes("creative-store")) return null;
    return <Footer />
  }

  function ShowMenu() {
    if (pathname.includes("creative-store")) return null;
    return <FloatButton style={{ transform: `${style.floatButton.transform}` }} onClick={() => sendWA()} className="fixed-app-button main-bg-color">
      <h3 className="light-color">
        Help
      </h3>
    </FloatButton>
  }

  useEffect(() => {
    window.addEventListener('scroll', handleStyleChange)
    return () => {
      window.removeEventListener('scroll', handleStyleChange)
    }
  }, []);

  return (
    <ConfigProvider cache={cache}>
      <Router history={history} basename="/">
        <ShowNavbar />
        <Routes>
          {routes.map((item, index) => {
            return <Route
              key={`route-${index}`}
              path={item.path}
              element={<Suspense fallback={<p>Loading...</p>}>{item.component}</Suspense>}
              exact
            />
          }
          )}
        </Routes>
        <ShowFooter />
        <FloatButton style={{ transform: `${style.ScrollTopButton.transform}` }} onClick={() => smoothScrollTop()} className="fixed-app-button main-bg-color">
          <h3 className="light-color">
            Menu
          </h3>
        </FloatButton>
        <ShowMenu />
        <Spinner />
      </Router>
    </ConfigProvider>
  );
}

export default App;
