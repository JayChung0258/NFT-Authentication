import { Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";
import React, { Component } from "react";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: "home",
    };
  }
  render() {
    return (
      <Menu>
        <Menu.Item as={Link} to="/dashboard">
          NFT Authetication
        </Menu.Item>
        <Menu.Menu position="right">
          <Menu.Item as={Link} to="/login">
            Register/Singin
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    );
  }
}

export default Header;
