import * as solid from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { logOut } from "../../../methods/login";
import '../css/sidebar.css'


function SideBar() {
    return (
        <div className="side-bar" onClick={(e) => {if (e.target.tagName === `A`) {e.preventDefault()}}}>
            <FontAwesomeIcon icon={solid.faCaretRight} onClick={(e) => {if(!e.target.parentElement.hasAttribute(`open`)){e.target.parentElement.setAttribute(`open`, '')}else{e.target.parentElement.removeAttribute(`open`)}}}/>

            <div className="menu">
                <a href="#agendamentos">
                    Agendamentos
                    <FontAwesomeIcon icon={ solid.faCalendar } />
                </a>
                <a href="#perfil">
                    Perfil
                    <FontAwesomeIcon icon={ solid.faUser } />
                </a>

                <a href="#log-out" onClick={logOut} >
                    Sair
                    <FontAwesomeIcon icon={ solid.faRightFromBracket } />
                </a>
            </div>
        </div>
    )
}


export default SideBar
