import React, { useState } from "react";
import AppContext from "./AppContext";
import Agendamento from "../Classes/Agendamento";


function Provider({ children }) {
    const [servicos, setServicos] = useState([]);
    const [servicosAgenda, setServicosAgenda] = useState([]);

    const currDate = new Date()
    const [calendarMonth, setCalendarMonth] = useState(currDate.getMonth())
    const [calendarYear, setCalendarYear] = useState(currDate.getFullYear())
    const [calendarDate, setCalendarDate] = useState('')

    const [agendamento, setAgendamento] = useState(new Agendamento({}));

    const [agendamentos, setAgendamentos] = useState([])    

    const [fechado, setFechado] = useState([])

    const value = {
        servicos,
        setServicos,
        servicosAgenda,
        setServicosAgenda,

        calendarMonth,
        setCalendarMonth,
        calendarYear,
        setCalendarYear,
        calendarDate,
        setCalendarDate,

        agendamento,
        setAgendamento,

        agendamentos,
        setAgendamentos,

        fechado, 
        setFechado,
    }

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}

export default Provider