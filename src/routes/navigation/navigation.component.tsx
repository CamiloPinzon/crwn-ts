import { useContext } from "react";
import { Link, Outlet } from "react-router-dom";

import { GlobalUserContext } from "../../context/user.context";

import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';
import './navigation.styles.scss';

const Navigation = () => {
  const {currentUser} = useContext(GlobalUserContext);
  return (
    <>
      <div className="navigation">
        <Link className="logo-container" to="/">
        <CrwnLogo className="logo" />
        </Link>
        <div className="nav-links-container">
          <Link className="nav-link" to="/shop">
            SHOP
          </Link>
          <Link className="nav-link" to="/auth">
            {!currentUser ? 'SIGN IN' : 'SIGN OUT'}
          </Link>
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default Navigation;
