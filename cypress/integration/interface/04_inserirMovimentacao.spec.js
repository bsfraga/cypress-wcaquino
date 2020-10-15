/// <reference types="cypress"/>

import buildEnv from '../../support/buildEnv'

describe('Testes de Interface: Inserir movimentação', () => {

    before(() => {
        buildEnv()
        cy.visit('https://barrigareact.wcaquino.me/')
        cy.login('conta@teste', 'senha de teste')
        cy.validateToastAndClose('Bem vindo, Conta Teste Mockado!')
    })

    after(() => {
        cy.clearLocalStorage()
    })

    it('Deve inserir uma movimentação no Senhor Barriga WcAquino', () => {
        cy.route({
            method: 'POST',
            url: '/transacoes',
            response: {
                conta_id: 2,
                data_pagamento: "2020-08-04T03:00:00.000Z",
                data_transacao: "2020-08-04T03:00:00.000Z",
                descricao: "Movimentacao Teste Mockado",
                envolvido: "Miro",
                id: 205671,
                observacao: null,
                parcelamento_id: null,
                status: true,
                tipo: "REC",
                transferencia_id: null,
                usuario_id: 1,
                valor: "13123.00"
            }
        })

        cy.accessMovimentationPage()
        cy.route({
            method: 'GET',
            url: '/extrato/**',
            response: 'fixture:movimentacaoSalva.json'
        })
        cy.addPositiveIncome('Movimentacao Teste Mockado', 'Miro', 'Banco')
        cy.validateToastAndClose('Movimentação inserida com sucesso!')

    })
})