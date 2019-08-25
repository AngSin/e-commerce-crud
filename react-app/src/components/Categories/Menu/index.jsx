import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import {Button, Icon, Table} from 'semantic-ui-react';

class CategoriesMenu extends Component {
  state = {
    openCategoriesById: {},
  };

  renderTableRow = (categories, level = 0) => {
    return categories.map(category => {
      return (
        <Fragment key={category.id}>
          <Table.Row>
            <Table.Cell>
              <Button
                icon
                primary
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
                disabled={category.children.length === 0}
              >
                <Icon
                  name={
                    this.state.openCategoriesById[category.id] ? 'minus' : 'plus'
                  }
                />
              </Button>
              {category.name}
            </Table.Cell>
          </Table.Row>
          {this.state.openCategoriesById[category.id] && this.renderTableRow(category.children, level + 1)}
        </Fragment>
      );
    });
  };

  render = () => {
    const {
      categoriesReducer: {
        data,
      },
    } = this.props;

    if (!data.length) return <div />;

    return (
      <Table inverted>
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

export default connect(mapStateToProps) (CategoriesMenu);
