import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Button, Icon, Popup, Table } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import {
  buildBreadcrumbs,
  buildBreadcrumbsUrl,
  getCategory,
} from "../../utils";

class CategoriesTable extends Component {
  constructor(props) {
    super(props);
    const {
      location: { pathname, search },
      categoriesReducer: { data: categoriesTree },
    } = props;
    const urlSearchParams = new URLSearchParams(search);
    const activeCategoryId = Number(urlSearchParams.get("active"));
    const category = getCategory(categoriesTree, activeCategoryId);
    const categoriesChain = [];
    if (category) categoriesChain.push(...buildBreadcrumbs(categoriesTree, category));
    this.state = {
      openCategoriesById: categoriesChain.reduce(
        (openCategoriesById, category) => ({
          ...openCategoriesById,
          [category.id]: true,
        }),
        {},
      ),
    };
  }

  renderTableRow = (categories = [], level = 0) => categories.map(category => {
    const {
      location: { pathname, search },
      categoriesReducer: {
        data: categoriesTree,
      },
    } = this.props;
    const urlSearchParams = new URLSearchParams(search);
    const activeCategory = Number(urlSearchParams.get("active"));
    return (
      <Fragment key={category.id}>
        <Table.Row active={activeCategory === category.id}>
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
                  onClick={() => this.props.history.push({
                    pathname: `${buildBreadcrumbsUrl(categoriesTree, category)}`,
                    search: '?page=0&sort=name,asc',
                  })}
                >
                  <Icon name="arrow right" color="grey" />
                </Button>
              }
              content="Click to see the products in this category"
            />
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
        {this.state.openCategoriesById[category.id] && category.children && this.renderTableRow(category.children, level + 1)}
      </Fragment>
    );
  });

  render = () => {
    const {
      categoriesReducer: {
        data,
      },
    } = this.props;

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
          <Table.Row>
            <Table.Cell colSpan={3} textAlign="center">
              <Button
                icon
                fluid
                primary
                onClick={() => this.props.setAddingToCategoryId(null)}
              >
                Add Root Category&nbsp;
                <Icon
                  name="plus"
                />
              </Button>
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    );
  }
}

const mapStateToProps = state => ({
  categoriesReducer: state.categories,
});

export default withRouter(connect(mapStateToProps) (CategoriesTable));
