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
            <section className="modal load" load=''> <FontAwesomeIcon icon={solid.faSpinner} /> <FontAwesomeIcon icon={solid.faArrowsRotate} onClick={() => window.location = ''} /> </section>
            <Routes>

                <Route exact path="/barbershop_frontend/" element={<Login />} />
                {/* <Route path="/barbershop_frontend/login" element={<Login />} /> */}
                <Route path="/barbershop_frontend/home" element={<PrivateRoute/>}>
                    <Route path="/barbershop_frontend/home"element={<Home />}/>
                </ Route>

                <Route path="/barbershop_frontend/barbearia" element={<PrivateRoute />}>
                    <Route path="/barbershop_frontend/barbearia"
                        element={
                            <Provider>
                                <Barbearia />
                            </Provider>}
                    />
                </Route>

                <Route path="/barbershop_frontend/barber-side" element={
                    <BarberProvider>
                        <BarberSide />
                    </BarberProvider>
                } />
            </Routes>
        </Router>
    )
}

export default AppRoutes