describe("тестирование главной страницы", () => {
  it("Тестирование табов", () => {
    cy.visit("http://localhost:3000/");
    cy.get(".tab").eq(1).click().should("have.class", "tab_type_current");
    cy.get(".tab").eq(0).click().should("have.class", "tab_type_current");
    cy.get(".tab").eq(2).click().should("have.class", "tab_type_current");
  });

  it("Тестирование ссылок", () => {
    cy.visit("http://localhost:3000/");
    cy.get("a").contains("Лента заказов").click();
    cy.location("pathname").should("eq", "/feed");
    cy.go("back");

    cy.get("a").contains("Войти").click();
    cy.location("pathname").should("eq", "/login");
    cy.go("back");

    cy.get("a").contains("Конструктор").click();
    cy.location("pathname").should("eq", "/");
  });

  it("Тестирование модального окна", () => {
    cy.visit("http://localhost:3000/");
    cy.get(".BurgerIngredients_inglist__container__4TgFm").eq(1).click();
    cy.get(".modal_closeIconContainer__r1DOr").should("exist");
    cy.get(".modal_closeIconContainer__r1DOr").children().click();
    cy.get(".modal_closeIconContainer__r1DOr").should("not.exist");
    cy.get(".BurgerIngredients_inglist__container__4TgFm").eq(1).click();
    cy.get(".modal_closeIconContainer__r1DOr").should("exist");
    cy.get("body").type("{esc}");
    cy.get(".modal_closeIconContainer__r1DOr").should("not.exist");
  });

  it("Тестирование DnD", () => {
    cy.visit("http://localhost:3000/");
    cy.get(".BurgerIngredients_inglist__container__4TgFm")
      .eq(1)
      .trigger("dragstart");
    cy.get(".BurgerConstructor_BurgerIngredients__container__x8q0f").trigger(
      "drop"
    );
    cy.get(".BurgerIngredients_inglist__container__4TgFm")
      .eq(5)
      .trigger("dragstart");
    cy.get(".BurgerConstructor_BurgerIngredients__container__x8q0f").trigger(
      "drop"
    );
    cy.get(".BurgerIngredients_inglist__container__4TgFm")
      .eq(7)
      .trigger("dragstart");
    cy.get(".BurgerConstructor_BurgerIngredients__container__x8q0f").trigger(
      "drop"
    );
    cy.get("button").contains("Оформить заказ").click()
    cy.location("pathname").should("eq", "/login");
    cy.get('input[name="email"]').type("14lightmain@gmail.com").should('have.value','14lightmain@gmail.com')
    cy.get('input[name="password"]').type("28051488iI.").should('have.value','28051488iI.')
    cy.get("button").contains("Войти").click()
    cy.get("button").contains("Оформить заказ").click()
    cy.get(".modal_closeIconContainer__r1DOr").should("exist");
    cy.get(".modal_closeIconContainer__r1DOr").children().click();
})
  });
