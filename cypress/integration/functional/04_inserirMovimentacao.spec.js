/// <reference types="cypress"/>

describe('Testes Funcionais: Inserir Movimentação', () => {
    before('Acessar site senhor Barriga', () => {
        cy.visit("http://barrigareact.wcaquino.me")
    })

    it('Acessar conta no Senhor Barriga WCAquino', () => {
        cy.login('usuarioteste@gmail.com', 'Ab102030')
        cy.validateToastAndClose('Bem vindo, Usuário de Teste!')
    })

    it('Acessar página de Movimentação no Senhor Barriga WcAquino', () => {
        cy.accessMovimentationPage()
    })

    it('Adicionar movimentação do tipo Receita no Senhor Barriga WcAquino', () => {
        cy.addPositiveIncome('Teste Movimentação', 'Testando Interessado da Movimentação', 'Conta para movimentacoes')
        cy.closeToast()
    })

    it('Acessar página de Movimentação no Senhor Barriga WcAquino', () => {
        cy.accessMovimentationPage()
    })

    it('Adicionar movimentação do tipo Despesa no Senhor Barriga WcAquino', () => {
        cy.addNegativeIncome('Teste Movimentação', 'Testando Interessado da Movimentação', 'Conta para movimentacoes')
    })

    after('Efetuar logout', () => {
        cy.logout()
        cy.validateToastAndClose('Até Logo!')
    })

})