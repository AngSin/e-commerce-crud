import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import _ from 'lodash';

export class Table extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    const searchParams = new URLSearchParams(_.get(props.location, 'search', ''));
    const queryParams = {};
    searchParams.forEach((value, key) => {
      queryParams[key] = value;
    });
    this.state = queryParams;
  }

  componentDidUpdate(prevProps, prevState) {
    if (!_.isEqual(prevState, this.state)) {
      const searchParams = new URLSearchParams(this.state);
      this.props.history.push({
        search: decodeURIComponent(searchParams.toString()),
      });
    }
  }

  render = () => {
    return (
      <Table sortable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>
              Name
            </Table.HeaderCell>
            <Table.HeaderCell>
              Description
            </Table.HeaderCell>
            <Table.HeaderCell>
              Price
            </Table.HeaderCell>
            <Table.HeaderCell colSpan={2}>
              Price in Euros
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>

        </Table.Body>
      </Table>
    )
  }
}

export default withRouter(Table);
