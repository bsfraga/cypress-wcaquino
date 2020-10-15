/// <reference types="cypress"/>

import buildEnv from '../../support/buildEnv'

describe('Testes de Interface: Inserir Conta', () => {

    before(() => {
        buildEnv()
        cy.visit('https://barrigareact.wcaquino.me/')
        cy.login('conta@teste', 'senha de teste')
        cy.validateToastAndClose('Bem vindo, Conta Teste Mockado!')
    })

    after(() => {
        cy.clearLocalStorage()
    })

    it('Deve inserir conta no Senhor Barriga WcAquino', () => {
        cy.route({
            method: 'POST',
            url: '/contas',
            response: {
                id: 3,
                nome: "Conta Mock",
                visivel: true,
                usuario_id: 1
            }
        }).as('novaConta')
        
        cy.accessAccountPage()
        
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

        cy.createAccount('Conta Mock')
        cy.validateToastAndClose('Conta inserida com sucesso!')
    })

})