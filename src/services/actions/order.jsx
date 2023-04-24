export const GET_IDS = "GET_IDS"
export const GET_ORDER = "GET_ORDER"
export const GET_ORDER_FAILED = "GET_ORDER_FAILED"
export const GET_ORDER_SUCCESS = "GET_ORDER_SUCCESS"


export const getIDsArray = (IDs) => ({
	type: GET_IDS,
	idsArr: IDs
}
)


