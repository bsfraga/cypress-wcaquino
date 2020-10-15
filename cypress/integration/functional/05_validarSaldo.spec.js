/// <reference types="cypress"/>

describe('Testes Funcionais: Validar saldo', () => {
    before('Acessar site senhor Barriga', () => {
        cy.visit("http://barrigareact.wcaquino.me")
    })

    it('Acessar conta no Senhor Barriga WCAquino', () => {
        cy.login('usuarioteste@gmail.com', 'Ab102030')
        cy.validateToastAndClose('Bem vindo, Usuário de Teste!')
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
