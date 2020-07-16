import React, { useState } from 'react';
import { Button, Modal, Form, InputGroup } from 'react-bootstrap';
import { useStoreActions, useStoreState } from 'easy-peasy';

const RegisterModal = ({ tournament, isRegistered }) => {
  const [inputs, setInputs] = useState({ team_name: '', team_players: '' });
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  // Redux Store States
  // const loading = useStoreState((state) => state.tournament.loading);
  // const errors = useStoreState((state) => state.tournament.errors);

  // Redux Store Actions
  const registerTournament = useStoreActions(
    (actions) => actions.tournament.joinTournament
  );
  // const setError = useStoreActions((actions) => actions.tournament.setErrors);

  //
  const handleChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    registerTournament({
      tournamentId: tournament._id,
      team_name: inputs.team_name,
      team_players: inputs.team_players,
    });
  };
  console.log(isRegistered);

  return (
    <>
      {!tournament.isActive ? (
        <Button
          variant='danger'
          disabled={true}
        >
          Turnuva Aktif Değil
        </Button>
      ) : (
        <Button
          variant='success'
          disabled={isRegistered.registered}
          onClick={handleShow}
        >
          Takımını Kaydet
        </Button>
      )}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Turnuva Kayıt Formu</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={onSubmit}>
            <InputGroup className='mb-3'>
              <InputGroup.Prepend>
                <InputGroup.Text id='basic-addon1'>Takım Adı</InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control
                name='team_name'
                value={inputs.team_name}
                onChange={handleChange}
              />
            </InputGroup>
            <InputGroup className='mb-3'>
              <InputGroup.Prepend>
                <InputGroup.Text id='basic-addon1'>Oyuncular</InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control
                name='team_players'
                placeholder='Virgülle ayırınız'
                value={inputs.team_players}
                onChange={handleChange}
              />
            </InputGroup>
            <Button
              variant='primary'
              // onClick={onSubmit}
              type='submit'
              className='float-right'
              block
              // disabled={loading}
            >
              Gönder
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default RegisterModal;
