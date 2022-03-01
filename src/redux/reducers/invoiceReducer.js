import * as types from "./../actions/actionTypes"
import initialState from "./initialState";

export default function invoiceReducer(state = initialState.invoices, action) {
    switch (action.type) {
        case types.CREATE_INVOICE:
            return [...state, { ...action.invoice }];
        case types.LOAD_INVOICES:
            return action.invoices;
        default:
            return state;
    }
}