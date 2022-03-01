import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import {withTranslation} from 'react-i18next';
import {connect} from "react-redux";
import ApiConnection from '../Core/Invoices/ApiConnection';
import {saveInvoice} from "../redux/actions/invoiceAction";
import {newInvoice} from "../../tools/mockData";
import "./NewInvoice.scss";

const api = new ApiConnection();

/**
 * NewInvoice
 * @description Form for creating the new invoices
 * @param saveInvoice
 * @param history
 * @return {JSX.Element}
 * @constructor
 */
function NewInvoice({t, saveInvoice, history}){
    const [rates, setRates] = useState([]);
    const [formValues, setFormValues] = useState([{...newInvoice}]);
    const [total, setTotal] = useState(0);

    async function fetchData() {
        const response = await api.getCurrencies();
        setRates(Object.keys(response));
    }

    useEffect(() => {
        fetchData();
    }, []);

    const getTotal = (formValues) => {
        const totalValues = formValues.map(row => row.totalInUSD);
        return totalValues.reduce((acc, curr) => Number(acc) + Number(curr), 0).toFixed(2);
    }

    useEffect(() => {
        setTotal(getTotal(formValues));
    }, [formValues]);

    const handleChange = (i, e) => {
        const {name, value} = e.target
        let newFormValues = [...formValues];
        newFormValues[i][name] = value;
        if (name === "currency") {
            const amountInCurrency = newFormValues[i].amount;
            const rateValue = api.getRates()[value];
            newFormValues[i].totalInUSD = amountInCurrency * api.getDollarCurrency() / rateValue;
        }
        setFormValues(newFormValues);
    }

    const getRandomIdNumber = () => Math.floor(Math.random() * (9999 - 1111)) + 1111;

    const handleSave = (event) => {
        event.preventDefault();
        const invoiceData = {
            id: getRandomIdNumber(),
            total,
            elements: formValues
        }
        saveInvoice(invoiceData);
        history.push("/");
    }

    const addFormFields = () => {
        setFormValues([...formValues, {...newInvoice}])
    }

    const removeFormFields = (i) => {
        let newFormValues = [...formValues];
        newFormValues.splice(i, 1);
        setFormValues(newFormValues)
    }

    return(
        <>
            <div className="top-invoice">
                <h2 className="top-invoice__title">{t('CREATE_A_NEW_INVOICE')}</h2>
                <button className="btn btn-info" type="button" onClick={() => addFormFields()}>{t('ADD_A_NEW_ENTITY')}</button>
            </div>
            <form onSubmit={handleSave}>
            <div className="table-responsive">
                <table className="table">
                <thead>
                    <tr>
                        <th scope="col">{t('DESCRIPTION')}</th>
                        <th scope="col">{t('AMOUNT')}</th>
                        <th scope="col">{t('CURRENCY')}</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        formValues.map((element, index) => {
                            return (
                                <tr key={index}>
                                    <td>
                                        <label htmlFor="description">{t('DESCRIPTION')}</label>
                                        <input
                                            type="text"
                                            name="description"
                                            onChange={e => handleChange(index, e)}
                                            value={element.description}
                                            className="form-control"
                                            required="required"
                                        />
                                    </td>
                                    <td>
                                        <label htmlFor="amount">{t('AMOUNT')}</label>
                                        <input
                                            type="number"
                                            name="amount"
                                            onChange={e => handleChange(index, e)}
                                            value={element.amount}
                                            className="form-control"
                                            min="0"
                                            required="required"
                                        />
                                    </td>
                                    <td>
                                        <label htmlFor="currency">{t('CURRENCY')}</label>
                                        <select
                                            name="currency"
                                            onChange={e => handleChange(index, e)}
                                            value={element.currency}
                                            className="form-control"
                                            required="required"
                                        >
                                            <option value="">{t('SELECT_A_CURRENCY')}</option>
                                            {rates.map(option => {
                                                return (
                                                    <option key={option} value={option}>
                                                        {option}
                                                    </option>
                                                );
                                            })}
                                        </select>
                                    </td>
                                    <td className="text-center align-middle">
                                        {
                                            index ? (<button type="button"
                                                             className="btn btn-danger"
                                                             onClick={() => removeFormFields(index)}>
                                                {t('REMOVE')}</button>) : null
                                        }
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
                <tfoot>
                    <tr>
                        <th colSpan="3" className="text-end">{t('TOTAL_IN_USD')}: {total}</th>
                        <td></td>
                    </tr>
                </tfoot>
            </table>
            </div>
            <button type="submit" className="btn btn-primary">
                {t('CREATE_A_NEW_INVOICE')}
            </button>
        </form>
        </>
    );
}

NewInvoice.propTypes = {
    t: PropTypes.func,
    saveInvoice: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
};

NewInvoice.defaultProps = {
    t: () => {},
};

function mapStateToProps({invoice}) {
    return {
        invoice,
    };
}

const mapDispatchToProps = {
    saveInvoice
};


export default withTranslation()(connect(mapStateToProps, mapDispatchToProps)(NewInvoice));