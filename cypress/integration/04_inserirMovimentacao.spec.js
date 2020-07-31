/// <reference types="cypress"/>

import locator from '../support/locators'

describe('Inserir Movimentação no Senhor Barriga WCAquino', () => {
    before('Acessar site senhor Barriga', () => {
        cy.visit("http://barrigareact.wcaquino.me")
    })

    it('Acessar conta no Senhor Barriga WCAquino', () => {
        cy.login('usuarioteste@gmail.com', 'Ab102030')
        cy.validateToastAndClose('Bem vindo, Usuário de Teste!')
    })

    it('Acessar página de Movimentação no Senhor Barriga WcAquino', () => {
        cy.get(locator.MENU.MOVIMENTACAO).click()
        cy.url().should('contain', '/movimentacao')
    })

    it('Adicionar movimentação do tipo Receita', () => {
        cy.get(locator.MOVIMENTACAO.RECEITA).click()
        cy.get(locator.MOVIMENTACAO.DATA_TRANSACAO).type(new Date().toISOString().slice(0, 10))
        cy.get(locator.MOVIMENTACAO.DATA_PAGAMENTO).type(new Date().toISOString().slice(0, 10))
        cy.get(locator.MOVIMENTACAO.DESCRICAO).type('Teste Movimentação')
        cy.get(locator.MOVIMENTACAO.VALOR).type(Math.random().toFixed(2))
        cy.get(locator.MOVIMENTACAO.INTERESSADO).type('Testando Interessado da Movimentação')
        cy.get(locator.MOVIMENTACAO.CONTA).select('conta do baeludo alterada')
        cy.get(locator.MOVIMENTACAO.STATUS).click()
        cy.get(locator.MOVIMENTACAO.BTN_SALVAR).click()
        cy.url().should('contain', '/extrato')
        cy.closeToast()
    })

    it('Acessar página de Movimentação no Senhor Barriga WcAquino', () => {
        cy.get(locator.MENU.MOVIMENTACAO).click()
        cy.url().should('contain', '/movimentacao')
    })

    it('Adicionar movimentação do tipo Despesa', () => {
        cy.get(locator.MOVIMENTACAO.DESPESA).click()
        cy.get(locator.MOVIMENTACAO.DESCRICAO).type('Teste Movimentação')
        cy.get(locator.MOVIMENTACAO.VALOR).type(Math.random(9999).toFixed(2))
        cy.get(locator.MOVIMENTACAO.INTERESSADO).type('Testando Interessado da Movimentação')
        cy.get(locator.MOVIMENTACAO.STATUS).click()
        cy.get(locator.MOVIMENTACAO.BTN_SALVAR).click()
    })

    after('Efetuar logout', () => {
        cy.logout()
        cy.validateToastAndClose('Até Logo!')
    })

})