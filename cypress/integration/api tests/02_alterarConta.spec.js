/// <reference types="cypress"/>


describe('Testes de Integração: Alterar Conta', () => {
    let token

    before('Obter token de acesso', () => {
        cy.getToken('usuarioteste@gmail.com', 'Ab102030')
    })

    beforeEach('Limpar dado da conta', () => {
        cy.resetRest('usuarioteste@gmail.com', 'Ab102030')
    })

    it('Deve alterar uma conta no Senhor Barriga WcAquino', () => {
        cy.request({
            method: 'GET',
            url: '/contas',
            qs: {
                nome: 'Conta para alterar'
            }
        }).then(response => {
            cy.request({
                method: 'PUT',
                url: `/contas/${response.body[0].id}`,
                body: {
                    nome: 'conta alterada via cypress'
                }
            }).as('response')
        })
        cy.get('@response').its('status').should('be.equal', 200)
    })
})