import React, { useState } from "react";
import BarberContext from "./BarberContext";
import { openModal } from "../../../methods/functions";
import Agendamento from "../../../Classes/Agendamento";

function BarberProvider({ children }) {

    const [barber, setBarber] = useState({})

    const [component, setComponent] = useState()

    const handleChangeComponent = (component) => {
        setComponent(component)
        openModal('.BarberSide .sidebar')
    }

    const currDate = new Date()
    const [calendarDate, setCalendarDate] = useState('')
    const [calendarYear, setCalendarYear] = useState(currDate.getFullYear())
    const [calendarMonth, setCalendarMonth] = useState(currDate.getMonth())
    const [calendarType, setCalendarType] = useState()

    const [agendamentos, setAgendamentos] = useState([])

    const [agendamento, setAgendamento] = useState(new Agendamento({}))
    const [folgas, setFolgas] = useState([])

    const value = {
        barber,
        setBarber,

        agendamento,
        setAgendamento,

        agendamentos,
        setAgendamentos,

        folgas,
        setFolgas,

        component,
        setComponent,
        handleChangeComponent,

        calendarDate,
        setCalendarDate,
        calendarMonth,
        setCalendarMonth,
        calendarYear,
        setCalendarYear,
        calendarType,
        setCalendarType,

    }

    return (
        <BarberContext.Provider value={value}>
            {children}
        </BarberContext.Provider>
    )
}

export default BarberProvider