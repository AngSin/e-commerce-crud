import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Button, Icon, Popup, Table } from 'semantic-ui-react';

class CategoriesTable extends Component {
  state = {
    openCategoriesById: {},
  };

  renderTableRow = (categories = [], level = 0) => categories.map(category => {
    return (
      <Fragment key={category.id}>
        <Table.Row>
          <Table.Cell>
            <Button
              basic
              icon
              color="grey"
              onClick={() =>
                this.setState(state => ({
                  openCategoriesById: {
                    ...state.openCategoriesById,
                    [category.id]: !state.openCategoriesById[category.id],
                  },
                }))
              }
              style={{
                margin: 10,
                marginLeft: level * 40,
              }}
              disabled={!category.children || category.children.length === 0}
            >
              <Icon
                name={
                  this.state.openCategoriesById[category.id] ? 'chevron up' : 'chevron down'
                }
              />
            </Button>
            {category.name}
          </Table.Cell>
          <Table.Cell>
            {category.description}
          </Table.Cell>
          <Table.Cell textAlign="right">
            <Popup
              trigger={
                <Button
                  icon
                  basic
                  onClick={() => this.props.setAddingToCategoryId(category.id)}
                >
                  <Icon name="plus" color="grey" />
                </Button>
              }
              content="Click to add a subcategory to this category"
            />
            <Button
              icon
              basic
              onClick={() => this.props.setCategoryToEdit(category)}
            >
              <Icon name="edit" color="grey" />
            </Button>
            <Button
              icon
              basic
              onClick={() => this.props.setCategoryToDelete(category)}
            >
              <Icon name="trash" color="red" />
            </Button>
          </Table.Cell>
        </Table.Row>
        {this.state.openCategoriesById[category.id] && this.renderTableRow(category.children, level + 1)}
      </Fragment>
    );
  });

  render = () => {
    const {
      categoriesReducer: {
        data,
      },
    } = this.props;

    if (!data.length) return <div />;

    return (
      <Table inverted>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>
              Name
            </Table.HeaderCell>
            <Table.HeaderCell colSpan={2}>
              Description
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {this.renderTableRow(data)}
        </Table.Body>
      </Table>
    );
  }
}

const mapStateToProps = state => ({
  categoriesReducer: state.categories,
});

export default connect(mapStateToProps) (CategoriesTable);
