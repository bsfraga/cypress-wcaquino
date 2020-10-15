/// <reference types="cypress"/>

describe('Testes Funcionais: Inserir Conta', () => {
    before('Acessar site senhor Barriga', () => {
        cy.visit("http://barrigareact.wcaquino.me")
    })

    it('Acessar conta no Senhor Barriga WCAquino', () => {
        cy.login('usuarioteste@gmail.com', 'Ab102030')
        cy.validateToastAndClose('Bem vindo, Usuário de Teste!')
    })

    it('Acessar página de Contas do Senhor Barriga WCAquino', () => {
        cy.accessAccountPage()
    })

    it('Criar conta no Senhor Barriga WCAquina', () => {
        cy.createAccount('conta do baeludo')
    })

    after('Efetuar logout', () => {
        cy.logout()
        cy.validateToastAndClose('Até Logo!')
    })

})