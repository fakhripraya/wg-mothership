import './App.scss';
import React, { Suspense } from 'react';
import NavBar from './components/Navbar';
import Footer from './components/Footer';
import { createBrowserHistory } from 'history';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { routes } from './config/router/path'
import smoothscroll from 'smoothscroll-polyfill';

function App() {

  // kick off the polyfill!
  // smoothen scrolling on iphone
  smoothscroll.polyfill();
  const history = createBrowserHistory({ forceRefresh: true });

  return (
    <Router history={history} basename="/">
      <NavBar history={history} />
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
    </Router>
  );
}

export default App;
