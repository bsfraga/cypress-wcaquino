/// <reference types="cypress"/>

import locator from '../support/locators'

describe('Inserir Conta no Senhor Barriga WCAquino', () =>{
    before(() => {
        cy.visit("http://barrigareact.wcaquino.me")
    })
    // it('Acessar página de cadastro.',() => {
    //     cy.get(':nth-child(2) > .nav-link').click()
    //     cy.url().should('contain', '/registro')
    // })

    // it('Criar novo usuário no WCAquino', () => {
    //     cy.get('.jumbotron > :nth-child(1) > .form-control').type('Usuário de Teste'+new Date().getTime())
    //     cy.get('.input-group > .form-control').type('usuarioteste'+new Date().getTime()+'@gmail.com')
    //     cy.get(':nth-child(3) > .form-control').type("Ab102030")
    //     cy.get('.btn').click()

    //     cy.get('.toast-message').should('have.text', 'Usuário adicionado com sucesso')
    //     cy.url().should('contain', '/login')

    // })

    it('Acessar conta no Senhor Barriga WCAquino', () => {
        cy.get(locator.LOGIN.EMAIL).type('usuarioteste@gmail.com')
        cy.get(locator.LOGIN.SENHA).type('Ab102030')
        cy.get(locator.LOGIN.BTN_ENTRAR).click()
        cy.get(locator.MENSAGEM.TEXTO).should('contain', 'Bem vindo, Usuário de Teste!')
    })

    it('Acessar página de Contas do Senhor Barriga WCAquino', () => {
        cy.get(locator.MENU_SUPERIOR.SETTINGS).click()
        cy.get(locator.MENU_SUPERIOR.CONTAS).click()
        cy.url().should('contain', '/contas')
    })

    it('Criar conta no Senhor Barriga WCAquina', () => {
        const accountName = 'conta do baeludo'
        cy.get(locator.CONTAS.CONTA).type(accountName)
        cy.get(locator.CONTAS.BTN_SALVAR).click()
        cy.get(locator.CONTAS.TABELA_CONTAS).should('contain', accountName)
    })

})