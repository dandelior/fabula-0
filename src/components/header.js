import React from 'react';
import '../assets/sass/header.sass'

import { Link } from "react-router-dom";

class Header extends React.Component {
    render() {
        return (
            <>
                <header className={this.props.active}>
                    <Link to="/">
                        FABULA
                    </Link>
                    <p>
                        Aesthetic Playground of @bydandelior
                    </p>
                </header>
            </>
        )
    }
}

export default Header;