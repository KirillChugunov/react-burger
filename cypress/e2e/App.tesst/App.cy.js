describe("тестирование главной страницы", () => {

  
  it("Тестирование ссылок", () => {
    cy.visit("http://localhost:3000/")
    cy.get('a').contains("Лента заказов").click()
    cy.location('pathname').should('eq', '/feed')
    cy.go('back')

    cy.get('a').contains("Войти").click()
    cy.location('pathname').should('eq', '/login')
    cy.go('back')

    cy.get('a').contains("Конструктор").click()
    cy.location('pathname').should('eq', '/')
  })


it("Тестирование табов", () => {
  cy.visit("http://localhost:3000/")
  cy.get(".tab").eq(1).click().should('have.class', 'tab_type_current')
  cy.get(".tab").eq(0).click().should('have.class', 'tab_type_current')
  cy.get(".tab").eq(2).click().should('have.class', 'tab_type_current')
}
)
})


