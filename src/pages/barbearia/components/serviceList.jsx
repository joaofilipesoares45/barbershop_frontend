import { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as solid from "@fortawesome/free-solid-svg-icons";

import ServiceDiv from "./ServiceDiv";
import { DataContext } from "../../../context/DataProvider";

function ServiceList() {
    const { servicos } = useContext(DataContext)
    
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
