import { useContext } from "react"
import { BarberContext } from "../context/BarberProvider"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as solid from '@fortawesome/free-solid-svg-icons'
import * as regular from '@fortawesome/free-regular-svg-icons'

import '../css/menu.css'

import { logOut } from "../../../methods/login"

import NovoAgendamento from "./NovoAgendamento"
import { openModal } from "../../../methods/functions"


function Menu() {
    const { handleChangeComponent, setCalendarType } = useContext(BarberContext)
    return (
        <div className="menu">
            <nav>
                <button onClick={() => { openModal('.calendar-section'); setCalendarType('') }}>Calendario <FontAwesomeIcon icon={solid.faCalendar} /></button>
                <button onClick={() => handleChangeComponent(<NovoAgendamento />)}>Novo Agendamento <FontAwesomeIcon icon={regular.faCalendarPlus} /></button>
                <button>Configurações <FontAwesomeIcon icon={solid.faGear} /></button>
                <button onClick={logOut}>Desconectar <FontAwesomeIcon icon={solid.faPowerOff} /></button>
            </nav>
        </div>
    )
}

export default Menu