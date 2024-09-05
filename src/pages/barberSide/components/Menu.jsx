import { useContext } from "react"
import BarberContext from "../context/BarberContext"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as solid from '@fortawesome/free-solid-svg-icons'
import '../css/menu.css'

import { logOut } from "../../../methods/login"

import NovoAgendamento from "./NovoAgendamento"
import { openModal } from "../../../methods/functions"

function Menu() {
    const { handleChangeComponent, setCalendarType } = useContext(BarberContext)
    return (
        <div className="menu">
            <nav>
                <button onClick={() => {openModal('.calendar-section'); setCalendarType('')}}>Funcionamento <FontAwesomeIcon icon={solid.faCalendar} /></button>
                <button onClick={() => handleChangeComponent(<NovoAgendamento/>)}>Novo Agendamento <FontAwesomeIcon icon={solid.faPlus} /></button>
                <button>Configurações <FontAwesomeIcon icon={solid.faGear} /></button>
                <button onClick={logOut}>Desconectar <FontAwesomeIcon icon={solid.faPowerOff} /></button>
            </nav>
        </div>
    )
}

export default Menu