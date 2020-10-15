/// <reference types="cypress"/>


describe('Testes de Integração: Inserir Conta Repetida', () => {
    let token

    before('Obter token de acesso', () => {
        cy.getToken('usuarioteste@gmail.com', 'Ab102030')
    })

    beforeEach('Limpar dado da conta', () => {
        cy.resetRest('usuarioteste@gmail.com', 'Ab102030')
    })

    it('Deve inserir conta repetida no Senhor Barriga WcAquino', () => {
        cy.request({
            method: 'POST',
            url: '/contas',
            body: {
                nome: 'Conta mesmo nome'
            },
            failOnStatusCode: false
        }).as('response')

        cy.get('@response').then(response => {
            expect(response.status).to.be.equal(400)
            expect(response.body).to.have.property('error', 'Já existe uma conta com esse nome!')
        })
    })
})