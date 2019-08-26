import React, { Component } from 'react';

import Table from './Table';
import AddEditModal from './AddEditModal';

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
        <Table
          setAddingToCategoryId={addingToCategoryId => this.setState({ addingToCategoryId })}
          setCategoryToEdit={categoryToEdit => this.setState({ categoryToEdit })}
          setCategoryToDelete={categoryToDelete => this.setState({ categoryToDelete })}
        />
      </>
    );
  }
}

export default Categories;
