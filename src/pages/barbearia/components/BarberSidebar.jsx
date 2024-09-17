import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as solid from "@fortawesome/free-solid-svg-icons";
import '../css/BarberSidebar.css'

import { useContext } from "react";
import { logOut } from "../../../methods/login";

import { compareDates, dateFormat, dateSort, numberForBrl } from "../../../methods/functions";
import { DataContext } from "../../../context/DataProvider";


function BarberSidebar() {
    const { agendamentos, barbearia } = useContext(DataContext)
    const usuarioAtual = JSON.parse(localStorage.currentUser)
    let preAgendList = agendamentos.filter((el) => el.nomeCliente === usuarioAtual.nome && el.idEmpresa === barbearia && compareDates(dateFormat(el.data)))

    preAgendList = dateSort(preAgendList)
    return (
        <div className="modal sidebar-barbearia">
            <nav className="navigation-sidebar">
                <div className="content">
                    <h2>Menu</h2>
                    <nav>
                        <button><span>Favoritos</span><FontAwesomeIcon icon={solid.faStar} /></button>
                        <button><span>Minha Conta</span><FontAwesomeIcon icon={solid.faUser} /></button>
                    </nav>
                    <h3>Agendamentos</h3>
                    {preAgendList.length > 0 ?
                        <div className="list-agendamentos">
                            {preAgendList.map(({ id, data, hora, valor, servicos }) => {
                                return (
                                    <div key={id}>
                                        <span>Data: <p>{dateFormat(data)}</p></span>
                                        <hr />

                                        <span>Horario: <p>{hora}</p></span>
                                        {JSON.parse(servicos).length > 0 ? <span>{JSON.parse(servicos).length} {JSON.parse(servicos).length === 1 ? 'serviço' : 'serviços'}: {<p>{numberForBrl(valor)}</p>}</span>: <p>Nenhum serviço</p>}
                                    </div>
                                )
                            })}
                        </div> :
                        <div className="list-agendamentos" none=''>
                            Nenhum agendamento!
                        </div>
                    }
                </div>
                <button onClick={logOut}><span>Sair</span> <FontAwesomeIcon icon={solid.faArrowRightFromBracket} /></button>
            </nav>
        </div>
    )
}

export default BarberSidebar