import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {Pagination, Table} from 'semantic-ui-react';
import _ from 'lodash';

const paramsToObject = entries => {
  const result = {};
  for(const entry of entries) {
    const [key, value] = entry;
    result[key] = value;
  }
  return result;
};

export class ProductsTable extends Component {
  constructor(props) {
    super(props);
    const searchParams = new URLSearchParams(props.location.search);
    const entries = searchParams.entries(); //returns an iterator of decoded [key,value] tuples
    const queryParams = paramsToObject(entries);
    this.state = {...queryParams};
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (!_.isEqual(prevState, this.state)) {
      const searchParams = new URLSearchParams(this.state);
      this.props.history.push({
        search: decodeURIComponent(searchParams.toString()),
      });
    }
  };

  render = () => {
    const {
      productsReducer: { data = [], metadata }
    } = this.props;
    const order = _.get(this.state, 'sort', '').split(',')[1] === 'desc' ? 'descending' : 'ascending';
    const oppositeOrder = order === 'descending' ? 'asc' : 'desc';
    const column = _.get(this.state, 'sort', '').split(',')[0];
    const activePage = Number(_.get(this.state, 'page', 0)) + 1;

    return (
      <>
        <Table inverted sortable celled striped>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell
                sorted={column === 'name' ? order : null}
                onClick={() => this.setState(state => ({
                  ...state,
                  sort: 'name,'.concat(column === 'name' ? oppositeOrder : 'asc'),
                  page: 0,
                }))}
              >
                Name
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={column === 'description' ? order : null}
                onClick={() => this.setState(state => ({
                  ...state,
                  sort: 'description,'.concat(column === 'description' ? oppositeOrder : 'asc'),
                  page: 0,
                }))}
              >
                Description
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={column === 'price' ? order : null}
                onClick={() => this.setState(state => ({
                  ...state,
                  sort: 'price,'.concat(column === 'price' ? oppositeOrder : 'asc'),
                  page: 0,
                }))}
              >
                Price
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={column === 'priceInEuros' ? order : null}
                onClick={() => this.setState(state => ({
                  ...state,
                  sort: 'priceInEuros,'.concat(column === 'priceInEuros' ? oppositeOrder : 'asc'),
                  page: 0,
                }))}
                colSpan={2}
              >
                Price in Euros
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {data.map(product => (
              <Table.Row>
                <Table.Cell>
                  {product.name}
                </Table.Cell>
                <Table.Cell>
                  {product.description}
                </Table.Cell>
                <Table.Cell>
                  {product.currency} {product.price}
                </Table.Cell>
                <Table.Cell>
                  EUR {_.round(product.priceInEuros, 2)}
                </Table.Cell>
                <Table.Cell>

                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
        <div style={{ width: '100vw', textAlign: 'center' }}>
          <Pagination
            totalPages={_.get(metadata, 'totalPages', 0)}
            activePage={activePage}
            onPageChange={(e, d) => this.setState(state => ({
              ...state,
              page: d.activePage - 1,
            }))}
          />
        </div>
      </>
    )
  }
}

const mapStateToProps = state => ({
  productsReducer: state.products,
});

export default withRouter(connect(mapStateToProps)(ProductsTable));
