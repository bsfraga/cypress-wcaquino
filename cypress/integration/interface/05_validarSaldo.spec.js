/// <reference types="cypress"/>

import buildEnv from '../../support/buildEnv'

describe('Testes de Interface: Validar Saldo', () => {

    before(() => {
        buildEnv()
        cy.visit('https://barrigareact.wcaquino.me/')
        cy.login('conta@teste', 'senha de teste')
        cy.validateToastAndClose('Bem vindo, Conta Teste Mockado!')
    })

    after(() => {
        cy.clearLocalStorage()
    })

    it('Deve validar o saldo das contas no Senhor Barriga WcAquino', () => {
        cy.route({
            method: 'GET',
            url: '/transacoes/**',
            response: {
                "conta": "Carteira",
                "id": 205751,
                "descricao": "Movimentacao para exclusao",
                "envolvido": "AAA",
                "observacao": null,
                "tipo": "DESP",
                "data_transacao": "2020-08-04T03:00:00.000Z",
                "data_pagamento": "2020-08-04T03:00:00.000Z",
                "valor": "-1500.00",
                "status": false,
                "conta_id": 99909,
                "usuario_id": 1,
                "transferencia_id": null,
                "parcelamento_id": null
            }
        })

        cy.route({
            method: 'PUT',
            url: '/transacoes/**',
            response: {
                "conta": "Carteira",
                "id": 205751,
                "descricao": "Movimentacao para exclusao",
                "envolvido": "AAA",
                "observacao": null,
                "tipo": "DESP",
                "data_transacao": "2020-08-04T03:00:00.000Z",
                "data_pagamento": "2020-08-04T03:00:00.000Z",
                "valor": "-1500.00",
                "status": false,
                "conta_id": 99909,
                "usuario_id": 1,
                "transferencia_id": null,
                "parcelamento_id": null
            }
        })

        cy.validateBalanceFromAccounts('Carteira', 100.00)
        cy.accessBalancePage()
        cy.updateBalanceStatus('Movimentacao para extrato')
        cy.get('[data-test=status]').click()
        cy.get('.btn-primary').click()
        cy.validateToastAndClose('Movimentação alterada com sucesso!')
        cy.route({
            method: 'GET',
            url: '/saldo',
            response: [
                {
                    conta_id: 999,
                    conta: 'Carteira',
                    saldo: '100'
                },
                {
                    conta_id: 99909,
                    conta: 'Banco',
                    saldo: '99998500.00'
                }]
        }).as('saldoFinal')
        
        cy.get('[data-test=menu-home]').click()
        cy.validateBalanceFromAccounts('Banco', '99.998.500')
    })
})