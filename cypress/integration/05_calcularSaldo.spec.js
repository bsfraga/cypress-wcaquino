/// <reference types="cypress"/>

import locator from '../support/locators'

describe('Validar saldo da Conta no Senhor Barriga WCAquino', () => {
    before('Acessar site senhor Barriga', () => {
        cy.visit("http://barrigareact.wcaquino.me")
    })

    let total = 0;

    it('Acessar conta no Senhor Barriga WCAquino', () => {
        cy.get(locator.LOGIN.EMAIL).type('usuarioteste@gmail.com')
        cy.get(locator.LOGIN.SENHA).type('Ab102030')
        cy.get(locator.LOGIN.BTN_ENTRAR).click()
        cy.get(locator.MENSAGEM.TEXTO).should('contain', 'Bem vindo, Usuário de Teste!')
        cy.closeToast()
    })

    it('Validar contas e saldos', () => {

        cy.validateBalanceFromAccounts('Conta com movimentacao', '1.500,00')
        cy.validateBalanceFromAccounts('Conta para saldo', '534,00')
        cy.validateBalanceFromAccounts('Conta para extrato', '220,00')

    })

    after('Efetuar logout', () => {
        cy.logout()
        cy.validateToastAndClose('Até Logo!')
    })

})
