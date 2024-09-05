class Agendamento {
    servicos = []
    valor = 0

    constructor ({id, idEmpresa, nomeCliente, data, hora, valor, servicos}) {
        this.id = id
        this.idEmpresa = idEmpresa
        this.nomeCliente = nomeCliente
        this.data = data
        this.hora = hora
        this.valor = valor
        this.servicos = servicos
    }

    total(listServicos) {
        let valorTotal = 0
        listServicos.forEach(servico => {
            valorTotal += servico.valor
        });
        return valorTotal
    }

    clear() {
        Object.keys(this).filter((key) => key !== 'valor' && key !== 'servicos').forEach(key => {
            this[key] = undefined
        })
    }
}

export default Agendamento