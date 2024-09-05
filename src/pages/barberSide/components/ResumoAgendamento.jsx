import { useContext, useEffect, useState } from 'react'
import '../css/resumoagendamento.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as solid from '@fortawesome/free-solid-svg-icons'
import { numberForBrl, closeModal } from '../../../methods/functions'

import { connectionApi } from '../../../methods/connectionApi'
import BarberContext from '../context/BarberContext'
import * as AG from '../../../Classes/Agendamento'
import { setMsg } from '../../home/components/notif'
import NovoAgendamento from './NovoAgendamento'

function Agendamento({ agendamento }) {

    const [services, setServices] = useState([])
    const [servicosAgenda, setServicosAgenda] = useState([])
    const { setAgendamento, handleChangeComponent, setCalendarDate } = useContext(BarberContext)

    useEffect(() => {
        const getServices = async () => {
            const DBservices = await connectionApi('get', 'service')
            setServices(DBservices.filter(service => service.idEmpresa === JSON.parse(localStorage.currentUser).id))
        }
        getServices()

        if (agendamento.servicos !== undefined) {
            let list = []
            JSON.parse(agendamento.servicos).forEach(id => list.push(services.filter(service => service.id === id)[0]))
            setServicosAgenda(list)
        }
    }, [agendamento.servicos, services])

    const handleEditAgendamento = () => {
        setCalendarDate(agendamento.data)
        setAgendamento(new AG.default(agendamento))
        closeModal()
        handleChangeComponent(<NovoAgendamento />)
    }

    const handleDeleteAgendamento = ({ target }) => {
        if (target.textContext === 'Excluir') {
            target.textContext = 'Confirmar'
        } else {
            closeModal()
            connectionApi('delete', 'agenda', agendamento).then((res) => res.json()).then((data) => setMsg(data))
        }
    }

    return (
        <div className="modal barber-side-agendamento">

            <div className="resumo-agendamento">

                <div className="content">
                    <h4>Informações do agendamento <FontAwesomeIcon icon={solid.faXmark} onClick={closeModal} /></h4>

                    <p>Cliente: <strong>{agendamento.nomeCliente}</strong></p>
                    {agendamento.data !== undefined && <p>Data: <strong>{agendamento.data.split('-').reverse().join('/')}</strong></p>}
                    {agendamento.hora !== undefined && <p>Horario: <strong>{agendamento.hora}</strong></p>}

                    <hr />
                    <div className="servicos-resumo">
                        <h5>Serviços:</h5>
                        {servicosAgenda.length > 0 ? servicosAgenda.map(({ nome, valor }, index) => {
                            return <span key={index}>{nome} <strong>{numberForBrl(valor)}</strong></span>
                        }) : <span>Nenhum serviço adicionado</span>}

                    </div>
                    {agendamento.valor !== 0 && <p className="total-price">Total: {numberForBrl(agendamento.valor)}</p>}

                </div>
                <nav>
                    <span onClick={handleEditAgendamento}>Editar <FontAwesomeIcon icon={solid.faPen} /></span>
                    <span onClick={handleDeleteAgendamento}>Excluir <FontAwesomeIcon icon={solid.faTrash} /></span>
                </nav>
            </div>
        </div>
    )
}

export default Agendamento