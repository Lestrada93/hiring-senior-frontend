import React from "react";
import PropTypes from "prop-types";
import { withTranslation } from 'react-i18next';
import { connect } from "react-redux";
import {getInvoices} from "../redux/actions/invoiceAction";
import { Link } from "react-router-dom";

/**
 * ListOfInvoices
 * @description Display the list of invoices
 * @param t
 * @param invoices
 * @return {JSX.Element}
 * @constructor
 */
function ListOfInvoices({t, invoices}){
    return (
        <>
            <h2>{t('LIST_OF_INVOICES')}</h2>
            <ol className="list-group list-group-numbered">
                {invoices.map(invoice => {
                    return (
                    <Link to={`/invoice/${invoice.id}`} key={invoice.id} className="list-group-item d-flex justify-content-between align-items-start">
                        <div className="ms-2 me-auto">
                            <div className="fw-bold">{t('ID')}: {invoice.id}</div>
                            <strong>{t('TOTAL_IN_USD')}:</strong> {invoice.total}
                        </div>
                        <span className="badge bg-primary rounded-pill">{invoice.elements.length}</span>
                    </Link>
                    )
                })}

            </ol>
        </>
    );
}

ListOfInvoices.propTypes = {
    invoices: PropTypes.array.isRequired,
    t: PropTypes.func,
};

ListOfInvoices.defaultProps = {
    t: () => {},
};

function mapStateToProps({invoices}) {
    return {
        invoices,
    };
}

const mapDispatchToProps = {
    getInvoices
};

export default withTranslation()(connect(mapStateToProps, mapDispatchToProps)(ListOfInvoices));