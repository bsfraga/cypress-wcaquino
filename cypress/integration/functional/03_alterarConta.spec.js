/// <reference types="cypress"/>

describe('Testes Funcionais: Alterar Conta', () =>{

    const accountName = 'conta para alterar'
    const newAccountName = 'conta alterada'

    before('Acessar site senhor Barriga', () => {
        cy.visit("http://barrigareact.wcaquino.me")
    })

    it('Acessar conta no Senhor Barriga WCAquino', ()=> {
        cy.login('usuarioteste@gmail.com', 'Ab102030')
        cy.validateToastAndClose('Bem vindo, Usuário de Teste!')
    })
    
    it('Acessar página de Contas no Senhor Barriga WcAquino', () => {
        cy.accessAccountPage()
    })

    it('Criar conta no Senhor Barriga WCAquina', () => {
        cy.createAccount('conta para alterar')
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