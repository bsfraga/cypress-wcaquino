/// <reference types="cypress"/>

import locator from '../support/locators'

describe('Calcular saldo da Conta no Senhor Barriga WCAquino', () => {
    before(() => {
        cy.visit("http://barrigareact.wcaquino.me")
    })

    let total = 0;

    it('Acessar conta no Senhor Barriga WCAquino', () => {
        cy.get(locator.LOGIN.EMAIL).type('usuarioteste@gmail.com')
        cy.get(locator.LOGIN.SENHA).type('Ab102030')
        cy.get(locator.LOGIN.BTN_ENTRAR).click()
        cy.get(locator.MENSAGEM.TEXTO).should('contain', 'Bem vindo, Usuário de Teste!')
        cy.closeToast()
    })

    it('Acessar página de Extratos no Senhor Barrica WcAquino', () => {
        cy.get(locator.MENU_SUPERIOR.EXTRATO).click()
        cy.url().should('contain', '/extrato')

    })

    it('Calcular valor das transações contidas no Extrato', () => {

        let total
        // TODO: criar locator dinamico utiliando FN_XP_LOCATOR locator = () => { locator com contains/indices dinâmicos}
        cy.xpath(locator.EXTRATO.XP_VALOR_TRANSACAO).each(($element, index, $list) => {
            $element.text().trim().replace('R$', '')
            const a = cy.wrap($element).invoke('replace("R$","")')
            console.log(a)
            if (cy.wrap($element).contains('-')) {
                total -= parseFloat($element.val())
            } else {
                total += parseFloat($element.val())
            }

        })
        console.log(total)
        // console.log(content)
        // console.log(content.trim().replace('R$', ''))
    })

    //     console.log(cy.xpath(locator.EXTRATO.XP_VALOR_TRANSACAO).then(teste => {
    //         let values;
    //         values = cy.wrap(teste).each(content => {
    //             console.log(content.text().replace('R$', ''))
    //             const newLocal = content.text().replace('R$', '');
    //             values.push(newLocal)
    //         })
    //         return values;
    //     }))

})
