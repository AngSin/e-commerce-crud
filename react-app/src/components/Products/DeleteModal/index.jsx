import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Button, Modal } from 'semantic-ui-react';
import _ from 'lodash';

import { productsDeleteAction } from '../../../store/products/actions';

export const DeleteModal = ({
  onClose,
  parentCategoryId,
  productsReducer,
  productToDelete,
  productsDeleteAction,
}) => {
  const [deleteRequestId, setRequestId] = useState(null);
  const deleteRequest = productsReducer.requests[deleteRequestId];
  const error = _.get(deleteRequest, 'error');
  const loading = _.get(deleteRequest, 'loading');
  const finishedSubmission = _.get(deleteRequest, 'ok');

  if (finishedSubmission) {
    onClose();
  }

  return (
    <Modal size="small" open onClose={onClose}>
      <Modal.Header>Delete {productToDelete.name}</Modal.Header>
      <Modal.Content>
        <Modal.Description>This action is irreversible.</Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <div style={{ fontStyle: 'italic', fontSize: 11, color: 'red' }}>
          {error}
        </div>
        <Button
          onClick={onClose}
        >
          Cancel
        </Button>
        <Button
          color="red"
          loading={loading}
          onClick={() => setRequestId(productsDeleteAction(parentCategoryId, productToDelete.id).id)}
        >
          Delete
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

const mapStateToProps = state => ({
  productsReducer: state.products,
});

const mapDispatchToProps = {
  productsDeleteAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(DeleteModal);
