export const ADD_INGREDIENT = "ADD_INGREDIENT"
export const DELETE_INGREDIENT = "DELETE_ELEM"
export const SORT_ITEMS = "SORT_ITEMS"
export const RESET_INGREDIENT = "RESET_INGREDIENT"
 

export const sortIngredientConstructor = (indredients) => ({
	type: SORT_ITEMS,
	indredients: indredients
});

export const addItem = (ingredient) => ({
	type: ADD_INGREDIENT,
	ingredientsadded: ingredient
});

export const deleteItem = (unicID) => ({
	type: DELETE_INGREDIENT,
	unicID: unicID
}
)

