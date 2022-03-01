import React from "react";
import { Link } from "react-router-dom";
import "./Header.scss";
import PropTypes from "prop-types";
import {withTranslation} from "react-i18next";

/**
 * Header
 * @description Header component
 * @param t
 * @return {JSX.Element}
 * @constructor
 */
function Header({t}){

    const handleClick = () => {
        const navBar = document.getElementById("navbarNavAltMarkup");
        navBar.classList.toggle('navbar--toggle');
    }

    return (
        <header>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <Link to="/" className="navbar-brand">
                        {t('VIA')}
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup"
                            aria-expanded="false" aria-label="Toggle navigation" onClick={handleClick}>
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav">
                            <Link to="/" exact className="nav-link">
                                {t('LIST_OF_INVOICES')}
                            </Link>
                            <Link to="/create-a-new-invoice" className="nav-link">
                                {t('CREATE_A_NEW_INVOICE')}
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
}

Header.propTypes = {
    t: PropTypes.func,
};

Header.defaultProps = {
    t: () => {},
};

export default withTranslation()(Header);