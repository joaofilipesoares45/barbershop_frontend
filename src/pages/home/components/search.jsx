import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '@fortawesome/free-solid-svg-icons'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import '../css/search.css'

function Search({ list }) {

    const search = (e) => {
        const searchInput = document.querySelector(`input[type=search]`)
        const listDivs = document.querySelectorAll(`.barber-list .barber-div`)
        if (searchInput.value.length > 0) {
            listDivs.forEach(div => {
                if (div.querySelector(`h3`).textContent.toLowerCase().includes(searchInput.value.toLowerCase())) {
                    div.setAttribute(`visible`, ``)
                } else {
                    div.removeAttribute(`visible`)
                }
            })
        } else {
            listDivs.forEach(div => {
                div.setAttribute(`visible`, ``)
            })
        }
    }

    return (
        <div className='search-div'>
            <input type="search" className='search-input' placeholder='Buscar Barbearia...' onKeyUp={search} list='search-list'/>
            <FontAwesomeIcon icon={faMagnifyingGlass} onClick={search} />
            <datalist id='search-list'>
                {list.map(({nome}) => {
                    return (
                        <option value={nome} key={nome}>{nome}</option>
                    )
                })}
            </datalist>
        </div>
    )
}

export default Search