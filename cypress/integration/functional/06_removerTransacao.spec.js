/// <reference types="cypress"/>

describe('Testes Funcionais: Remover transação', () => {
    before('Acessar site senhor Barriga', () => {
        cy.visit("http://barrigareact.wcaquino.me")
    })

    it('Acessar conta no Senhor Barriga WCAquino', () => {
        cy.login('usuarioteste@gmail.com', 'Ab102030')
        cy.validateToastAndClose('Bem vindo, Usuário de Teste!')
    })

    it('Acessar página de extrato no Senhor Barriga WCAquino', () => {
        cy.accessBalancePage()
    })

    it('Remover transação do extrato no Senhor Barriga WCAquino', () => {
        cy.removeTransactionFromBalance('Teste Movimentação')
        cy.validateToastAndClose('Movimentação removida com sucesso!')
    })

    after('Efetuar logout', () => {
        cy.logout()
        cy.validateToastAndClose('Até Logo!')
    })
})