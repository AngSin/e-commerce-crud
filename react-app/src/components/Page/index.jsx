import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dimmer, Header, Loader, Segment } from 'semantic-ui-react';
import _ from 'lodash';

import { categoriesRetrieveAction } from '../../store/categories/actions';

import { centerStyled } from './styles';

class Categories extends Component {
  state = {
    categoriesRetrieveRequestId: this.props.categoriesRetrieveAction().id,
  };

  render = () => {
    const {
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
        {this.props.children}
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
