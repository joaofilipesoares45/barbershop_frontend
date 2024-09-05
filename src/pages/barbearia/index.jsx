import { useContext, useEffect, useState } from "react"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as solid from "@fortawesome/free-solid-svg-icons";
import * as regular from "@fortawesome/free-regular-svg-icons";
import * as brands from "@fortawesome/free-brands-svg-icons";

import './css/style.css';

import { connectionApi } from "../../methods/connectionApi";

import BarberSidebar from "./components/BarberSidebar";
import ServiceList from "./components/serviceList";
import Agendamento from "./components/Agendamento";
import AppContext from "../../context/AppContext";
import Calendar from "./components/Calendar";
import { closeModal, openModal } from "../../methods/functions";
import ImgZoom from "./components/ImgZoom";
import { Navigate } from "react-router-dom";

// 'https://firebasestorage.googleapis.com/v0/b/barbershop-front.appspot.com/o/barber-logos%2FbarbeariaReal.jpeg?alt=media&token=ba492b24-5cee-44dd-aa70-b32ae8b74aa5'

function Barbearia() {
    const { servicosAgenda, setAgendamentos } = useContext(AppContext)
    const [barber, setBarber] = useState({})
    useEffect(() => {
        const getBarber = async () => {
            const userBarber = await connectionApi('get', `user`, Number(window.location.search.replace(`?id=`, ``)))
            const companyBarber = await connectionApi('get', `company`, Number(window.location.search.replace(`?id=`, ``)))        
            setBarber(Object.assign(userBarber[0], companyBarber[0]))
        }
        getBarber()
    })

    useEffect(() => {
        const getAgenda = async () => {
            const agendamentosDB = await connectionApi('get', `agenda`)
            setAgendamentos(agendamentosDB.filter(agendamento => agendamento.idEmpresa === Number(window.location.search.replace(`?id=`, ``))))
        }
        getAgenda()
    }, [setAgendamentos]);

    const user = JSON.parse(localStorage.currentUser)

    if (user.tipo === 'empresa') {
        return <Navigate to="/barbershop_frontend/barberSide"/>
    }

    const handleOpenLink = (event) => {
        const link = event.target.getAttribute('link')
        window.open(link)
    }
    return (
        <main className="page Barbearia">
            <ImgZoom />
            <Agendamento />
            <Calendar />
            <BarberSidebar />
            <header>
                <h1>
                    {barber.nome}
                </h1>
                <nav>
                    <span onClick={() => { openModal('.modal-agendamento') }}>
                        {servicosAgenda.length > 0 && <p>{servicosAgenda.length}</p>}
                        <FontAwesomeIcon icon={regular.faCalendar} />
                    </span>
                    <span onClick={() => document.querySelector('.sidebar-barbearia').hasAttribute('open') ? closeModal() : openModal('.sidebar-barbearia')}>
                        <FontAwesomeIcon icon={solid.faBars} />
                    </span>

                </nav>
            </header>

            <div className="barber-div">
                <h2 className="welcome">Bem Vindo <br /><span>{user.nome}</span></h2>
                <section className="section-agendamento-btn">
                    <div className="btn-agendamento--">
                        <div className="barber-description">
                            <h3>Faça já seu Agendamento!!</h3>
                            <h4>{barber.nome}</h4>
                            <h5>links & contato: </h5>
                            <nav>
                                <span onClick={handleOpenLink} link={`https://api.whatsapp.com/send/?phone=${barber.telefone1}`}>WhatsApp <FontAwesomeIcon icon={brands.faWhatsapp} /></span>
                                <span onClick={handleOpenLink} link={barber.instagram}>Instagram <FontAwesomeIcon icon={brands.faInstagram} /></span>
                                <span onClick={handleOpenLink} link={barber.maps}>Ver no mapa <FontAwesomeIcon icon={solid.faLocationDot} /></span>
                            </nav>
                        </div>
                        <button onClick={() => { openModal('.modal-agendamento') }}>Ir para o Agendamento <FontAwesomeIcon icon={solid.faArrowRight} /></button>
                    </div>
                    <div className="barber-logo">
                        <img src={barber.foto} alt="logo barbearia" />
                    </div>
                </section>
                <ServiceList />
            </div>
        </main>
    )
}

export default Barbearia
