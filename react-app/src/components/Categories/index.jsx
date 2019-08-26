import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dimmer, Header, Loader, Segment } from 'semantic-ui-react';
import _ from 'lodash';

import Table from './Table';
import AddEditModal from './AddEditModal';
import DeleteModal from './DeleteModal';

import { categoriesRetrieveAction } from '../../store/categories/actions';

import { centerStyled } from './styles';

class Categories extends Component {
  state = {
    addingToCategoryId: null,
    categoryToDelete: null,
    categoryToEdit: null,
    categoriesRetrieveRequestId: this.props.categoriesRetrieveAction().id,
  };

  render = () => {
    const {
      addingToCategoryId,
      categoryToDelete,
      categoryToEdit,
      categoriesRetrieveRequestId,
    } = this.state;
    const { categoriesReducer } = this.props;
    const categoriesRetrieveRequest = categoriesReducer.requests[categoriesRetrieveRequestId];
    const loading = _.get(categoriesRetrieveRequest, 'loading', false);
    const error = _.get(categoriesRetrieveRequest, 'error', '');

    if (loading) {
      return (
        <div style={centerStyled}>
          <Dimmer active>
            <Loader active size="massive" />
          </Dimmer>
        </div>
      );
    }

    if (error) {
      return (
        <div style={centerStyled}>
          <Segment>
            <Header>
              {error}
            </Header>
          </Segment>
        </div>
      );
    }

    return (
      <>
        {categoryToEdit && (
          <AddEditModal
            categoryToEdit={categoryToEdit}
            onClose={() => this.setState({ categoryToEdit: null })}
          />
        )}
        {addingToCategoryId && (
          <AddEditModal
            addingToCategoryId={addingToCategoryId}
            onClose={() => this.setState({ addingToCategoryId: null })}
          />
        )}
        {categoryToDelete && (
          <DeleteModal
            categoryToDelete={categoryToDelete}
            onClose={() => this.setState({ categoryToDelete: null })}
          />
        )}
        <Table
          setAddingToCategoryId={addingToCategoryId => this.setState({ addingToCategoryId })}
          setCategoryToEdit={categoryToEdit => this.setState({ categoryToEdit })}
          setCategoryToDelete={categoryToDelete => this.setState({ categoryToDelete })}
        />
      </>
    );
  }
}

const mapStateToProps = state => ({
  categoriesReducer: state.categories,
});

const dispatchActionToProps = {
  categoriesRetrieveAction,
};

export default connect(mapStateToProps, dispatchActionToProps)(Categories);
