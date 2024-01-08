describe('Transações', () => {

    beforeEach(()  => {                                                             // antes de cada teste, visita o site...
        cy.visit("https://devfinance-agilizei.netlify.app/#")
    });

    it('Cadastrar uma entrada', () => {
        criarTransacao("Freelance", 500.00)
        cy.get("tbody tr td.description").should("have.text", "Freelance")          // asserção -- verificar se existe a descrição "Freelance" nos lançamentos
    });

    it('Cadastrar uma saída', () => {
        criarTransacao("Cinema", -50.00)
        cy.get("tbody tr td.description").should("have.text", "Cinema")
    });

    it('Excluir uma transação', () => {                                             // excluir transação
        criarTransacao("Freelance", 100.00)
        criarTransacao("Mesada", 10.00)
        criarTransacao("Cinema", -20.00)

        // cy.contains("td.description", "Freelance")                               // consulta pela descrição
        //     .parent()                                                            // volta para um nível acima (pai)
        //     .find('img')                                                         // procura por determinado componente
        //     .click()                                                             // ação de click

        cy.contains("td.description", "Freelance")
            .siblings()                                                             // verifica todos os irmãos do td.description
            .children('img')                                                        // procura entre os filhos a 'img'
            .click()
        
        cy.get('tbody tr').should('have.length', 2)                                 // asserção para verificar se possui apenas duas linhas de registros
    });
});

function criarTransacao(descricao, valor){

    cy.contains("Nova Transação").click()                                            // comando para realizar um clique
    cy.get('#description').type(descricao)                                           // comando para digitar um texto -- descrição
    cy.get('#amount').type(valor)                                                    // comando para digitar o valor
    cy.get('#date').type("2023-12-10")                                               // comando para digitar data yyyy-mm-dd
    cy.contains('button', "Salvar").click()
}