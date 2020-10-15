/// <reference types="cypress"/>

import buildEnv from '../../support/buildEnv'

describe('Testes de Interface: Remover Movimentação', () => {

    before(() => {
        buildEnv()
        cy.visit('https://barrigareact.wcaquino.me/')
        cy.login('conta@teste', 'senha de teste')
        cy.validateToastAndClose('Bem vindo, Conta Teste Mockado!')
    })

    after(() => {
        cy.clearLocalStorage()
    })

    it('Deve remover movimentação no Senhor Barriga WcAquino', () => {
        cy.route({
            method: 'DELETE',
            url: '/transacoes/**',
            response: {},
            status: 204
        }).as('del')

        cy.accessBalancePage()

        cy.removeTransactionFromBalance('Movimentacao para exclusao')
        cy.validateToastAndClose('Movimentação removida com sucesso!')
    })


})