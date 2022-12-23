import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';

import { publicRoutes } from './routes';
import Header from './layouts/Header';
import Footer from './layouts/Footer';

localStorage.getItem('user') === null && localStorage.setItem('user', JSON.stringify({}));
function App() {
    return (
        <Router>
            <Routes>
                {publicRoutes.map((route, index) => {
                    const Layout = route.component;

                    return (
                        <Route
                            key={index}
                            path={route.path}
                            element={
                                <React.Fragment>
                                    <Header />
                                    <Layout />
                                    <Footer />
                                </React.Fragment>
                            }
                        />
                    );
                })}
            </Routes>
        </Router>
    );
}

export default App;
