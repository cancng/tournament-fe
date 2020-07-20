import React, { useState } from 'react';
import { Badge, Button, Modal, Table } from 'react-bootstrap';

const ParticipantsModal = ({ selectedTournament }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <Button variant='primary' onClick={handleShow} size='sm'>
        Takım{' '}
        <Badge variant='light'>
          {selectedTournament.teams && selectedTournament.teams.length}
        </Badge>
        <span className='sr-only'>takım</span>
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Kayıtlı Takımlar</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table hover>
            <thead>
              <tr>
                <th>Takım Kaptan ID</th>
                <th>Takım Adı</th>
              </tr>
            </thead>
            <tbody>
              {selectedTournament.teams &&
                selectedTournament.teams.map((team) => (
                  <tr key={team.captain}>
                    <td>
                      <Badge variant='info'> {team.captain}</Badge>
                    </td>
                    <td>{team.name}</td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Kapat
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ParticipantsModal;
