import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useStoreActions } from 'easy-peasy';

const DeleteModal = (props) => {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  // Redux Store Actions
  const deleteTournament = useStoreActions(
    (actions) => actions.tournament.deleteTournament
  );
  //
  const approveDelete = (tournamentId) => {
    deleteTournament(tournamentId);
  };
  return (
    <>
      <Button variant='danger' size='sm' onClick={handleShow}>
        <i className='fas fa-trash' />
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Emin misin?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <span className='font-weight-bold'>{props.tournament.name}</span>{' '}
          isimli turnuvayı silmek istediğine emin misin? İşlemin geri dönüşü
          yoktur!
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Hayır
          </Button>
          <Button
            variant='danger'
            onClick={() => approveDelete(props.tournament._id)}
          >
            Evet, Sil!
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DeleteModal;
