/// <reference types="cypress"/>

import buildEnv from '../../support/buildEnv'

describe('Testes de Interface: Alterar conta', () => {

    before(() => {
        buildEnv()
        cy.visit('https://barrigareact.wcaquino.me/')
        cy.login('conta@teste', 'senha de teste')
        cy.validateToastAndClose('Bem vindo, Conta Teste Mockado!')
    })

    after(() => {
        cy.clearLocalStorage()
    })



    it('Deve alterar uma conta no Senhor Barriga WcAquino', () => {
        cy.route({
            method: 'GET',
            url: '/contas',
            response: [{
                id: 1,
                nome: "Carteira",
                visivel: true,
                usuario_id: 1
            },
            {
                id: 2,
                nome: "Banco",
                visivel: true,
                usuario_id: 1
            },
            {
                id: 3,
                nome: "Conta Mock",
                visivel: true,
                usuario_id: 1
            }]
        }).as('contasAtualizadas')

        cy.accessAccountPage()

        cy.route({
            method: 'PUT',
            url: '/contas/3',
            response:
            {
                id: 3,
                nome: "Conta Mock Alterada",
                visivel: true,
                usuario_id: 1
            }
        }).as('contaAtualizada')

        cy.route({
            method: 'GET',
            url: '/contas',
            response: [{
                id: 1,
                nome: "Carteira",
                visivel: true,
                usuario_id: 1
            },
            {
                id: 2,
                nome: "Banco",
                visivel: true,
                usuario_id: 1
            },
            {
                id: 3,
                nome: "Conta Mock Alterada",
                visivel: true,
                usuario_id: 1
            }]
        }).as('contasAtualizadas')

        cy.updateAccountName('Conta Mock', 'Conta Mock Alterada')

        cy.validateToastAndClose('Conta atualizada com sucesso!')
    })
})