import '../css/sidebar.css'
import Calendar from './Calendar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as solid from '@fortawesome/free-solid-svg-icons'
import { useContext } from 'react'
import BarberContext from '../context/BarberContext'

function Sidebar({ component }) {

    const { calendarType } = useContext(BarberContext)
    return (
        <div className="modal sidebar">
            <Calendar type={calendarType} />
            <div className='content'>
                <span>Menu <FontAwesomeIcon icon={solid.faXmark} /></span>
                <div className='main'>
                    {component}
                </div>
            </div>
        </div>
    )
}

export default Sidebar