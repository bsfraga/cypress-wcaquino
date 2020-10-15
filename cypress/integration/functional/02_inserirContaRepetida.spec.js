/// <reference types="cypress"/>

describe('Testes Funcionais: Inserir Conta Repetida', () => {
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

    it('Adicionar conta já existnte no Senhor Barriga WcAquino', () => {
        cy.createAccountThatAlreadyExists('Conta mesmo nome')
        cy.validateToastAndClose('Erro')
    })

    after('Efetuar logout', () => {
        cy.logout()
        cy.validateToastAndClose('Até Logo!')
    })

})