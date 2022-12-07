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
import { sendWACS } from './utils/functions/global';
import { styleInitialState } from './variables/styles/app';

function App() {

  const [loginInfo, setLoginInfo] = useState(null);
  const [style, setStyle] = useState(styleInitialState);

  // kick off the polyfill!
  // smoothen scrolling on iphone
  smoothscroll.polyfill();
  const history = createBrowserHistory({ forceRefresh: true });

  // FUNCTIONS SPECIFIC //
  function sendWA() {
    sendWACS();
  }

  function handleStyleChange() {
    if (window.scrollY > 200) setStyle({ floatButton: { transform: "scale(0)" } });
    else setStyle({ floatButton: { transform: "scale(1)" } });
  }

  useEffect(() => {
    window.addEventListener('scroll', handleStyleChange)
    return () => {
      window.removeEventListener('scroll', handleStyleChange)
    }
  }, []);

  return (
    <Router history={history} basename="/">
      <NavBar loginInfo={loginInfo} setLoginInfo={setLoginInfo} />
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
      <Footer />
      <FloatButton style={{ transform: `${style.floatButton.transform}` }} onClick={() => sendWA()} className="fixed-app-button main-bg-color">
        <h3 className="light-color">
          Chat
        </h3>
      </FloatButton>
    </Router>
  );
}

export default App;
