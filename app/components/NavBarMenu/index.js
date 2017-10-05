/**
*
* NavBarMenu
*
*/

import React from 'react';
import { removeToken, loggedIn, loggedOut } from 'containers/Viewer/lib';
import { createAndShow } from 'containers/Login/lib';
import { Link } from 'react-router';

// import styled from 'styled-components';


class NavBarMenu extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    if (loggedIn()) {
      return (
        <ul className="nav navbar-nav">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/hint/add">Hint toevoegen</Link></li>
          <li><Link to="/hint/list">Lijst</Link></li>
          <li><Link to="/about">Over</Link></li>
        </ul>
      );
    } else {
      return (
        <ul className="nav navbar-nav">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">Over</Link></li>
        </ul>
      );
    }
  }
}

NavBarMenu.propTypes = {

};

export default NavBarMenu;
