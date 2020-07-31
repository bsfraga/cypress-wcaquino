/// <reference types="cypress"/>

import locator from '../support/locators'

describe('Inserir Conta Repetida no Senhor Barriga WCAquino', () => {
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

    it('Adicionar conta já existe no Senhor Barriga WcAquino', () => {
        cy.xpath(locator.CONTAS.XP_TEST_ACC).then(content => {
            cy.get(locator.CONTAS.CONTA).type(content.text())
            cy.get(locator.CONTAS.BTN_SALVAR).click()
        })
        cy.validateToastAndClose('Erro')
    })

    after('Efetuar logout', () => {
        cy.logout()
        cy.validateToastAndClose('Até Logo!')
    })

})