// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
// / <reference types="cypress"/>

import locator from './locators'

Cypress.Commands.add('closeToast', () => {
    cy.get(':nth-child(1) > .toast-close-button').click()
})

Cypress.Commands.add('validateToastAndClose', (message) => {
    cy.get(locator.MENSAGEM.TEXTO).should('be.visible').and('contain', message)
    cy.closeToast()
})

Cypress.Commands.add('login', (user, password) => {
    cy.get(locator.LOGIN.EMAIL).type('usuarioteste@gmail.com')
    cy.get(locator.LOGIN.SENHA).type('Ab102030')
    cy.get(locator.LOGIN.BTN_ENTRAR).click()
})

Cypress.Commands.add('resetApp', () => {
    cy.get(locator.MENU.SETTINGS).click()
    cy.get(locator.MENU.RESET).click()
})

Cypress.Commands.add('accessAccountPage', () => {
    cy.get(locator.MENU.SETTINGS).click()
    cy.get(locator.MENU.CONTAS).click()
})

Cypress.Commands.add('createAccount', (accountName) => {
    cy.get(locator.CONTAS.CONTA).type(accountName)
    cy.get(locator.CONTAS.BTN_SALVAR).click()
})

Cypress.Commands.add('logout', () => {
    cy.get(locator.MENU.SETTINGS).click()
    cy.get(locator.MENU.SAIR).click()
})

Cypress.Commands.add('updateAccountName', (accountName, newAccountName) => {
    cy.xpath(locator.CONTAS.FN_BTN_EDITAR(accountName)).first().click()
    cy.get(locator.CONTAS.CONTA).should('have.value', accountName)
    cy.get(locator.CONTAS.CONTA).clear().type(newAccountName)
    cy.get(locator.CONTAS.BTN_SALVAR).click()
})

Cypress.Commands.add('validateBalanceFromAccounts', (accountName, balance) => {
    cy.xpath(locator.INICIO.FN_XP_SALDO_CONTAS(accountName, balance)).should('contain', balance)
})

Cypress.Commands.add('isAccountRedefined', (textToValidate) => {
    cy.xpath(locator.EXTRATO.FN_XP_TRANSACAO(textToValidate)).should('not.be.visible')
})