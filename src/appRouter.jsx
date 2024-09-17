import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { PrivateRoute } from "./privateRoute";
import { NotifModal } from "./pages/home/components/notif";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as solid from "@fortawesome/free-solid-svg-icons";

import Home from "./pages/home";
import Login from "./pages/login";
import Barbearia from "./pages/barbearia";
import { DataProvider } from "./context/DataProvider";
import BarberSide from "./pages/barberSide";
import { BarberProvider } from "./pages/barberSide/context/BarberProvider";

import { useState } from "react";

const AppRoutes = () => {

    const [barbearia, setBarbearia] = useState()

    return (
        <DataProvider barbearia={barbearia} setBarbearia={setBarbearia}>
            <Router>
                <NotifModal></NotifModal>
                <section className="modal load" load=''> <FontAwesomeIcon icon={solid.faSpinner} /> <FontAwesomeIcon icon={solid.faArrowsRotate} onClick={() => window.location = ''} /> </section>
                <Routes>

                    <Route exact path="/barbershop_frontend/" element={<Login />} />
                    {/* <Route path="/barbershop_frontend/login" element={<Login />} /> */}

                    <Route element={<PrivateRoute />}>
                        <Route path="/barbershop_frontend/home" element={<Home />} />
                        <Route path="/barbershop_frontend/barbearia" element={<Barbearia barbearia={barbearia} />} />
                    </Route>

                    <Route path="/barbershop_frontend/barber-side" element={
                        <BarberProvider>
                            <BarberSide />
                        </BarberProvider>
                    } />

                </Routes>
            </Router>
        </DataProvider>

    )
}

export default AppRoutes