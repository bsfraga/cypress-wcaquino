const buildEnv = () => {

    cy.server()
    cy.route({
        method: 'POST',
        url: '/signin',
        response: {
            id: 1000,
            nome: "Conta Teste Mockado",
            token: "UMA STRING MUITO LONGA QUE É UTILIZADA PARA GERENCIAR AS SESSÕES, PERMISSÕES E OUTRAS COISAS BEM CHATAS QUE TEM POR AI"
        }
    }).as('signin')


    cy.route({
        method: 'GET',
        url: '/saldo',
        response: [{
            conta_id: 999,
            conta: 'Carteira',
            saldo: '100.00'
        },
        {
            conta_id: 99909,
            conta: 'Banco',
            saldo: '100000000.00'
        }]
    }).as('saldo')

    cy.route({
        method: 'GET',
        url: '/contas',
        response: [{
            id: 1,
            nome: "Carteira",
            visivel: true,
            usuario_id: 1
        },
        {
            id: 2,
            nome: "Banco",
            visivel: true,
            usuario_id: 1
        }]
    }).as('contas')

    cy.route({
        method: 'GET',
        url: '/extrato/**',
        response: 
        [{"conta":"Carteira","id":205751,"descricao":"Movimentacao para exclusao","envolvido":"AAA","observacao":null,"tipo":"DESP","data_transacao":"2020-08-04T03:00:00.000Z","data_pagamento":"2020-08-04T03:00:00.000Z","valor":"-1500.00","status":true,"conta_id":230052,"usuario_id":10466,"transferencia_id":null,"parcelamento_id":null},
        {"conta":"Banco","id":205756,"descricao":"Movimentacao para extrato","envolvido":"FFF","observacao":null,"tipo":"DESP","data_transacao":"2020-08-04T03:00:00.000Z","data_pagamento":"2020-08-04T03:00:00.000Z","valor":"-220.00","status":true,"conta_id":230055,"usuario_id":10466,"transferencia_id":null,"parcelamento_id":null},
        {"conta":"Banco","id":205756,"descricao":"Movimentação Teste Mockado","envolvido":"Miro","observacao":null,"tipo":"REC","data_transacao":"2020-08-04T03:00:00.000Z","data_pagamento":"2020-08-04T03:00:00.000Z","valor":"13123.00","status":true,"conta_id":230055,"usuario_id":10466,"transferencia_id":null,"parcelamento_id":null}]
    })


}


export default buildEnv