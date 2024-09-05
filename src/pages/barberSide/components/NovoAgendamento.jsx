import { useContext } from "react"
import BarberContext from "../context/BarberContext"

import '../css/novoagendamento.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as solid from '@fortawesome/free-solid-svg-icons'
import Menu from "./Menu"

import { closeModal, openModal } from "../../../methods/functions"
import { connectionApi } from "../../../methods/connectionApi"
import { setMsg } from "../../home/components/notif"

const horarioFunc = ["08:00", "09:00", "10:00", "11:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00"]
function NovoAgendamento({ }) {
    const { barber, handleChangeComponent, calendarDate, agendamento, agendamentos, setCalendarType, setAgendamento } = useContext(BarberContext)

    const handleSetHour = (e) => {
        let selectedHour
        if (e.target.hasAttribute('selected')) {
            e.target.removeAttribute('selected');
            selectedHour = undefined;
        } else {
            selectedHour = e.target.getAttribute('value');
            e.target.parentElement.querySelectorAll(`span`).forEach(span => span.removeAttribute('selected'));
            e.target.setAttribute('selected', '');
        }
        agendamento.hora = selectedHour;
    }

    const handleConfirmAgend = (event) => {
        event.preventDefault();
        
        if (agendamento.id === undefined) {
            console.log(agendamento);
            
            if (agendamento.nomeCliente !== undefined && calendarDate !== '' && agendamento.hora !== undefined) {
                agendamento.idEmpresa = barber.id
                agendamento.data = calendarDate
                agendamento.servicos = '[]'
                closeModal()
                connectionApi('post', 'agenda', agendamento).then((res) => res.json()).then((data) => setMsg(data))
                setAgendamento({})
            }
        }else { 
            closeModal()
            connectionApi('put', 'agenda', agendamento).then((res) => res.json()).then((data) => setMsg(data))
            setAgendamento({})
        }
    }


    return (
        <div className="novo-agendamento">
            <h2 onClick={() => {handleChangeComponent(<Menu />); setAgendamento({})}}>Novo Agendamento <FontAwesomeIcon icon={solid.faChevronLeft} /></h2>

            <div className="form-agendamento" open>
                <form>
                    <div className='inputs'>
                        <div>
                            <label htmlFor="agend-client-name">cliente</label>
                            <input type="text" id="agend-client-name" value={'' || agendamento.nomeCliente} onKeyUp={({ target }) => { agendamento.nomeCliente = target.value }} onChange={({ target }) => { agendamento.nomeCliente = target.value }} />
                        </div>
                        <div>
                            <label htmlFor="agend-date-input">data</label>
                            <input type="date" list='date-list' id='agend-date-input' value={agendamento.data || calendarDate} onClick={(e) => { e.preventDefault(); openModal('.calendar-section'); setCalendarType() }} onChange={({ target }) => { console.log(target); }} />
                        </div>
                        {calendarDate.length !== 0 &&
                            <div>
                                <label htmlFor="agend-hour-input">horario<FontAwesomeIcon icon={solid.faClock} /></label>
                                <nav>
                                    {
                                        horarioFunc.map((hour, index) => {
                                            let state
                                            agendamentos.forEach(agend => {
                                                if (agend.data === calendarDate && agend.hora === hour && agend.id !== agendamento.id) {
                                                    state = 'reserved'
                                                }
                                            })
                                            if (agendamento.hora === hour) {
                                                state = 'selected'
                                            }

                                            const now = new Date()
                                            if (now.toLocaleDateString().split('/').reverse().join('-') === calendarDate && now.getHours() + 1 > Number(hour.split(':')[0])) {
                                                state = 'pass'
                                            }
                                            if (index + 1 === horarioFunc.length && state === 'pass') {
                                                state = 'final'
                                            }
                                            if (state !== 'final') {
                                                return <span value={hour} key={hour} onClick={(e) => state !== 'reserved' ? handleSetHour(e) : ''} state={state}>{hour}</span>
                                            } else {
                                                return <div state={state}>Nenhum horario disponível!</div>
                                            }
                                        })
                                    }
                                </nav>
                            </div>
                        }
                    </div>

                    {agendamento.hora !== undefined &&
                        <button className='finish--' onClick={handleConfirmAgend}><span>Confirmar</span> <FontAwesomeIcon icon={solid.faCheck} /> </button>}
                </form>
            </div>

        </div>
    )
}

export default NovoAgendamento