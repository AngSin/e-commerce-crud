import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Button, Dropdown, Input, Modal } from 'semantic-ui-react';

import {
  categoriesCreateAction,
  categoriesUpdateAction
} from '../../../store/categories/actions';

class AddEditModal extends Component {
  emptyCategory = {
    name: '',
    description: '',
    parentCategoryId: this.props.addingToCategoryId,
  };

  state = {
    addEditRequestId: null,
    temporaryCategory: this.props.categoryToEdit ?
      this.props.categoryToEdit : this.emptyCategory,
  };

  componentDidUpdate = () => {
    const { addEditRequestId } = this.state;
    const { categoriesReducer } = this.props;
    const finishedSubmission = _.get(categoriesReducer.requests, `[${addEditRequestId}].ok`);
    if (finishedSubmission) {
      this.props.onClose();
    }
  };

  isFormValid = () => !!this.state.temporaryCategory.name;

  hasFormChanged = () =>
    !_.isEqual(this.state.temporaryCategory, (this.props.categoryToEdit ? this.props.categoryToEdit : this.emptyCategory));

  handleSubmit = () => {
    const {
      categoriesCreateAction,
      categoriesUpdateAction,
      categoriesReducer,
    } = this.props;
    const { temporaryCategory } = this.state;
    const editing = !!this.props.categoryToEdit;
    const addEditRequestId = editing ? categoriesUpdateAction(temporaryCategory).id : categoriesCreateAction(temporaryCategory).id;
    this.setState({ addEditRequestId });
  };


  render = () => {
    const { categoryToEdit, categoriesReducer, onClose } = this.props;
    const { temporaryCategory, addEditRequestId } = this.state;
    const request = categoriesReducer.requests[addEditRequestId];
    const loading = _.get(request, 'loading', false);
    const error = _.get(request, 'error', '');
    const editing = !!categoryToEdit;

    return (
      <Modal open onClose={onClose}>
        <Modal.Header>{editing ? `Edit Category "${categoryToEdit.name}"` : 'Add Category'}</Modal.Header>
        <Modal.Content>
          <Modal.Description>After creation, a category's parent category field is uneditable.</Modal.Description>
          <br />
          <br />
          <Input
            fluid
            placeholder="Books"
            label="Name*"
            value={temporaryCategory.name}
            onChange={(e, d) => this.setState(state => ({
              temporaryCategory: {
                ...state.temporaryCategory,
                name: d.value,
              }
            }))}
          />
          <br />
          <Input
            fluid
            placeholder="Papers bound together (sometimes interesting)"
            label="Description"
            value={temporaryCategory.description}
            onChange={(e, d) => this.setState(state => ({
              temporaryCategory: {
                ...state.temporaryCategory,
                description: d.value,
              }
            }))}
          />
          <br />
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
            onClick={this.handleSubmit}
            disabled={!this.isFormValid() || !this.hasFormChanged()}
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
  categoriesReducer: state.categories,
});

const mapDispatchToProps = {
  categoriesCreateAction,
  categoriesUpdateAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddEditModal);
