import { connectionApi } from "./connectionApi";

const dateValid = (list, barberId, type) => {
    const newList = []

    const getData = async () => {
        const DBagendamentos = await connectionApi('get', 'agenda')
        const agendamentos = DBagendamentos.filter(agend => agend.idEmpresa === barberId)

        const DBfolgas = await connectionApi('get', 'folgas')
        const folgas = DBfolgas.filter(folga => folga.idEmpresa === barberId)
        return [agendamentos, folgas]
    }

    return getData().then((data) => {
        const [agendamentos, folgas] = data;
        list.forEach(element => {
            const date = new Date(element.attr)
            const diaSemana = new Date(date).getDay()

            if (diaSemana === 6) {
                element.pass = ''
            }

            folgas.forEach(folga => {
                JSON.parse(folga.data).forEach(data => {
                    if (element.attr === data) {
                        element.color = 'white'
                    }
                })
            })
            if (type !== undefined) {
                agendamentos.forEach(agendamento => {
                    if (element.attr === agendamento.data) {
                        element.color = 'gray'
                    }
                })
            }
            newList.push(element)
        });

        return newList
    })
}

export default dateValid