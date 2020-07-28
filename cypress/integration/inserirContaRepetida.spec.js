/// <reference types="cypress"/>

import locator from '../support/locators'

describe('Inserir Conta Repetida no Senhor Barriga WCAquino', () => {
    before(() => {
        cy.visit("http://barrigareact.wcaquino.me")
    })

    it('Acessar conta no Senhor Barriga WCAquino', () => {
        cy.get(locator.LOGIN.EMAIL).type('usuarioteste@gmail.com')
        cy.get(locator.LOGIN.SENHA).type('Ab102030')
        cy.get(locator.LOGIN.BTN_ENTRAR).click()
        cy.get(locator.MENSAGEM.TEXTO).should('contain', 'Bem vindo, Usuário de Teste!')
        cy.closeToast()
    })

    it('Acessar página de Contas do Senhor Barriga WCAquino', () => {
        cy.get(locator.MENU_SUPERIOR.SETTINGS).click()
        cy.get(locator.MENU_SUPERIOR.CONTAS).click()
        cy.url().should('contain', '/contas')
    })

    it('Adicionar conta já existe no Senhor Barriga WcAquino', () => {

        cy.xpath(locator.CONTAS.XP_TEST_ACC).then(content => {
            cy.get(locator.CONTAS.CONTA).type(content.text())
            cy.get(locator.CONTAS.BTN_SALVAR).click()
        })

        cy.get(locator.MENSAGEM.TEXTO).should('be.visible')
            .and('contain', 'Erro')
        cy.closeToast()

    })

    it('Efetuar Logout', () => {
        cy.get(locator.MENU_SUPERIOR.SETTINGS).click()
        cy.get(locator.MENU_SUPERIOR.SAIR).click()
        cy.get(locator.MENSAGEM.TEXTO).should('have.text', 'Até Logo!')
        cy.url().should('contain', '/login')
        cy.closeToast()
    })

})