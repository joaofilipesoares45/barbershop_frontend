import React from 'react'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '../css/calendar.css'
import { useContext } from 'react'
import { DataContext } from '../../../context/DataProvider'

function Calendar() {
    const month_names = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"]
    const { calendarMonth, setCalendarMonth, calendarYear, setCalendarYear, setCalendarDate, calendarDays, agendamento } = useContext(DataContext)

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

    const selectDay = (e) => {
        const target = e.target

        if (!target.hasAttribute('color') && !target.hasAttribute('pass')) {
            document.querySelector(".calendar-section").removeAttribute('open')
            setCalendarDate(target.getAttribute('id'))
            agendamento.data = target.getAttribute('id')
            agendamento.hora = undefined
            document.querySelectorAll('.calendar-days div[active]').forEach(div => {
                div.removeAttribute('selected')
            });
            target.setAttribute('selected', '')
        }
    }

    return (
        <section className='modal calendar-section'>
            <div className="calendar-div" load=''>
                <div className="calendar-header">
                    <span id="month-picker" onClick={monthModal}>{month_names[calendarMonth]}</span>
                    <div className="year-picker">
                        <FontAwesomeIcon icon={faChevronLeft} onClick={() => { setCalendarYear(calendarYear - 1) }} />
                        <span id="year">{calendarYear}</span>
                        <FontAwesomeIcon icon={faChevronRight} onClick={() => { setCalendarYear(calendarYear + 1) }} />
                    </div>
                </div>

                <div className="calendar-body">
                    <div className="calendar-week">
                        {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'].map((day) => { return <div key={day}>{day}</div> })}
                    </div>
                    <div className="calendar-days">
                        {
                            calendarDays.map((day, index) => {
                                return (
                                    <div
                                        key={index}
                                        color={day.color}
                                        className={day.class}
                                        id={day.attr}
                                        active={day.active}
                                        pass={day.pass}

                                        onClick={selectDay}>
                                        {day.txt}
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <div className="month-list">
                    {month_names.map((month, index) => <div id={index} key={month} onClick={monthModal}>{month}</div>)}
                </div>
            </div>
        </section>
    )
}

export default Calendar