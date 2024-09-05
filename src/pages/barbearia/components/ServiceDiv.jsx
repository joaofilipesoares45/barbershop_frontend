import { useContext, useEffect, useState } from "react"
import AppContext from "../../../context/AppContext";
import { newFavorite, numberForBrl, removeFavorite, zoomImg } from "../../../methods/functions";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as solid from "@fortawesome/free-solid-svg-icons";
import * as regular from "@fortawesome/free-regular-svg-icons";
import { setMsg } from "../../home/components/notif";


function ServiceDiv({ id, nome, valor, foto, duracao, index }) {
    const { servicos, servicosAgenda, setServicosAgenda } = useContext(AppContext)

    const handleAddService = (index) => {
        if (servicosAgenda.length < 2) {
            setMsg({ title: 'Adicionado ao agendamento' })
            setServicosAgenda([...servicosAgenda, servicos[index]])
        } else {
            setMsg({ title: 'Limite de serviços por agendamento ( 2 )', type: 'red' })
        }
    }

    const [favorite, setFavorite] = useState(false)
    useEffect(() => {
        if (localStorage.getItem('favoriteServices') !== null) {
            JSON.parse(localStorage.favoriteServices).includes(id) && setFavorite(true);
        }
        
    }, [id])


    return (
        <div id={id} className="service-div">
            <nav>
                <FontAwesomeIcon icon={regular.faCalendar} onClick={() => handleAddService(index)} />
                <FontAwesomeIcon onClick={() => { favorite ? (setFavorite(false) || removeFavorite(id)) : (setFavorite(true) || newFavorite(id)) }} icon={favorite ? solid.faStar : regular.faStar} />
            </nav>

            <img src={foto.length > 0 ? foto : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQP9Gg7wVBcaNMfVaADs_AcKMlOmKErKWl0HA&s" || ''} alt="" onClick={(e) => zoomImg(e)} />
            <div className="footer">
                <h4>{nome}</h4>
                <p>{numberForBrl(valor)}</p>
                <p className="time">Duração: <span>{duracao}min</span></p>
            </div>
        </div>
    )
}

export default ServiceDiv