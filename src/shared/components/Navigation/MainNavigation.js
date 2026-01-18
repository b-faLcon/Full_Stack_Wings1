import { useState } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

import './MainNavigation.css';
import MainHeader from './MainHeader';
import NavLinks from './NavLinks';
import SideDrawer from './SideDrawer';
import Backdrop from '../UIElements/Backdrop';

export default function MainNavigation() {
    const [drawerIsOpen, setDraweIsOpen] = useState(false);
    const openDrawer = () => {
        setDraweIsOpen(true);
    }

    const closeDrawer = () => {
        setDraweIsOpen(false);
    }
    return (
        <>
            {drawerIsOpen && <Backdrop onClick={closeDrawer}/>}
            <SideDrawer show={drawerIsOpen} onClick={closeDrawer}>
                <nav className="main-navigation__drawer-nav">
                    <NavLinks />
                </nav>
            </SideDrawer>
            <MainHeader>
                <button className='main-navigation__menu-btn' onClick={openDrawer}>
                    <span />
                    <span />
                    <span />
                </button>
                <h1 className="main-navigation__title">
                    <Link to="/">YourPlaces</Link>
                </h1>
                <nav className="main-navigation__header-nav">
                    <NavLinks />
                </nav>
            </MainHeader>
        </>
    );
}
