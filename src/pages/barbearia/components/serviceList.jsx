import { useEffect, useContext } from "react";
import { connectionApi } from "../../../methods/connectionApi";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as solid from "@fortawesome/free-solid-svg-icons";
import AppContext from "../../../context/AppContext";
import ServiceDiv from "./ServiceDiv";

function ServiceList() {
    const { servicos, setServicos } = useContext(AppContext)
    const barberID = Number(window.location.search.replace(`?id=`, ``))

    useEffect(() => {
        const getServices = async () => {
            const DBservices = await connectionApi('get', 'service')
            const barberServices = DBservices.filter(({ idEmpresa }) => idEmpresa === barberID)
            setServicos(barberServices)
        }
        getServices()
    }, [barberID, setServicos])

    return (
        <div className="services-list">
            <h3>
                Serviços:
                <span onClick={() => {const serviceSlide = document.querySelector(".services-slide"); serviceSlide.hasAttribute('open') ? serviceSlide.removeAttribute('open') : serviceSlide.setAttribute('open', '')}}>
                    Ver mais
                    <FontAwesomeIcon icon={solid.faChevronCircleDown} />
                </span>
            </h3>
            <div className="services-slide">
                {servicos.map(({ id, nome, valor, foto, duracao }, index) => {
                    return (
                        <ServiceDiv id={id} nome={nome} valor={valor} foto={foto} duracao={duracao} index={index} key={id}/> 
                    )
                })}
            </div>

        </div>
    )
}
export default ServiceList
