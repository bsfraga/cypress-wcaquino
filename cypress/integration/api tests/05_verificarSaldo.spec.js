/// <reference types="cypress"/>


describe('Testes de Integração: Verificar Saldo', () => {
    let token

    before('Obter token de acesso', () => {
        cy.getToken('usuarioteste@gmail.com', 'Ab102030')
    })

    beforeEach('Limpar dado da conta', () => {
        cy.resetRest('usuarioteste@gmail.com', 'Ab102030')
    })

    it('Deve verificar saldo de conta do Senhor Barriga WcAquino', () => {

        cy.request({
            method: 'GET',
            url: '/transacoes',
            qs: {
                descricao: 'Movimentacao 1, calculo saldo'
            }
        }).then(response => {
            cy.request({
                method: 'PUT',
                url: `/transacoes/${response.body[0].id}`,
                body: {
                    status: true,
                    data_transacao: Cypress.moment(response.body[0].data_transacao).format('DD/MM/YYYY'),
                    data_pagamento: Cypress.moment(response.body[0].data_pagamento).format('DD/MM/YYYY'),
                    descricao: response.body[0].descricao,
                    envolvido: response.body[0].envolvido,
                    valor: response.body[0].valor,
                    conta_id: `${response.body[0].conta_id}`,
                }
            }).its('status').should('be.equal', 200)
        })

        cy.request({
            method: 'GET',
            url: '/saldo',

        }).then(response => {
            let saldoConta = null
            response.body.forEach(item => {
                if (item.conta == 'Conta para saldo') saldoConta = item.saldo
            })
            expect(saldoConta).to.be.equal('4034.00')
        })
    })
})