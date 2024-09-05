import { connectionApi } from '../../../methods/connectionApi';
import { useEffect, useState } from 'react';
import '../css/main.css'
import Search from './search'
import SideBar from './sidebar';

function Main() {
    const [barbers, setBarbers] = useState([])

    useEffect(() => {
        const getBarbers = async () => {
            const users = await connectionApi(`get`, `company`)
            const services = await connectionApi(`get`, `service`)
            
            users.forEach(({id}, Uindex) => {
                users[Uindex].services = []
                services.forEach(({idEmpresa}, Sindex) => {
                    if (idEmpresa === id) {
                        users[Uindex].services.push(services[Sindex])
                    }
                })
            })
            setBarbers(users)
        }
        getBarbers()
    }, [barbers])

    return (
        <main className='main-home'>
            <SideBar />
            <div className='roll'>
                <Search list={ barbers }/>
                <div className='barber-list'>
                    {
                        barbers.map(({ id, nome, foto, services }) => {
                            return (
                                <div className='barber-div' id={id} visible='' key={id}>
                                    <img src={foto || 'https://static.vecteezy.com/system/resources/thumbnails/008/442/086/small/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg'} alt='barber-img' />
                                    <div className='content'>
                                        <h3>{nome}</h3>
                                        <div className='footer'>
                                            <h5>Serviços:
                                                <p>
                                                    {
                                                        services.map(({nome}, index) => {
                                                            if (services.length === 1) {
                                                                
                                                            } else if (index === services.length - 1){
                                                                return `${nome}.`  
                                                            } else if (index < services.length) {
                                                                return `${nome}, `
                                                            } 
                                                            return `${nome}`
                                                        })
                                                    }
                                                </p>
                                            </h5>
                                            <button onClick={() => { window.location = `barbearia?id=${id}` }} >Ver Barbearia</button>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>

        </main>
    )
}
export default Main