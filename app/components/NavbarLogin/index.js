/**
*
* NavbarLogin
*
*/

import React from 'react';
import Cookies from 'js-cookie';
// import styled from 'styled-components';
class NavbarLogin extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const user = !undefined(Cookies.get('sbUser'));
    if (!user) {
      return (
        <ul className="nav navbar-nav navbar-right">
          <li className="pull-right"><a onClick={() => loginWithRedirect()}>Login <i className="fa fa-lock" /></a></li>
        </ul>
      );
    }
    return (
      <ul className="nav navbar-nav navbar-right">
        <li className="pull-right"><a onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>Logout <i className="fa fa-lock" /></a></li>
      </ul>
    );
  }
}

export default NavbarLogin;
