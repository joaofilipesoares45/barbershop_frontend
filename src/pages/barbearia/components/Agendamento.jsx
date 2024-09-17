import '../css/Agendamento.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as solid from "@fortawesome/free-solid-svg-icons";
import { closeModal, numberForBrl, openModal } from '../../../methods/functions';
import { useContext, useEffect } from 'react';
import AppContext from '../../../context/AppContext';
import { connectionApi } from '../../../methods/connectionApi';
import { setMsg } from '../../home/components/notif';


const horarioFunc = ["08:00", "09:00", "10:00", "11:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00"]
function Agendamento() {
    const { servicosAgenda, setServicosAgenda, calendarDate, agendamento, agendamentos } = useContext(AppContext)

    const client = JSON.parse(localStorage.currentUser)

    const handleRemoveService = (index, event) => {
        event.target.parentElement.setAttribute('remove', '')
        servicosAgenda.splice(index, 1)
        setTimeout(() => { }, 200)
    }

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

    useEffect(() => {
        if (localStorage.getItem('servicosAgendamento') !== null) {
            const sl = JSON.parse(localStorage.servicosAgendamento);
            setServicosAgenda(sl);
            localStorage.removeItem('servicosAgendamento');
        }
        if (localStorage.getItem('newAgend') !== null) {
            setMsg({ title: 'Agendamento bem sucedido', type: 'green' })
            localStorage.removeItem('newAgend');
        }
    }, [setServicosAgenda])

    window.onbeforeunload = () => {
        localStorage.barberHistory = JSON.stringify(window.location.href.split('barbershop_frontend')[1])
        if (servicosAgenda.length > 0) {
            localStorage.servicosAgendamento = JSON.stringify(servicosAgenda);
        }
    }

    const handleResume = (event) => {
        event.preventDefault();
        const resume = document.querySelector('.modal-agendamento .resumo-agendamento');
        const form = document.querySelector('.modal-agendamento .form-agendamento');
        if (resume.hasAttribute('open')) {
            resume.removeAttribute('open');
            form.setAttribute('open', '');
        } else {
            agendamento.nomeCliente = client.nome;
            agendamento.idEmpresa = parseInt(window.location.search.replace(`?id=`, ``));
            agendamento.servicos = JSON.stringify(servicosAgenda.map(serv => { return serv.id }));
            agendamento.valor = agendamento.total(servicosAgenda);
            resume.setAttribute('open', '');
            form.removeAttribute('open');
        }
    }
    
    const handleConfirmAgend = (event) => {
        const btn = event.target
        btn.setAttribute('load', '')
        btn.querySelector('span').textContent = 'Aguarde um instante...'

        console.log(agendamento);
        localStorage.newAgend = JSON.stringify(agendamento)
        connectionApi('post', 'agenda', agendamento);
        setServicosAgenda([])
        
        setTimeout(() => {
            window.location = window.location.href
        }, 500)
    }
    return (
        <div className="modal modal-agendamento">
            <div className="form-agendamento" open>
                <FontAwesomeIcon icon={solid.faXmark} onClick={() => closeModal()} />
                <h3>Faça seu Agendamento!</h3>

                <div className='agend-services'>
                    <h4>Serviços:</h4>
                    <div className='itens'>
                        {servicosAgenda.length > 0 ?
                            servicosAgenda.map(({ nome, id, valor }, index) => {
                                return (
                                    <div className="item-agendamento" key={index} id={id}>
                                        <div>
                                            <p>{nome}</p>
                                            <p>{numberForBrl(valor)}</p>
                                        </div>
                                        <FontAwesomeIcon icon={solid.faTrash} onClick={(e) => { handleRemoveService(index, e) }} />
                                    </div>
                                )
                            }) :
                            <div className="item-agendamento" center=""><p>Nenhum serviço adicionado!!<br /><span>obs: você também pode fazer um agendamento <strong>sem definir um serviço!</strong></span></p><FontAwesomeIcon icon={solid.faCircleExclamation} /></div>}
                    </div>
                </div>

                <form>
                    <div className='inputs'>
                        <div>
                            <label htmlFor="agend-client-name">cliente</label>
                            <input type="text" id="agend-client-name" value={client.nome} onChange={() => { }} />
                        </div>
                        <div>
                            <label htmlFor="agend-date-input">data</label>
                            <input type="date" list='date-list' id='agend-date-input' value={calendarDate} onClick={(e) => { e.preventDefault(); openModal('.calendar-section') }} onChange={() => { }} />
                        </div>
                        {calendarDate.length !== 0 &&
                            <div>
                                <label htmlFor="agend-hour-input">horario<FontAwesomeIcon icon={solid.faClock} /></label>
                                <nav>
                                    {
                                        horarioFunc.map((hour, index) => {
                                            let state
                                            agendamentos.forEach(agend => {
                                                if (agend.data === calendarDate && agend.hora === hour) {
                                                    state = 'reserved'
                                                }
                                            })
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
                        <button className='finish--' onClick={handleResume}><span>Confirmar</span> <FontAwesomeIcon icon={solid.faCheck} /> </button>}
                </form>
            </div>

            <div className="resumo-agendamento">
                <h3><FontAwesomeIcon icon={solid.faChevronLeft} onClick={handleResume} /> Resumo</h3>

                <div className="content">
                    <h4>Informações do agendamento</h4>
                    <p>Cliente: <strong>{client.nome}</strong></p>
                    {agendamento.data !== undefined && <p>Data: <strong>{agendamento.data.split('-').reverse().join('/')}</strong></p>}
                    {agendamento.hora !== undefined && <p>Horario: <strong>{agendamento.hora}</strong> <br /> <span>obs: <strong>O cliente deve chegar a barbearia no horario definido!</strong></span></p>}
                    <hr />
                    <div className="servicos-resumo">
                        <h5>Serviços:</h5>
                        {servicosAgenda.length > 0 ? servicosAgenda.map(({ nome, valor }, index) => {
                            return <span key={index}>{nome} <strong>{numberForBrl(valor)}</strong></span>
                        }) : <span>Nenhum serviço adicionado</span>}

                    </div>
                    {agendamento.valor !== 0 && <p className="total-price">Total: {numberForBrl(agendamento.valor)}</p>}
                </div>

                <button onClick={handleConfirmAgend}><span>Finalizar agendamento</span>  <FontAwesomeIcon icon={solid.faSpinner} /></button>
            </div>
        </div>
    )
}

export default Agendamento
