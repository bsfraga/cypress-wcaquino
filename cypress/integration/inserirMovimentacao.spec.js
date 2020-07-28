/// <reference types="cypress"/>

import locator from '../support/locators'

describe('Inserir Conta no Senhor Barriga WCAquino', () => {
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

    it('Acessar página de Movimentação no Senhor Barriga WcAquino', () => {
        cy.get(locator.MENU_SUPERIOR.MOVIMENTACAO).click()
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
        cy.get(locator.MENU_SUPERIOR.MOVIMENTACAO).click()
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

})