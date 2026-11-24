import { Link, NavLink } from 'react-router-dom'
import logo from '../assets/logoElCantaro.png'
import { useState, useEffect } from 'react';
import { FaMoon } from 'react-icons/fa'
import { FaSun } from 'react-icons/fa'

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const [isDarkMode, setIsDarkMode] = useState(() => {
        return localStorage.getItem('theme') === 'dark';
    });

    useEffect(() => {
        const theme = isDarkMode ? 'dark' : 'light';

        document.documentElement.dataset.theme = theme;
        localStorage.setItem('theme', theme);
    }, [isDarkMode]);

    const toggleDarkMode = () => {
        setIsDarkMode(prevMode => !prevMode);
    };

    // Continúa tu return
    return (
        <header className="site-header">
            <div className="header-container">
                <div className="logo-container">
                    <Link
                        to="/"
                        className="header-brand"
                        onClick={() => setMenuOpen(false)}
                    >
                        <img
                            src={logo}
                            alt="Logo de El Cántaro"
                            className="header-logo"
                        />
                    </Link>
                </div>

                <button
                    type="button"
                    className="menu-toggle"
                    onClick={() => setMenuOpen((previous) => !previous)}
                    aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
                    aria-expanded={menuOpen}
                    aria-controls="header-navigation"
                >
                    <span aria-hidden="true">
                        {menuOpen ? "✕" : "☰"}
                    </span>
                </button>

                <nav
                    id="header-navigation"
                    className={`header-nav ${menuOpen ? "is-open" : ""}`}
                    aria-label="Navegación principal"
                >
                    <div className="header-links">
                        <NavLink
                            to="/"
                            end
                            className="header-link"
                            onClick={() => setMenuOpen(false)}
                        >
                            Inicio
                        </NavLink>

                        <NavLink
                            to="/bungalows"
                            className="header-link"
                            onClick={() => setMenuOpen(false)}
                        >
                            Bungalows
                        </NavLink>
                        <NavLink
                            to="/nosotros"
                            className="header-link"
                            onClick={() => setMenuOpen(false)}
                        >
                            Nosotros
                        </NavLink>


                        <NavLink
                            to="/contacto"
                            className="header-link"
                            onClick={() => setMenuOpen(false)}
                        >
                            Contacto
                        </NavLink>
                    </div>
                    <div className='switch-container'>
                        <button
                            type="button"
                            className="switch"
                            onClick={toggleDarkMode}
                            aria-label="Modo oscuro"
                            aria-pressed={isDarkMode}
                        >
                            {isDarkMode ? <FaSun /> : <FaMoon />}
                        </button>
                    </div>
                </nav>
            </div>
        </header >
    );
};

export { Header };
