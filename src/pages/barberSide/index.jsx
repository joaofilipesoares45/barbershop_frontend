import React, { useContext, useEffect, useState } from "react"
import { Navigate } from "react-router-dom"
import BarberContext from "./context/BarberContext"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as solid from '@fortawesome/free-solid-svg-icons'

import './css/style.css'

import { connectionApi } from "../../methods/connectionApi"
import { dateFormat, getWeek, openModal } from "../../methods/functions"

import Agendamento from "./components/ResumoAgendamento"
import Sidebar from "./components/sidebar"
import Menu from "./components/Menu"

const weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab']
const month_names = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"]

function BarberSide() {

    const today = new Date()
    const [date, setDate] = useState(today.toLocaleDateString('pt-BR').split('/').reverse().join('-'))

    const { barber, setBarber, component, handleChangeComponent, agendamentos, setAgendamentos, setFolgas, dadosAgendamento, setDadosAgendamento } = useContext(BarberContext)

    useEffect(() => {
        if (localStorage.getItem('currentUser') !== null) {
            const user = JSON.parse(localStorage.getItem('currentUser'))
            setBarber(user)
            if (user.tipo !== 'empresa') {
                return <Navigate to="/home" />
            }
        }
    }, [setBarber, setAgendamentos])

    useEffect(() => {
        const getAgendamentos = async () => {
            const agendamentosDB = await connectionApi('get', 'agenda')
            setAgendamentos(agendamentosDB.filter(agend => agend.idEmpresa === barber.id))
        }

        getAgendamentos()
    }, [agendamentos, barber.id, setAgendamentos]);

    useEffect(() => {
        const getFolgas = async () => {
            const DBfolgas = await connectionApi('get', 'folgas')

            setFolgas(DBfolgas.filter(folga => folga.idEmpresa === barber.id))
        }
        getFolgas()
    })

    const handleSetDate = ({ target }) => {
        const dateMills = new Date(date).setHours(0)
        const test = new Date(dateMills).getTime(0)

        switch (target.classList[1]) {
            case 'fa-chevron-left':
                const yesterday = new Date(test - 518400000)

                setDate(yesterday.toLocaleDateString('pt-BR').split('/').reverse().join('-'))
                break;

            default:
                const tomorrow = new Date(test + 691200000)

                setDate(tomorrow.toLocaleDateString('pt-BR').split('/').reverse().join('-'))
                break;
        }
    }

    const week = getWeek(date)

    const scrollDate = (event) => {
        console.log(2323);

    }

    return (
        <main className="page BarberSide">
            <header>
                <h1>{barber.nome}</h1>
                <nav>
                    <div>
                        <span>3</span>
                        <FontAwesomeIcon icon={solid.faBell} />
                    </div>
                    <FontAwesomeIcon icon={solid.faBars} onClick={() => handleChangeComponent(<Menu />)} />
                </nav>
            </header>

            <section className="content">
                <h2 className="title">Gerenciamento</h2>
                <div className="first-layer">
                    <div className="info work-days">
                        <h3>
                            Agendamentos
                            <p onPlay={scrollDate}>{`${month_names[Number(date.split('-')[1]) - 1]} - ${today.getFullYear()}`}</p>
                            <nav onClick={handleSetDate}>
                                <FontAwesomeIcon icon={solid.faChevronLeft} />
                                <FontAwesomeIcon icon={solid.faChevronRight} />
                            </nav>
                        </h3>

                        <div className="main">
                            <div className="week-days">
                                {
                                    weekDays.map((day, index) => {
                                        let attr = ''
                                        if (week[index] === `${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${(today.getDate()).toString().padStart(2, '0')}`) {
                                            attr = 'true'
                                        }
                                        return <span key={day} attr={attr} date={week[index]}>{day}<p>{dateFormat(week[index])}</p></span>
                                    })
                                }
                            </div>
                            <div className="hours">
                                {
                                    weekDays.map((day, index) => {
                                        return (
                                            <div key={day} date={week[index]}>
                                                {
                                                    agendamentos.filter(agendamento => agendamento.data === week[index] && agendamento.idEmpresa === barber.id).length > 0 ?

                                                        agendamentos.filter(agendamento => agendamento.data === week[index]).map(agendamento => {
                                                            return (
                                                                <span key={agendamento.hora} onClick={() => { setDadosAgendamento(agendamento); openModal('.barber-side-agendamento') }}><p>{agendamento.nomeCliente}</p> {agendamento.hora}</span>
                                                            )
                                                        }) : <div>Nenhum agendamento!</div>
                                                }
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>

                    </div>
                </div>
            </section>
            <Agendamento agendamento={dadosAgendamento} />
            <Sidebar component={component} />
        </main>
    )
}

export default BarberSide