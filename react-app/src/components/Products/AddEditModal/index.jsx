import React, { Component } from 'react';
import { Button, Input, Dropdown, Label, Modal } from 'semantic-ui-react';
import { connect } from 'react-redux';
import _ from 'lodash';

import { productsCreateAction, productsUpdateAction } from '../../../store/products/actions';

const currencies = ['EUR', 'CHF', 'GBP', 'USD', 'INR', 'CNY'].map(curr => ({
  text: curr,
  key: curr,
  value: curr,
}));

class Index extends Component {
  emptyProduct = {
    name: '',
    description: '',
    price: '',
    currency: null,
  };

  state = {
    addEditRequestId: null,
    temporaryProduct: this.props.productToEdit || this.emptyProduct,
  };

  componentDidUpdate = () => {
    const { productsReducer: { requests } } = this.props;
    const { addEditRequestId } = this.state;
    const finishedSubmission = _.get(requests[addEditRequestId], 'ok');
    if (finishedSubmission) {
      this.props.onClose();
    }
  };

  isFormValid = () =>
    !!this.state.temporaryProduct.name &&
    !!this.state.temporaryProduct.price &&
    !!this.state.temporaryProduct.currency;

  hasFormChanged = () => {
    const { productToEdit } = this.props;
    const editing = !!productToEdit;
    return !_.isEqual(this.state.temporaryProduct, editing ? productToEdit : this.emptyProduct);
  };

  handleSubmit = () => {
    const {
      productsCreateAction,
      productsUpdateAction,
      productToEdit,
      parentCategoryId,
    } = this.props;
    const { temporaryProduct } = this.state;
    const editing = !!productToEdit;
    const addEditRequestId = editing
      ? productsUpdateAction(parentCategoryId, _.omit(temporaryProduct, 'categoryId')).id
      : productsCreateAction(parentCategoryId, temporaryProduct).id;
    this.setState({ addEditRequestId });
  };

  render = () => {
    const {
      onClose,
      productToEdit,
      productsReducer,
    } = this.props;
    const {
      temporaryProduct,
      addEditRequestId,
    } = this.state;
    const editing = !!productToEdit;
    const addEditRequest = productsReducer.requests[addEditRequestId];
    const error = _.get(addEditRequest, 'error', '');
    const loading  = _.get(addEditRequest, 'loading', false);

    return (
      <Modal open onClose={onClose}>
        <Modal.Header>{editing ? `Edit product ${productToEdit.name}` : 'Add Product' }</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            After creation, a product's parent category is uneditable.
          </Modal.Description>
          <br />
          <br />
          <Input
            label="Name*"
            fluid
            value={temporaryProduct.name}
            onChange={(e, d) => this.setState(state => ({
              temporaryProduct: {
                ...state.temporaryProduct,
                name: d.value,
              },
            }))}
            placeholder="Harry Potter"
          />
          <br />
          <Input
            label="Description"
            fluid
            value={temporaryProduct.description}
            onChange={(e, d) => this.setState(state => ({
              temporaryProduct: {
                ...state.temporaryProduct,
                description: d.value,
              },
            }))}
            placeholder="Story about a wizard child"
          />
          <br />
          <Input
            label="Price*"
            fluid
            type="number"
            value={temporaryProduct.price}
            onChange={(e, d) => this.setState(state => ({
              temporaryProduct: {
                ...state.temporaryProduct,
                price: Number(d.value),
              },
            }))}
            placeholder="19.99"
          />
          <br />
          <Label>Currency*: </Label>
          <Dropdown
            search
            selection
            placeholder="EUR"
            options={currencies}
            value={this.state.temporaryProduct.currency}
            onChange={(e, d) => this.setState(state => ({
              temporaryProduct: {
                ...state.temporaryProduct,
                currency: d.value,
              },
            }))}
          />
        </Modal.Content>
        <Modal.Actions>
          <div style={{ fontStyle: 'italic', color: 'red', fontSize: 11 }}>
            {error}
          </div>
          <Button onClick={onClose}>
            Cancel
          </Button>
          <Button
            primary
            disabled={!this.isFormValid() || !this.hasFormChanged()}
            onClick={this.handleSubmit}
            loading={loading}
          >
            {editing ? 'Edit' : 'Create'}
          </Button>
        </Modal.Actions>
      </Modal>
    );
  };
}

const mapStateToProps = state => ({
  productsReducer: state.products,
});

const mapDispatchToProps = {
  productsCreateAction,
  productsUpdateAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(Index);
