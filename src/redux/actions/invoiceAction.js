import * as types from "./actionTypes";
export function createInvoice(invoice) {
    return { type: types.CREATE_INVOICE, invoice };
}

export function loadInvoices(invoices) {
    return { type: types.LOAD_INVOICES, invoices };
}

export function saveInvoice(invoice) {
    return function (dispatch) {
        return dispatch(createInvoice(invoice));
    }
}

export function getInvoices() {
    return function (dispatch) {
        return dispatch(loadInvoices());
    }
}