import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { PrivateRoute } from "./privateRoute";
import { NotifModal } from "./pages/home/components/notif";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as solid from "@fortawesome/free-solid-svg-icons";

import Home from "./pages/home";
import Login from "./pages/login";
import Barbearia from "./pages/barbearia";
import Provider from "./context/Provider";
import BarberSide from "./pages/barberSide";
import BarberProvider from "./pages/barberSide/context/BarberProvider";

const AppRoutes = () => {
    return (
        <Router>
            <NotifModal></NotifModal>
            <section className="modal load" load=''> <FontAwesomeIcon icon={solid.faSpinner} /> Aguarde...</section>
            <Routes>

                <Route exact path="/barbershop_frontend/" element={<Login />} />
                <Route path="/barbershop_frontend/login" element={<Login />} />
                <Route path="/barbershop_frontend/home" element={<PrivateRoute><Home /></PrivateRoute>} />
                <Route path="/barbershop_frontend/barbearia"
                    element={
                        <PrivateRoute>
                            <Provider>
                                <Barbearia />
                            </Provider>
                        </PrivateRoute>}
                />

                <Route path="/barbershop_frontend/barberSide" element={
                    <BarberProvider>
                        <BarberSide />
                    </BarberProvider>
                } />
            </Routes>
        </Router>
    )
}

export default AppRoutes