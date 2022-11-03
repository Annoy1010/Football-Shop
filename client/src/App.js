import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React, { useState } from 'react';

import { publicRoutes } from './routes';
import Header from './layouts/Header';
import Footer from './layouts/Footer';
import SignIn from './layouts/SignIn';

function App() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState({});

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
                                    {Layout === SignIn ? (
                                        <SignIn
                                            username={username}
                                            password={password}
                                            user={user}
                                            setUsername={setUsername}
                                            setPassword={setPassword}
                                            setUser={setUser}
                                        />
                                    ) : (
                                        <Layout />
                                    )}

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
