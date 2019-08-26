import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import Table from './Table';
import AddEditModal from './AddEditModal';
import DeleteModal from './DeleteModal';
import Page from '../Page';

class Categories extends Component {
  state = {
    addingToCategoryId: null,
    categoryToDelete: null,
    categoryToEdit: null,
  };

  render = () => {
    const {
      addingToCategoryId,
      categoryToDelete,
      categoryToEdit,
    } = this.state;
    const {
      categoriesReducer: {
        data,
        requests,
      },
    } = this.props;

    return (
      <Page fetch={data.length === 0 && _.isEmpty(requests)}>
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
      </Page>
    );
  }
}

const mapStateToProps = state => ({
  categoriesReducer: state.categories,
});

export default connect(mapStateToProps)(Categories);
