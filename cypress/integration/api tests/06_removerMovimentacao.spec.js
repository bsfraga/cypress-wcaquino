/// <reference types="cypress"/>


describe('Testes de Integração: Remover Movimentação', () => {
    let token

    before('Obter token de acesso', () => {
        cy.getToken('usuarioteste@gmail.com', 'Ab102030')
    })

    beforeEach('Limpar dado da conta', () => {
        cy.resetRest('usuarioteste@gmail.com', 'Ab102030')
    })

    it('Deve remover movimentação do Senhor Barriga WcAquino', () => {
        cy.request({
            method: 'GET',
            url: '/transacoes',
            qs: {
                descricao: 'Movimentacao para exclusao'
            }
        }).then(response => {
            cy.request({
                url: `/transacoes/${response.body[0].id}`,
                method: 'DELETE',
                headers: { Authorization : `JWT ${token}`}
            }).its('status').should('be.equal', 204)
        })
    })
})