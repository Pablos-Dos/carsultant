// frontend/src/App.js

import React from "react";

const CustomLayout = (props) => {
    return (
        <html className="layout">
        <header className="header">
            <div className="logo"/>
            <div className="header-edit">
                {/*Navigation*/}
                <nav className="navbar navbar-light bg-light">
                    <span className="navbar-brand mb-0 h1">Veranstaltungskalender</span>
                </nav>
                {/*Navigation*/}
            </div>
        </header>

        {/*Dynamic Content*/}
        <body>
        <div>
            {props.children}
        </div>
        </body>
        {/*Dynamic Content*/}

        {/*Footer*/}
        <footer>
            <div className="footer-copyright text-center py-3">© Carsultant 2020
                <a href="https://carsultant.de"> Carsultant.de</a>
            </div>
        </footer>
        {/*Footer*/}
        </html>
    );
};

export default CustomLayout;