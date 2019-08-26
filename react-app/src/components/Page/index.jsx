import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Dimmer, Loader, Header, Segment } from 'semantic-ui-react';

import _ from 'lodash';
import { categoriesRetrieveAction } from '../../store/categories/actions';

import Categories from '../Categories';
import { centerStyled } from './styles';

export const Page = ({
  categoriesRetrieveAction,
  categoriesReducer,
}) => {
  const [categoriesRetrieveRequestId, setRequestId] = useState(null);
  const categoriesRetrieveRequest = categoriesReducer.requests[categoriesRetrieveRequestId];
  const loading = _.get(categoriesRetrieveRequest, 'loading', false);

  useEffect(() => {
    setRequestId(categoriesRetrieveAction().id);
  }, []);

  if (loading) {
    return (
      <div style={centerStyled}>
        LOADING
        <Dimmer active>
          <Loader active size="massive" />
        </Dimmer>
      </div>
  );
  }

  const error = _.get(categoriesRetrieveRequest, 'error', '');
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
      <Categories />
    </>
  );
};

const mapStateToProps = state => ({
  categoriesReducer: state.categories,
});

const mapDispatchToProps = {
  categoriesRetrieveAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(Page);
