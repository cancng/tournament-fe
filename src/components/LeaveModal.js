import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useStoreActions } from 'easy-peasy';

const LeaveModal = ({ tournamentt }) => {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const leaveTournament = useStoreActions(
    (actions) => actions.tournament.leaveTournament
  );
  return (
    <>
      <Button variant='danger' onClick={handleShow}>
        Kayıt Sil
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Emin misin?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <span className='font-weight-bold text-info'>
            "{tournamentt.teamName}"
          </span>{' '}
          takımıyla kayıt olmuşsunuz. Turnuvadan çekilmek istediğinize emin
          misiniz? İsterseniz tekrar kayıt olabilirsiniz
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Hayır
          </Button>
          <Button
            variant='danger'
            onClick={() => {
              leaveTournament({
                tournamentId: tournamentt.tournamentId,
                teamId: tournamentt.teamId,
              });
            }}
          >
            Evet, kaydı sil!
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default LeaveModal;
