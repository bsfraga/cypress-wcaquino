/// <reference types="cypress"/>

import locator from '../support/locators'

describe('Alterar Conta no Senhor Barriga WCAquino', () =>{
    before('Acessar site senhor Barriga', () => {
        cy.visit("http://barrigareact.wcaquino.me")
    })

    const accountName = 'conta do baeludo'
    const newAccountName = 'conta do baeludo alterada'

    it('Acessar conta no Senhor Barriga WCAquino', ()=> {
        cy.login('usuarioteste@gmail.com', 'Ab102030')
        cy.validateToastAndClose('Bem vindo, Usuário de Teste!')
    })
    
    it('Acessar página de Contas no Senhor Barriga WcAquino', () => {
        cy.accessAccountPage()
        cy.get(locator.CONTAS.TABELA_CONTAS).should('contain', accountName)
    })

    it('Alterar conta no Senhor Barriga WcAquino', () => {
        cy.updateAccountName(accountName, newAccountName)
        cy.validateToastAndClose('Conta atualizada com sucesso!')
    })

    after('Efetuar logout', () => {
        cy.logout()
        cy.validateToastAndClose('Até Logo!')
    })

})