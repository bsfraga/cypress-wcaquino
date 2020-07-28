/// <reference types="cypress"/>

import locator from '../support/locators'

describe('Alterar Conta no Senhor Barriga WCAquino', () =>{
    before(() => {
        cy.visit("http://barrigareact.wcaquino.me")
    })

    const accountName = 'conta do baeludo'
    const newAccountName = 'conta do baeludo alterada'

    it('Acessar conta no Senhor Barriga WCAquino', ()=> {
        cy.get(locator.LOGIN.EMAIL).type('usuarioteste@gmail.com')
        cy.get(locator.LOGIN.SENHA).type('Ab102030')
        cy.get(locator.LOGIN.BTN_ENTRAR).click()
        cy.get(locator.MENSAGEM.TEXTO).should('contain', 'Bem vindo, Usuário de Teste!')
        cy.closeToast()
    })
    
    it('Acessar página de Contas no Senhor Barriga WcAquino', () => {
        cy.get(locator.MENU_SUPERIOR.SETTINGS).click()
        cy.get(locator.MENU_SUPERIOR.CONTAS).click()
        cy.get(locator.CONTAS.TABELA_CONTAS).should('contain', accountName)
    })

    it('Alterar conta no Senhor Barriga WcAquino', () => {
        cy.get(locator.CONTAS.EDITAR).click()
        cy.get(locator.CONTAS.CONTA).should('have.value', accountName)
        cy.get(locator.CONTAS.CONTA).clear().type(newAccountName)
        cy.get(locator.CONTAS.BTN_SALVAR).click()
        cy.get(locator.MENSAGEM.TEXTO).should('have.text', 'Conta atualizada com sucesso!')
        cy.closeToast()
        
    })

    it('Efetuar Logout', () => {
        cy.get(locator.MENU_SUPERIOR.SETTINGS).click()
        cy.get(locator.MENU_SUPERIOR.SAIR).click()
        cy.get(locator.MENSAGEM.TEXTO).should('have.text', 'Até Logo!')
    })

})