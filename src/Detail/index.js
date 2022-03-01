import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {getInvoices} from "../redux/actions/invoiceAction";
import {Link} from "react-router-dom";
import {withTranslation} from "react-i18next";

/**
 * Detail
 * @description Detail component
 * @param invoice
 * @return {JSX.Element}
 * @constructor
 */
function Detail({ t, invoice}){
    return (
        <>
            <h2>{t('DETAIL_OF_INVOICE')}</h2>
            {invoice ? (
                <div className="table-responsive">
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col" colSpan="3" className="text-left">{t('INVOICE_ID')}: {invoice.id}</th>
                            </tr>
                            <tr>
                                <th scope="col">{t('DESCRIPTION')}</th>
                                <th scope="col">{t('AMOUNT')}</th>
                                <th scope="col">{t('CURRENCY')}</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            invoice.elements.map(el => {
                                return (
                                    <tr key={el.description}>
                                        <td>{el.description}</td>
                                        <td>{el.amount}</td>
                                        <td>{el.currency}</td>
                                    </tr>
                                );
                            })
                        }
                        </tbody>
                        <tfoot>
                            <tr>
                                <th colSpan="2" className="text-end">{t('TOTAL_IN_USD')}: {invoice.total}</th>
                                <td></td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            ) :
                <>
                    <div className="alert alert-warning" role="alert">
                        {t('DETAILS_NOT_FOUND')} <Link to={"/"} className="alert-lin">{t('GO_BACK_TO_LIST')}</Link>
                    </div>
                </>
            }
        </>
    );
}

Detail.propTypes = {
    invoice: PropTypes.object,
    t: PropTypes.func,
}

Detail.defaultProps = {
    t: () => {},
};

function getInvoiceById(invoices, id) {
    return invoices.find((invoice) => invoice.id === parseInt(id, 10)) || null;
}

function mapStateToProps(state, ownProps) {
    const id = ownProps.match.params.id;
    const invoice =
        id && state.invoices.length > 0
            ? getInvoiceById(state.invoices, id)
            : null;

    return {
        invoice,
    };
}

const mapDispatchToProps = {
    getInvoices,
};

export default withTranslation()(connect(mapStateToProps, mapDispatchToProps)(Detail));