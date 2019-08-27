import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Button, Modal } from 'semantic-ui-react';

import { categoriesDeleteAction } from '../../../store/categories/actions';

export const DeleteModal = ({
  categoriesReducer,
  categoriesDeleteAction,
  categoryToDelete,
  onClose,
}) => {
  const [deleteRequestId, setRequestId] = useState(null);
  const deleteRequest = categoriesReducer.requests[deleteRequestId];
  const error = _.get(deleteRequest, 'error');
  const loading = _.get(deleteRequest, 'loading');
  const finishedSubmission = _.get(deleteRequest, 'ok');

  useEffect(() => {
    if (finishedSubmission) {
      onClose();
    }
  }, [finishedSubmission]);

  return (
    <Modal size="small" open onClose={onClose}>
      <Modal.Header>Delete Category "{categoryToDelete.name}"</Modal.Header>
      <Modal.Content>This action is irreversible.</Modal.Content>
      <Modal.Actions>
        <div style={{ fontStyle: 'italic', color: 'red', fontSize: 11 }}>
          {error}
        </div>
        <Button onClick={onClose}>
          Cancel
        </Button>
        <Button
          color="red"
          onClick={() => setRequestId(categoriesDeleteAction(categoryToDelete.id).id)}
          loading={loading}
        >
          Delete
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

const mapStateToProps = state => ({
  categoriesReducer: state.categories,
});

const mapDispatchToProps = {
  categoriesDeleteAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(DeleteModal);
