import { combineReducers } from 'redux';
import invoices from './invoiceReducer';

const rootReducer = combineReducers({
    invoices
});

export default rootReducer;