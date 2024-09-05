
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as solid from "@fortawesome/free-solid-svg-icons";
import { closeModal } from "../../../methods/functions";
// import * as regular from "@fortawesome/free-regular-svg-icons";

function ImgZoom() {
    return (
        <div className="modal img-zoom">
            <FontAwesomeIcon icon={solid.faXmark} onClick={() => {closeModal()}}/>
            <img src="" alt="" />
        </div>
    )
}

export default ImgZoom