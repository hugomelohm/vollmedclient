Cypress.Commands.add('login', (email, senha) => {
  cy.session(['login', email], () => {
    cy.visit('/login')

    cy.get('[data-test="inputLoginEmail"]').type(email)
    cy.get('[data-test="inputLoginSenha"]').type(senha, { log: false })
    cy.get('[data-test="botaoTeste"]').click()

    // ✅ retry automático até o token existir

    cy.window().should((win) => {
      expect(win.localStorage.getItem('token')).to.exist
    })

  })
})
Cypress.Commands.add('cadastraEspecialista', (
  nome,
  email,
  senha,
  senhaVerificada,
  especialidade,
  crm,
  telefone,
  imagem,
  cep,
  rua,
  numero,
  complemento,
  estado
) => {

  cy.visit('/dashboard')
  cy.contains('Cadastrar especialista').should('be.visible').click()

  // Espera o formulário existir (isso sim é seguro)
  cy.get('[data-test="inputEspecialistaNome"]', { timeout: 10000 })
    .should('be.visible')

  cy.get('[data-test="inputEspecialistaNome"]').type(nome)
  cy.get('[data-test="inputEspecialistaEmail"]').type(email)
  cy.get('[data-test="inputEspecialistaSenha"]').type(senha)
  cy.get('[data-test="inputEspecialistaSenhaVerificada"]').type(senhaVerificada)
  cy.get('[data-test="inputEspecialistaEspecialidade"]').type(especialidade)
  cy.get('[data-test="inputEspecialistaCRM"]').type(crm)
  cy.get('[data-test="inputEspecialistaTel"]').type(telefone)
  cy.get('[data-test="inputEspecialistaImagem"]').type(imagem)
  cy.get('[data-test="inputEspecialistaCEP"]').type(cep)
  cy.get('[data-test="inputEspecialistaRua"]').type(rua)
  cy.get('[data-test="inputEspecialistaNumero"]').type(numero)
  cy.get('[data-test="inputEspecialistaComplemento"]').type(complemento)
  cy.get('[data-test="inputEspecialistaEstado"]').type(estado)

  // ✅ SOLUÇÃO DEFINITIVA
  cy.contains('Cadastrar')
    .scrollIntoView()
    .click({ force: true })
})
Cypress.Commands.add('loginApi', (email, senha) => {
    cy.request({
        method: 'POST',
        url: Cypress.env('api_login'),
        body: {
            email: email,
            senha: senha
        }
    }).then(response => {
        expect(response.status).to.eq(200);
        expect(response.body.auth).to.be.true;
        expect(response.body.rota).to.eq('/clinica');
        expect(response.body.token).to.exist;
        cy.wrap(response.body.token).as('token');
    })
})


// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })