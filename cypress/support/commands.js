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

/**
 * 
 * Commands related to ui functional tests
 * 
 */

import locator from './locators'

Cypress.Commands.add('closeToast', () => {
    cy.get(':nth-child(1) > .toast-close-button').click()
})

Cypress.Commands.add('validateToastAndClose', (message) => {
    cy.get(locator.MENSAGEM.TEXTO).should('be.visible').and('contain', message)
    cy.closeToast()
})

Cypress.Commands.add('login', (user, password) => {
    cy.get(locator.LOGIN.EMAIL).type(user)
    cy.get(locator.LOGIN.SENHA).type(password)
    cy.get(locator.LOGIN.BTN_ENTRAR).click()
})

Cypress.Commands.add('resetApp', () => {
    cy.get(locator.MENU.SETTINGS).click()
    cy.get(locator.MENU.RESET).click()
})

Cypress.Commands.add('accessAccountPage', () => {
    cy.get(locator.MENU.SETTINGS).click()
    cy.get(locator.MENU.CONTAS).click()
    cy.url().should('contain', '/contas')
})

Cypress.Commands.add('createAccountThatAlreadyExists', (accountName) => {
    cy.xpath(locator.CONTAS.FN_XP_TEST_ACC(accountName)).then(content => {
        cy.get(locator.CONTAS.CONTA).type(content.text())
        cy.get(locator.CONTAS.BTN_SALVAR).click()
    })
})

Cypress.Commands.add('createAccount', (accountName) => {
    cy.get(locator.CONTAS.CONTA).type(accountName)
    cy.get(locator.CONTAS.BTN_SALVAR).click()
    cy.get(locator.CONTAS.TABELA_CONTAS).should('contain', accountName)
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

Cypress.Commands.add('accessBalancePage', () => {
    cy.get(locator.MENU.EXTRATO).click()
})

Cypress.Commands.add('updateBalanceStatus', (text) => {
    cy.xpath(locator.EXTRATO.FN_XP_EDITAR_TRANSACAO(text)).click()
})

Cypress.Commands.add('removeTransactionFromBalance', (transactionName) => {
    cy.xpath(locator.EXTRATO.FN_XP_REMOVER_TRANSACAO(transactionName)).first().click()
})

Cypress.Commands.add('accessMovimentationPage', () => {
    cy.get(locator.MENU.MOVIMENTACAO).click()
    cy.url().should('contain', '/movimentacao')
})

Cypress.Commands.add('addPositiveIncome', (incomeLabel, interestedLabel, accountName) => {
    cy.get(locator.MOVIMENTACAO.RECEITA).click()
    cy.get(locator.MOVIMENTACAO.DATA_TRANSACAO).type(new Date().toISOString().slice(0, 10))
    cy.get(locator.MOVIMENTACAO.DATA_PAGAMENTO).type(new Date().toISOString().slice(0, 10))
    cy.get(locator.MOVIMENTACAO.DESCRICAO).type(incomeLabel)
    cy.get(locator.MOVIMENTACAO.VALOR).type(Math.random().toFixed(2))
    cy.get(locator.MOVIMENTACAO.INTERESSADO).type(interestedLabel)
    cy.get(locator.MOVIMENTACAO.CONTA).select(accountName)
    cy.get(locator.MOVIMENTACAO.STATUS).click()
    cy.get(locator.MOVIMENTACAO.BTN_SALVAR).click()
    cy.url().should('contain', '/extrato')
})

Cypress.Commands.add('addNegativeIncome', (incomeLabel, interestedLabel, accountName) => {
    cy.get(locator.MOVIMENTACAO.DESPESA).click()
    cy.get(locator.MOVIMENTACAO.DESCRICAO).type(incomeLabel)
    cy.get(locator.MOVIMENTACAO.DATA_TRANSACAO).type(new Date().toISOString().slice(0, 10))
    cy.get(locator.MOVIMENTACAO.DATA_PAGAMENTO).type(new Date().toISOString().slice(0, 10))
    cy.get(locator.MOVIMENTACAO.VALOR).type(Math.random(9999).toFixed(2))
    cy.get(locator.MOVIMENTACAO.INTERESSADO).type(interestedLabel)
    cy.get(locator.MOVIMENTACAO.CONTA).select(accountName)
    cy.get(locator.MOVIMENTACAO.STATUS).click()
    cy.get(locator.MOVIMENTACAO.BTN_SALVAR).click()
})


/**
 * 
 * Commands related to integration tests
 * 
 */

Cypress.Commands.add('getToken', (user, password) => {
    cy.request({
        method: 'POST',
        url: '/signin',
        body: {
            email: user,
            senha: password,
            redirecionar: false
        }
    }).its('body.token').should('not.be.empty')
    .then(token => {
        Cypress.env('token', token)
        return token
    })
})

Cypress.Commands.add('resetRest', (user, password) => {
    cy.getToken(user, password).then(token => {
        cy.request({
            method: 'GET',
            url: '/reset',
            headers : { Authorization: `JWT ${token}`}
        })
    })
})

Cypress.Commands.add('getAccountIdByName', (user, password, accountName) => {
    cy.getToken(user, password).then(token => {
        cy.request({
            method: 'GET',
            url: '/contas',
            headers : { Authorization: `JWT ${token}`},
            qs: {
                nome: accountName
            }
        }).then(response =>{
            return response.body[0].id
        })
    })
})

/**
 * Overwrite the method request from Cypress for better manipulation of token
 */
Cypress.Commands.overwrite('request', (originalFn, ...options) => {
    if(options.length == 1 ){
        if(Cypress.env('token')){
            options[0].headers = {
                Authorization: `JWT ${Cypress.env('token')}`
            }
        }
    }
    return originalFn(...options)
})