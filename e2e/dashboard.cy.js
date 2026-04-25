describe('Usuário logado na página de dashboard', () => {
    beforeEach(() => {
        cy.fixture('especialistas.json').as('especialistas')
        cy.login(Cypress.env('email'), Cypress.env('senha'))
    })


    context('Redirecionamento na página de dashboard', () => {
        it('Verifica página de redirecionamento no login com sucesso', () => {
            cy.visit('/dashboard')
            cy.url().should('eq', 'http://localhost:3000/dashboard')
        })

        it('Com o usuário logado, cadastra um especialista', () => {
            cy.visit('/dashboard')
            cy.url().should('eq', 'http://localhost:3000/dashboard')
            cy.contains('Cadastrar especialista').should('be.visible').click()
        })
    })

    context('Modal de cadastro de especialista', () => {
        it('Verifica se o checkbox "Atende por plano?" está desmarcado', () => {
            cy.visit('/dashboard')
            cy.contains('Cadastrar especialista').should('be.visible').click()
            cy.get('[type="checkbox"]').should('have.attr', 'aria-label', 'Atende por plano?').and('not.be.checked')
        })
        it('Seleciona o botão checkbox "Atende por plano?" para visualizar os planos de saúde', () => {
            cy.visit('/dashboard')
            cy.contains('Cadastrar especialista').should('be.visible').click()
            cy.get('[type="checkbox"]').check()
            cy.get('form').find('input[type="checkbox"]').should('be.checked').and('not.be.disabled')
            cy.get('[type="checkbox"]').check(['Sulamerica', 'Unimed', 'Bradesco'])
        })

        it.only('Seleciona o botão checkbox "Atende por plano?" após preenchimento do formulário para visualizar os planos de saúde', () => {
            cy.get('@especialistas').then((dados) => {

                cy.get('@especialistas').then((dados) => {
                    const especialista = dados.especialistas[0]

                    cy.cadastraEspecialista(
                        especialista.nome,
                        especialista.email,
                        especialista.senha,
                        especialista.senhaVerificada,
                        especialista.especialidade,
                        especialista.crm,
                        especialista.telefone,
                        especialista.imagem,
                        especialista.cep,
                        especialista.rua,
                        especialista.numero,
                        especialista.complemento,
                        especialista.estado
                    )

                    // ✅ Clica no switch (Material UI)
                    cy.get('input[aria-label="Atende por plano?"]')
                        .closest('input')
                        .click()

                    // ✅ Valida que o switch ficou ativo
                    cy.get('input[type="checkbox"]').first().should('be.checked')

                    // ✅ Seleciona os planos pelo texto
                    cy.get('.MuiFormGroup-root').within(() => {
                        cy.contains('Sulamerica').click()
                        cy.contains('Unimed').click()
                        cy.contains('Bradesco').click()
                    })

                    // ✅ Valida visibilidade

                    cy.get('.MuiFormGroup-root').within(() => {
                        cy.contains('Sulamerica').find('input').should('be.checked')
                        cy.contains('Unimed').find('input').should('be.checked')
                        cy.contains('Bradesco').find('input').should('be.checked')
                    })

                })

            })
        })
    })
})