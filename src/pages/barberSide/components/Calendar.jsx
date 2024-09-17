import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as solid from '@fortawesome/free-solid-svg-icons'

import { dateFormat, getCalendar, openModal, closeModal } from '../../../methods/functions'
import dateValid from '../../../methods/filters'
import { connectionApi } from '../../../methods/connectionApi'
import { setMsg } from '../../home/components/notif'

import { useContext, useEffect, useState } from 'react'
import { BarberContext } from '../context/BarberProvider'
import { DataContext } from '../../../context/DataProvider'


import "../css/calendar.css"

function Calendar({ type }) {

    const month_names = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"]

    const { barber, setDadosAgendamento } = useContext(BarberContext)
    const { setCalendarDate, calendarMonth, calendarYear, setCalendarMonth, setCalendarYear, agendamentos, services, fechado } = useContext(DataContext)

    const monthModal = (e) => {
        const target = e.target
        if (target.id === 'month-picker') {
            document.querySelector('.month-list').setAttribute('open', '')
        } else {
            document.querySelector('.month-list').removeAttribute('open')
            setCalendarMonth(Number(target.id))
        }
        document.querySelectorAll('.calendar-days div[active]').forEach(div => {
            div.removeAttribute('selected')
        })
    }

    const [day, setDay] = useState()
    const handleSelectDay = ({ target }) => {
        document.querySelectorAll('.calendar-section .calendar-body .calendar-days div[selected]').forEach(div => div.removeAttribute('selected'))

        const obj = {}
        const data = target.getAttribute('id');
        obj.data = data
        obj.agendamentos = agendamentos.filter(agend => agend.data === data)
        obj.folga = fechado.filter(({ data }) => data.includes(obj.data))

        if (type !== undefined) {
            setDay(obj)
        } else {
            setCalendarDate(target.id)
            document.querySelector(".calendar-section").removeAttribute('open');
        }

        if (target.hasAttribute('color') || target.hasAttribute('pass')) {

        } else {
            !target.hasAttribute('selected') ? target.setAttribute('selected', '') : target.removeAttribute('selected')
        }
    }

    const handleCloseBarber = () => {
        const days = []
        document.querySelectorAll('.calendar-section .calendar-body .calendar-days div[selected]').forEach(div => days.push(div.id))

        if (days.length > 0) {
            document.querySelectorAll('.calendar-section .calendar-body .calendar-days div[selected]').forEach(div => div.removeAttribute("selected"))

            const folga = {}
            folga.idEmpresa = barber.id
            folga.data = JSON.stringify(days)
            connectionApi('post', 'folgas', folga).then((res) => res.json()).then((data) => setMsg(data))
        }
    }

    const handleOpenBarber = (id) => {
        const folga = fechado.filter(folga => folga.id === id)[0]
        connectionApi('delete', 'folgas', folga)
    }

    const [days, setDays] = useState([])
    useEffect(() => {
        const getDays = async () => {
            setDays(await dateValid(getCalendar(calendarMonth, calendarYear), barber.id, type))
        }
        getDays()
    })

    return (
        <section className='modal calendar-section' barber={day}>
            <div className='rr0089'>
                <div className="calendar-div" load=''>
                    <span className='note'></span>
                    <div className="calendar-header">
                        <span id="month-picker" onClick={monthModal}>{month_names[calendarMonth]}</span>
                        <div className="year-picker">
                            <FontAwesomeIcon icon={solid.faChevronLeft} onClick={() => { setCalendarYear(calendarYear - 1) }} />
                            <span id="year">{calendarYear}</span>
                            <FontAwesomeIcon icon={solid.faChevronRight} onClick={() => { setCalendarYear(calendarYear + 1) }} />
                        </div>
                    </div>

                    <div className="calendar-body">
                        <div className="calendar-week">
                            {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'].map((day) => { return <div key={day}>{day}</div> })}
                        </div>
                        <div className="calendar-days">
                            {
                                days.map((day, index) => {
                                    return <div
                                        key={`${day.attr}${index}`}
                                        color={day.color}
                                        className={day.class}
                                        id={day.attr}
                                        active={day.active}
                                        pass={day.pass}

                                        onClick={handleSelectDay}>
                                        {day.txt}
                                    </div>
                                })
                            }
                        </div>

                        <nav>
                            <button onClick={() => { document.querySelector(".calendar-section").removeAttribute('open'); setDay() }}>Cancelar</button>
                        </nav>
                    </div>
                    <div className="month-list">
                        {month_names.map((month, index) => <div id={index} key={month} onClick={monthModal}>{month}</div>)}
                    </div>
                </div>
            </div>


            {day && <div className='info-day'>
                <h3>{dateFormat(day.data)}</h3>
                <div className="content">
                    {day.agendamentos.length > 0 ?
                        <div className='agendamento-div'>
                            <h4>Agendamentos</h4>
                            {day.agendamentos.map((agendamento, index) => {
                                return (
                                    <div className='agend' key={`${agendamento.data}${index}`} >
                                        <span><h5>{agendamento.nomeCliente}</h5><p>{agendamento.hora}</p></span>

                                        {JSON.parse(agendamento.servicos).length > 0 && <h5>Serviços</h5>}
                                        <div>

                                            {JSON.parse(agendamento.servicos).map(id => {
                                                const list = services.filter(service => service.id === id)
                                                return list.map(res => <p>{res.nome}</p>)
                                            })}

                                        </div>
                                        <button onClick={() => { closeModal(); setDadosAgendamento(agendamento); openModal('.barber-side-agendamento') }}>Ver</button>
                                    </div>
                                )
                            })}
                        </div> :
                        <h4>Nenhum agendamento</h4>

                    }
                    {day.folga.length !== 0 && <h4>Barberia Fechada</h4>}
                </div>

                {day.folga.length === 0 ?
                    day.agendamentos.length === 0 && <button className='confirm-btn' onClick={handleCloseBarber}>Fechar Barbearia</button> :
                    <button className='confirm-btn' onClick={() => handleOpenBarber(day.folga[0].id)}>Abrir Barbearia</button>}
            </div>}
        </section>
    )
}
export default Calendar