import React from "react";
import { Link } from 'react-router-dom';
import logo from '../../assets/img/logo.png';

export const Cabecalho = () => {
    
    return(
        <header className="cabecalhoPrincipal">
            <div className="container">
                <Link to="/">
                    <img src={logo} alt="Logo da Usuario" />{' '}
                </Link>
                <Link to="/usuario">
                    <nav className="cabecalhoPrincipal-nav">Usuário</nav>
                </Link>
                <Link to="/patrimonio">
                    <nav className="cabecalhoPrincipal-nav">Patrimônio</nav>
                </Link>
            </div>
        </header>
    )
}

export default Cabecalho;