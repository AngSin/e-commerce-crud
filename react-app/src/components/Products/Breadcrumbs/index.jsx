import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import { Breadcrumb } from 'semantic-ui-react';
import _ from 'lodash';
import { getCategory } from '../../utils';

export class Breadcrumbs extends Component {
  render = () => {
    const {
      categoriesReducer: { data: categoriesTree },
      history: { push, replace },
      location: { pathname },
    } = this.props;
    const categoryIds = pathname.split('/');
    const categories = _.compact(categoryIds.map(categoryId => getCategory(categoriesTree, Number(categoryId))));

    return(
      <Breadcrumb>
        {categories.map(category => (
          <Fragment key={category.id}>
            <Breadcrumb.Section
              link
              onClick={() => replace(`/?active=${category.id}`)}
            >
              {category.name}
            </Breadcrumb.Section>
            <Breadcrumb.Divider style={{ color: 'white' }} />
          </Fragment>
        ))}
      </Breadcrumb>
    );
  };
}

const mapStateToProps = state => ({
  categoriesReducer: state.categories,
});

export default withRouter(connect(mapStateToProps)(Breadcrumbs));
