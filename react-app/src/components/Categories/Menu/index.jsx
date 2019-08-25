import React, { Component } from 'react';
import Menu from "@material-ui/core/Menu";
import axios from 'axios';

class CategoriesMenu extends Component {
  componentDidMount() {
    axios.get("http://localhost:8080/categories");
  }

  render = () => (
    <Menu>

    </Menu>
  );
}

export default CategoriesMenu;
