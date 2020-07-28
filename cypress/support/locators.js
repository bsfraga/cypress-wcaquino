const locators = {
    LOGIN : {
        EMAIL : '[data-test=email]',
        SENHA : '[data-test=passwd]',
        BTN_ENTRAR : '.btn'
    },
    INICIO : {

    },
    MENU_SUPERIOR:{
        HOME : '[data-test=menu-home]',
        MOVIMENTACAO : '[data-test=menu-movimentacao]',
        EXTRATO : '[data-test=menu-extrato]',
        SETTINGS : '[data-test=menu-settings]',
        CONTAS: '[href="/contas"]',
        SAIR: '[href="/logout"]'
    },
    MOVIMENTACAO:{
        RECEITA : '[data-test=tipo-receita]',
        DESPESA : '[data-test=tipo-despesa]',
        DATA_TRANSACAO : '[data-test=data-transacao]',
        DATA_PAGAMENTO : '[data-test=data-pagamento]',
        DESCRICAO : '[data-test=descricao]',
        VALOR : '[data-test=valor]',
        INTERESSADO : '[data-test=envolvido]',
        CONTA : '[data-test=conta]',
        STATUS : '[data-test=status]',
        BTN_SALVAR : '.btn-primary',
    },
    EXTRATO:{
        XP_VALOR_TRANSACAO : '//small[contains(., "R$")]'
    },
    CONTAS : {
        CONTA : '[data-test=nome]',
        BTN_SALVAR : '.btn',
        TABELA_CONTAS : '.table',
        XP_TEST_ACC : '//td[contains(., "baeludo alterada")]',
        EDITAR : '.fa-edit',
        EXCLUIR : '.fa-trash-alt',
    },
    MENSAGEM:{
        TEXTO : '.toast-message',
        FECHAR : ''
    }
}

export default locators