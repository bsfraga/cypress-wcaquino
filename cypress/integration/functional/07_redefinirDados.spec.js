/// <reference types="cypress"/>

describe('Testes Funcionais: Redefinir dados da Conta de Testes', () => {
    before('Acessar site senhor Barriga', () => {
        cy.visit("http://barrigareact.wcaquino.me")
    })

    it('Acessar conta no Senhor Barriga WCAquino', () => {
        cy.login('usuarioteste@gmail.com', 'Ab102030')
        cy.validateToastAndClose('Bem vindo, Usuário de Teste!')
    })

    it('Redefinir Dados da Conta de Testes', () => {
        cy.resetApp()
    })

    it('Validar se dados da conta de teste foram redefinidos com sucesso', () => {
        cy.isAccountRedefined('Teste movimentação')
    })

    after('Efetuar logout', () => {
        cy.logout()
        cy.validateToastAndClose('Até Logo!')
    })

})