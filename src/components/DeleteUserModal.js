import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useStoreActions } from 'easy-peasy';

const DeleteUserModal = (props) => {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  // Redux Store Actions
  const deleteUser = useStoreActions((actions) => actions.user.deleteUser);
  //
  const approveDelete = (userId) => {
    deleteUser(userId);
  };
  return (
    <>
      <Button
        variant='danger'
        size='sm'
        onClick={handleShow}
        disabled={props.user.isAdmin === '1'}
      >
        <i className='fas fa-trash' />
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Emin misin?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <span className='font-weight-bold'>{props.user.name}</span> isimli
          üyenin kaydını silmek istediğine emin misin?
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Hayır
          </Button>
          <Button
            variant='danger'
            onClick={() => approveDelete(props.user._id)}
          >
            Evet, Sil!
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DeleteUserModal;
