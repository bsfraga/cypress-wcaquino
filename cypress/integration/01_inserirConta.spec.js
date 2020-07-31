/// <reference types="cypress"/>

import locator from '../support/locators'

describe('Inserir Conta no Senhor Barriga WCAquino', () =>{
    before('Acessar site senhor Barriga', () => {
        cy.visit("http://barrigareact.wcaquino.me")
    })

    it('Acessar conta no Senhor Barriga WCAquino', () => {
        cy.login('usuarioteste@gmail.com', 'Ab102030')
        cy.validateToastAndClose('Bem vindo, Usuário de Teste!')
    })

    it('Acessar página de Contas do Senhor Barriga WCAquino', () => {
        cy.accessAccountPage()
        cy.url().should('contain', '/contas')
    })

    it('Criar conta no Senhor Barriga WCAquina', () => {
        cy.createAccount('conta do baeludo')
        cy.get(locator.CONTAS.TABELA_CONTAS).should('contain', 'conta do baeludo')
    })

    after('Efetuar logout', () => {
        cy.logout()
        cy.validateToastAndClose('Até Logo!')
    })

})