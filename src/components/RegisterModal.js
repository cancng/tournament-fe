import React, { useState } from 'react';
import { Button, Modal, Form, InputGroup } from 'react-bootstrap';
import { useStoreActions, useStoreState } from 'easy-peasy';

const RegisterModal = ({ tournament }) => {
  const [inputs, setInputs] = useState({ team_name: '', team_players: '' });
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  // Redux Store States
  // const loading = useStoreState((state) => state.tournament.loading);
  // const errors = useStoreState((state) => state.tournament.errors);
  const registeredTournaments = useStoreState(
    (state) => state.tournament.registeredTournaments
  );

  // Redux Store Actions
  const registerTournament = useStoreActions(
    (actions) => actions.tournament.joinTournament
  );

  //
  const checker = (tournamentId) => {
    const found = registeredTournaments.find(
      (trnmt) => trnmt.tournamentId === tournament._id
    );
    return !!found;
  };

  const playerRegistrar = (playersString) => {
    let splittedPlayers = playersString.split(',', 10);
    return splittedPlayers
      .filter((player) => player.length > 1)
      .map((player) => player.trim());
  };

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

  return (
    <>
      {!tournament.isActive ? (
        <Button variant='danger' disabled={true}>
          Turnuva Aktif Değil
        </Button>
      ) : (
        <Button
          variant='success'
          disabled={checker(tournament._id)}
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
              <p style={{ marginBottom: 0 }} className='text-muted'>
                Takımınızdaki oyuncuları virgül ile ayırarak yazınız. Yedek
                kayıt edebilirsiniz. En fazla 10 oyuncu adı sisteme kayıt
                edilecektir.
              </p>
              <div>
                Kayıt edilecek oyuncular:
                <p style={{ color: 'red' }}>
                  {playerRegistrar(inputs.team_players).join(' | ')}
                </p>
              </div>
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
