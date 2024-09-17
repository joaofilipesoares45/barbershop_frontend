import React, { useState, createContext, useEffect } from "react";
import Agendamento from "../Classes/Agendamento";
import { connectionApi } from "../methods/connectionApi";
import dateValid from "../methods/filters";
import { getCalendar } from "../methods/functions";

export const DataContext = createContext();

export function DataProvider({ children, barbearia, setBarbearia }) {

    useEffect(() => {
        if (barbearia && window.location.pathname !== '/barbershop_frontend/barbearia' && window.location.pathname !== '/barbershop_frontend/barber-side') {
            window.location = `/barbershop_frontend/barbearia?id=${barbearia}`
        }
        if (window.location.pathname === '/barbershop_frontend/barbearia') {
            setBarbearia(Number(window.location.search.replace(`?id=`, ``)))
        }
    }, [barbearia])

    const [servicos, setServicos] = useState([]);
    const [agendamentos, setAgendamentos] = useState([]);
    const [fechado, setFechado] = useState([])
    const [servicosAgenda, setServicosAgenda] = useState([]);

    const currDate = new Date()
    const [calendarMonth, setCalendarMonth] = useState(currDate.getMonth())
    const [calendarYear, setCalendarYear] = useState(currDate.getFullYear())
    const [calendarDays, setCalendarDays] = useState([])
    const [calendarDate, setCalendarDate] = useState('')

    const [agendamento, setAgendamento] = useState(new Agendamento({}));

    useEffect(() => {
        const getServices = async () => {
            const DBservices = await connectionApi('get', 'service')
            setServicos(DBservices.filter(({ idEmpresa }) => idEmpresa === barbearia))
        }

        const getAgenda = async () => {
            const agendamentosDB = await connectionApi('get', `agenda`)
            setAgendamentos(agendamentosDB.filter(agendamento => agendamento.idEmpresa === barbearia))
        }

        const getCloseDays = async () => {
            const DBfolgas = await connectionApi('get', 'folgas')
            setFechado(DBfolgas.filter(folga => folga.idEmpresa === barbearia))
        }

        const getDays = async () => {
            setCalendarDays(await dateValid(getCalendar(calendarMonth, calendarYear), barbearia))
        }
        
        if (window.location.pathname === '/barbershop_frontend/barbearia') {
            getServices()
            getAgenda()
            getCloseDays()
            getDays()
        }else if (window.location.pathname === '/barbershop_frontend/barber-side') {
            setBarbearia(JSON.parse(localStorage.getItem("currentUser")).id)

            getServices()
            getAgenda()
            getCloseDays()
            getDays()
        }

    }, [barbearia, calendarMonth, calendarYear, fechado, agendamento])

    
    const value = {
        barbearia,
        setBarbearia,

        servicos,
        setServicos,
        servicosAgenda,
        setServicosAgenda,

        calendarDays,
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
        <DataContext.Provider value={value}>
            {children}
        </DataContext.Provider>
    )
}