/// <reference types="cypress"/>

import buildEnv from '../../support/buildEnv' 

describe('Testes de Interface: Inserir conta repetida', () => {

    before(() => {
        buildEnv()
        cy.visit('https://barrigareact.wcaquino.me/')
        cy.login('conta@teste', 'senha de teste')
        cy.validateToastAndClose('Bem vindo, Conta Teste Mockado!')
    })

    after(() => {
        cy.clearLocalStorage()
    })

    it('Deve inserir uma conta já existente no Senhor Barriga WcAquino', () => {
        cy.route({
            method: 'POST',
            url: '/contas',
            response: {
                error: 'Já existe uma conta com esse nome!'
            },
            status: 400
        }).as('novaContaRepetida')
        
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
                nome: "Conta Mock Alterada",
                visivel: true,
                usuario_id: 1
            }]
        }).as('contasAtualizadas')

        cy.createAccountThatAlreadyExists('Banco')
        cy.validateToastAndClose('400')
    })
})