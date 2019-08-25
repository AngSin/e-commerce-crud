import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table } from 'semantic-ui-react';

class CategoriesMenu extends Component {
  render = () => {
    const {
      categoriesReducer: {
        data,
        dataByParentCategoryId,
      },
    } = this.props;

    if (!data.length) return <div />;

    return (
      <Table>

      </Table>
    );
  }
}

const mapStateToProps = state => ({
  categoriesReducer: state.categories,
});

export default connect(mapStateToProps) (CategoriesMenu);
