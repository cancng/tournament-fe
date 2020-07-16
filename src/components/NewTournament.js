import React, { useState } from 'react';
import {
  Col,
  Row,
  Form,
  InputGroup,
  FormControl,
  Button,
  Alert,
} from 'react-bootstrap';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { useHistory, Link } from 'react-router-dom';
import moment from 'moment';
import { useEffect } from 'react';

const NewTournament = () => {
  const [inputs, setInputs] = useState({ name: '', event_date: '' });
  const [tournamentActivity, setTournamentActivity] = useState(false);
  const { push } = useHistory();

  // Redux store states
  const errors = useStoreState((state) => state.tournament.errors);

  // Redux store actions
  const createNewTournament = useStoreActions(
    (actions) => actions.tournament.createTournament
  );
  const setErrors = useStoreActions((actions) => actions.tournament.setErrors);

  //
  const handleChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const onSwitchChange = (e) => {
    setTournamentActivity(!tournamentActivity);
  };

  const formOnSubmit = (e) => {
    e.preventDefault();
    createNewTournament({ inputs, push, tournamentActivity });
  };
  useEffect(() => {
    setErrors([]);
  }, []);
  return (
    <>
      <Row>
        <Col>
          <h2>Yeni Turnuva Oluşturr</h2>
          <p>
            Yeni turnuva oluşturarak bir organizasyon yönetin. Turnuvayı
            oluşturduğunuzda varsayılan olarak kayıtlar açık olacaktır.
          </p>
        </Col>
      </Row>
      <hr />
      <Row>
        <Col md={{ span: 6, offset: 3 }} xs={12}>
          {errors.length > 0 &&
            errors.map((error) => (
              <Alert variant='danger' key={error.param}>
                {error.msg}
              </Alert>
            ))}
          <Form onSubmit={formOnSubmit}>
            <InputGroup className='mb-3'>
              <InputGroup.Prepend>
                <InputGroup.Text id='tournament-name'>
                  Turnuva Adı
                </InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                name='name'
                aria-describedby='tournament-name'
                value={inputs.name}
                onChange={handleChange}
              />
            </InputGroup>
            <Form.Group>
              <Form.Label>Etkinlik Tarihi</Form.Label>
              <Form.Control
                type='date'
                name='event_date'
                value={inputs.event_date}
                onChange={handleChange}
                // min='2020-07-15'
                min={moment().format('YYYY-MM-DD')}
              />
            </Form.Group>
            <Form.Group>
              <Form.Check
                type='switch'
                id='isActive'
                label='Turnuva aktif mi?'
                onChange={onSwitchChange}
              />
            </Form.Group>
            <Button variant='success' type='submit' className='mr-1'>
              Gönder
            </Button>
            <Link className='btn btn-secondary' to='/admin'>
              Geri
            </Link>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default NewTournament;
