const tab = ".tab";
const tab_current = "tab_type_current";
const burgerIngredientsContainter =
  "[class^=BurgerIngredients_inglist__container]";
const burgerConstructorContainer =
  "[class^=BurgerConstructor_BurgerIngredients__container]";
const closeIconContainer = '[class^="modal_closeIconContainer"]';
const button = "button";

describe("тестирование главной страницы", () => {
  it("Тестирование табов", () => {
    cy.visit("/");
    cy.get(tab).eq(1).click().should("have.class", tab_current);
    cy.get(tab).eq(0).click().should("have.class", tab_current);
    cy.get(tab).eq(2).click().should("have.class", tab_current);
  });

  it("Тестирование ссылок", () => {
    cy.visit("/");
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
    cy.visit("/");
    cy.get(burgerIngredientsContainter).eq(1).click();
    cy.get(closeIconContainer).should("exist");
    cy.get(closeIconContainer).children().click();
    cy.get(closeIconContainer).should("not.exist");
    cy.get(burgerIngredientsContainter).eq(1).click();
    cy.get("body").type("{esc}");
    cy.get(closeIconContainer).should("not.exist");
  });

  it("Тестирование DnD", () => {
    cy.visit("/");
    cy.get(burgerIngredientsContainter).eq(1).trigger("dragstart");
    cy.get(burgerConstructorContainer).trigger("drop");
    cy.get(burgerIngredientsContainter).eq(5).trigger("dragstart");
    cy.get(burgerConstructorContainer).trigger("drop");
    cy.get(burgerIngredientsContainter).eq(7).trigger("dragstart");
    cy.get(burgerConstructorContainer).trigger("drop");
    cy.get(button).contains("Оформить заказ").click();
    cy.location("pathname").should("eq", "/login");
    cy.get('input[name="email"]')
      .type("14lightmain@gmail.com")
      .should("have.value", "14lightmain@gmail.com");
    cy.get('input[name="password"]')
      .type("28051488iI.")
      .should("have.value", "28051488iI.");
    cy.get(button).contains("Войти").click();
    cy.get(button).contains("Оформить заказ").click();
    cy.get(closeIconContainer).should("exist");
    cy.get(closeIconContainer).children().click();
  });
});
