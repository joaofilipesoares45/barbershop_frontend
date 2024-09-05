import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '../css/notif.css'
import { closeModal, openModal } from "../../../methods/functions";

function setMsg(msg) {
    const modal = document.querySelector('.modal-notif')

    modal.querySelector('h3 span').textContent = msg.title
    modal.setAttribute('type', msg.type)
    openModal('.modal-notif')

    setTimeout(() => {
        closeModal()
    }, 1500)
}

function NotifModal() {
    return (
        <div className="modal modal-notif">
            <h3><span></span> <FontAwesomeIcon icon={faXmark} onClick={closeModal} /></h3>
        </div>
    )
}


export { NotifModal, setMsg }