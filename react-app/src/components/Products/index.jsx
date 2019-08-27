import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Pagination, Segment } from 'semantic-ui-react';
import _ from 'lodash';
import { withRouter } from 'react-router-dom';

import { productsRetrieveAction } from '../../store/products/actions';

import Page from '../Page';
import Breadcrumbs from './Breadcrumbs';
import Table from './Table';

const defaultSize = 10;
const defaultPage = 0;
const defaultOrder = ['name', 'desc'];

export class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addingProduct: false,
      productToDelete: null,
      productToEdit: null,
      productsRetrieveRequestId: this.fetchProducts().id,
    };
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.location.search !== prevProps.location.search) {
      this.setState({
        productsRetrieveRequestId: this.fetchProducts().id,
      });
    }
  }

  fetchProducts = () => {
    const {
      location: { search, pathname },
      productsRetrieveAction,
    } = this.props;
    const categoryIds = pathname.split("/");
    const parentCategoryId = categoryIds[categoryIds.length - 1];
    const urlSearchParams = new URLSearchParams(search);
    const page = urlSearchParams.get('page') || defaultPage;
    const sort = urlSearchParams.get('sort') || defaultOrder;

    const queryParams = {
      page,
      size: defaultSize,
      sort,
    };

    return productsRetrieveAction(parentCategoryId, queryParams);
  };

  render = () => {
    const {
      categoriesReducer: {
        data: categories,
        requests: categoryRequests,
      },
    } = this.props;

    return (
      <Page fetch={categories.length === 0 && _.isEmpty(categoryRequests)}>
        <Segment circular={false} inverted>
          <Breadcrumbs />
        </Segment>
        <br />
        <Table
          setAddingProduct={() => this.setState({ addingProduct: true })}
          setProductToEdit={productToEdit => this.setState({ productToEdit })}
          setProductToDelete={productToDelete => this.setState({ productToDelete })}
        />
        <br />
      </Page>
    );
  }
}

const mapStateToProps = state => ({
  categoriesReducer: state.categories,
});

const mapDispatchToProps = {
  productsRetrieveAction,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Products));
