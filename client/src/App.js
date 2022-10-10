import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes } from './routes';
import Header from './layouts/Header';
import Footer from './layouts/Footer';

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
                                <div>
                                    <Header />
                                    <Layout />
                                    <Footer />
                                </div>
                            }
                        />
                    );
                })}
            </Routes>
        </Router>
    );
}

export default App;
