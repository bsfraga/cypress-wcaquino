/// <reference types="cypress"/>


describe('Testes de Integração: Inserir Conta', () => {
    let token

    before('Obter token de acesso', () => {
        cy.getToken('usuarioteste@gmail.com', 'Ab102030')
    })

    beforeEach('Limpar dado da conta', () => {
        cy.resetRest('usuarioteste@gmail.com', 'Ab102030')
    })

    it('Deve inserir uma conta no Senhor Barriga WcAquino', () => {
        cy.request({
            method: 'POST',
            url: 'https://barrigarest.wcaquino.me/contas',
            headers: {
                Authorization: `JWT ${token}`
            },
            body: {
                nome: 'conta criada pelo cypress request'
            }
        }).as('response')

        cy.get('@response').then(res => {
            expect(res.status).to.be.equal(201)
            expect(res.body).to.have.property('id')
            expect(res.body).to.have.property('nome', 'conta criada pelo cypress request')
        })
    })
})