import React, { useState, createContext } from "react";
import { openModal } from "../../../methods/functions";
import Agendamento from "../../../Classes/Agendamento";

export const BarberContext = createContext();

export function BarberProvider({ children }) {

    const [barber, setBarber] = useState({})

    const [component, setComponent] = useState()

    const handleChangeComponent = (component) => {
        setComponent(component)
        openModal('.BarberSide .sidebar')
    }

    // const currDate = new Date()
    // const [calendarDate, setCalendarDate] = useState('')
    // const [calendarYear, setCalendarYear] = useState(currDate.getFullYear())
    // const [calendarMonth, setCalendarMonth] = useState(currDate.getMonth())
    const [calendarType, setCalendarType] = useState()

    // const [agendamentos, setAgendamentos] = useState([])
    const [dadosAgendamento, setDadosAgendamento] = useState({})

    const [agendamento, setAgendamento] = useState(new Agendamento({}))
    // const [folgas, setFolgas] = useState([])
    // const [services, setServices] = useState([])

    const value = {
        barber,
        setBarber,

        agendamento,
        setAgendamento,

        dadosAgendamento, 
        setDadosAgendamento,

        component,
        setComponent,
        handleChangeComponent,

        calendarType,
        setCalendarType,

    }

    return (
        <BarberContext.Provider value={value}>
            {children}
        </BarberContext.Provider>
    )
}