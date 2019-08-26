import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Segment } from 'semantic-ui-react';

import Page from '../Page';
import Breadcrumbs from './Breadcrumbs';

export class Products extends Component {
  render = () => {
    return (
      <Page>
        <Segment circular={false} inverted>
          <Breadcrumbs />
        </Segment>
      </Page>
    );
  }
}

const mapStateToProps = state => ({
  categoriesReducer: state.categories,

});

export default connect(mapStateToProps)(Products);
