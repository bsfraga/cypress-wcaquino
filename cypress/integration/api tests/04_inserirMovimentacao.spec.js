/// <reference types="cypress"/>


describe('Testes de Integração: Inserir Movimentação', () => {
    let token

    before('Obter token de acesso', () => {
        cy.getToken('usuarioteste@gmail.com', 'Ab102030')
    })

    beforeEach('Limpar dado da conta', () => {
        cy.resetRest('usuarioteste@gmail.com', 'Ab102030')
    })

    it('Deve inserir Movimentação no Senhor Barriga WcAquino', () => {
        cy.getAccountIdByName('usuarioteste@gmail.com', 'Ab102030', 'Conta para movimentacoes')
            .then(accountId => {
                cy.request({
                    method: 'POST',
                    url: '/transacoes',
                    body: {
                        conta_id: `${accountId}`,
                        data_pagamento: new Date().toLocaleDateString('pt-BR'),
                        data_transacao: new Date().toLocaleDateString('pt-BR'),
                        descricao: 'description',
                        envolvido: 'aaaa',
                        status: true,
                        tipo: 'REC',
                        valor: '123'
                    }
                }).as('response')
            })
        cy.get('@response').its('status').should('be.equal', 201)
        cy.get('@response').its('body.id').should('exist')
    })
})