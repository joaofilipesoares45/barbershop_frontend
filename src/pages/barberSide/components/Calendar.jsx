import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as solid from '@fortawesome/free-solid-svg-icons'
import { getCalendar } from '../../../methods/functions'
import dateValid from '../../../methods/filters'
import { connectionApi } from '../../../methods/connectionApi'
import { useContext, useEffect, useState } from 'react'
import BarberContext from '../context/BarberContext'
import { setMsg } from '../../home/components/notif'

function Calendar({ type }) {

    const month_names = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"]

    const { barber, setCalendarDate, calendarMonth, calendarYear, setCalendarMonth, setCalendarYear } = useContext(BarberContext)

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

    const handleConfirm = () => {
        const days = []
        document.querySelectorAll('.calendar-section .calendar-body .calendar-days div[selected]').forEach(div => days.push(div.id))

        if (days.length > 0) {
            document.querySelector(".calendar-section").removeAttribute('open');
            document.querySelectorAll('.calendar-section .calendar-body .calendar-days div[selected]').forEach(div => div.removeAttribute("selected"))
            setCalendarDate(days[days.length - 1])

            if (type !== undefined) {
                const folga = {}
                folga.idEmpresa = barber.id
                folga.data = JSON.stringify(days)
                connectionApi('post', 'folgas', folga).then((res) => res.json()).then((data) => setMsg(data))
            }
        }
    }

    const handleSelectDay = ({ target }) => {


        if (target.hasAttribute('color') || target.hasAttribute('pass')) {
            const note = document.querySelector('.calendar-section span.note')
            note.setAttribute('open', '')
            if (target.hasAttribute('pass')) {
                note.textContent = 'Essa data já passou!'
            } else if (target.hasAttribute('color')) {
                console.log(target.getAttribute('color'));
                
                target.getAttribute('color') === 'white' ? note.textContent = 'Barbearia Fechada!' : note.textContent = 'Agendado'
                
            }
            setTimeout(() => note.removeAttribute('open'), 5000)
        }else {
            !target.hasAttribute('selected') ? target.setAttribute('selected', '') : target.removeAttribute('selected')
        }

        
    }

    const [days, setDays] = useState([])
    useEffect(() => {
        const getDays = async () => {
            setDays(await dateValid(getCalendar(calendarMonth, calendarYear), barber.id, type))
        }
        getDays()
    })

    return (
        <section className='modal calendar-section'>
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
                        <button onClick={() => document.querySelector(".calendar-section").removeAttribute('open')}>Cancelar</button>
                        <button onClick={handleConfirm}>Finalizar</button>
                    </nav>
                </div>
                <div className="month-list">
                    {month_names.map((month, index) => <div id={index} key={month} onClick={monthModal}>{month}</div>)}
                </div>
            </div>

        </section>
    )
}
export default Calendar