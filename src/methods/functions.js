const numberForBrl = (value) => {
    return new Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(value)
}

const isLeapYear = (year) => {
    return (year % 4 === 0 && year % 100 !== 0 && year % 400 !== 0) || (year % 100 === 0 && year % 400 === 0)
}

const getFebDays = (year) => {
    return (isLeapYear(year) ? 29 : 28)
}

const getWeek = (string) => {
    const date = new Date(string);
    let time = new Date(string).getTime(0) - (date.getDay() * 86400000)
    let dom = new Date(time).toLocaleDateString('pt-BR').split('/').reverse().join('-')
    const week = []
    for (let i = 0; i < 7; i++) {
        week.push(dom)
        let time = new Date(dom).getTime(0) + 106400000
        let tm = new Date(time).toLocaleDateString('pt-BR').split('/').reverse().join('-')
        dom = tm
    }
    return week
}

const getCalendar = (month, year) => {
    const currDate = new Date()
    let days_of_month = [31, getFebDays(year), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    let first_day = new Date(year, month, 1)

    const listDays = []
    for (let i = 0; i <= days_of_month[month] + first_day.getDay() - 1; i++) {
        const day = {}
        if (i >= first_day.getDay()) {
            day.active = ''
            day.attr = `${year}-${(month + 1).toString().padStart(2, '0')}-${(i - first_day.getDay() + 1).toString().padStart(2, '0')}`
            day.txt = i - first_day.getDay() + 1

            if (i - first_day.getDay() + 1 === currDate.getDate() && year === currDate.getFullYear() && month === currDate.getMonth()) {
                day.class = 'curr-date';
            }

            if (!compareDates(`${(i - first_day.getDay() + 1).toString().padStart(2, '0')}/${(month + 1).toString().padStart(2, '0')}/${year}`)) {
                day.pass = ''
            }

            if (year > currDate.getFullYear() || month > currDate.getMonth()) {
                delete day.pass
            }
        }
        listDays.push(day)
    }
    return listDays
} 

const dateFormat = (date) => {
    return date.split('-').reverse().join('/')
}

const compareDates = (date) => {
    let parts = date.split('/')
    let today = new Date()
    today.setHours(0, 0, 0, 0)

    date = new Date(parts[2], parts[1] - 1, parts[0])

    return date >= today ? true : false
}

const dateSort = (list) => {
    const bubble = [...list]
    for (let i = 0; i < bubble.length; i++) {
        for (let j = i + 1; j < bubble.length; j++) {
            const parts1 = dateFormat(bubble[i].data).split('/')
            const parts2 = dateFormat(bubble[j].data).split('/')

            const date1 = new Date(parts1[2], parts1[1] - 1, parts1[0])
            const date2 = new Date(parts2[2], parts2[1] - 1, parts2[0])

            if (date1 >= date2) {
                let aux = bubble[i];
                bubble[i] = bubble[j];
                bubble[j] = aux;
            }
        }
    }

    return bubble
}

const zoomImg = ({ target }) => {
    const imgZoom = document.querySelector('.img-zoom')
    imgZoom.querySelector('img').setAttribute('src', target.getAttribute('src'))
    openModal('.img-zoom')
}

const openModal = (modalClass) => {
    const modal = document.querySelector(modalClass)
    modal.setAttribute('open', '')
}

const closeModal = () => {
    document.querySelectorAll('.modal').forEach(modal => {        
        modal.removeAttribute('open')
        modal.removeAttribute('load')
    })
}

const newFavorite = (index) => {
    if (localStorage.getItem('favoriteServices') === null) {
        localStorage.favoriteServices = JSON.stringify([index])
    } else {
        const favorites = JSON.parse(localStorage.favoriteServices)
        let exist = false
        favorites.forEach(el => {
            if (index === el) {
                exist = true
            }
        })
        if (!exist) {
            favorites.push(index)
            localStorage.favoriteServices = JSON.stringify(favorites)
        }
    }
}

const removeFavorite = (index) => {
    const favorites = JSON.parse(localStorage.favoriteServices)
    favorites.forEach((el, i) => {
        if (index === el) {
            favorites.splice(i, 1)
        }
    })
    favorites.length > 0 ? localStorage.favoriteServices = JSON.stringify(favorites) : localStorage.removeItem('favoriteServices')
}

window.onscroll = () => {
    document.querySelectorAll('.modal').forEach(modal => modal.style = `top: ${window.scrollY.toFixed(0)}px;`)

    const header = document.querySelector('header')
    if (window.scrollY > 60) {
        header.setAttribute('expand', '')
    } else if (window.scrollY < 50) {
        header.removeAttribute('expand')
    }
}

window.onbeforeunload = () => {
    document.querySelector('section.load').setAttribute('load', '')
}

window.onclick = ({target}) => {    
    if (target.classList[1] === 'fa-xmark') {
        closeModal()
    }
}


export {
    numberForBrl,
    dateFormat,
    zoomImg,
    openModal,
    closeModal,
    newFavorite,
    removeFavorite,
    compareDates,
    dateSort,
    isLeapYear,
    getFebDays,
    getWeek,
    getCalendar
}