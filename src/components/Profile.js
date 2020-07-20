import React, { useEffect, useState } from 'react';
import {
  Alert,
  Button,
  Col,
  Form,
  InputGroup,
  Media,
  Row,
  Spinner,
} from 'react-bootstrap';
import { useStoreActions, useStoreState } from 'easy-peasy';
import moment from 'moment';
import Moment from 'react-moment';
import { useHistory } from 'react-router-dom';

const Profile = () => {
  const { push } = useHistory();
  // Component based states
  const [inputs, setInputs] = useState({
    password: '',
    new_password: '',
    new_password_again: '',
  });
  const [customError, setCustomError] = useState({ type: '', msg: '' });

  // Redux Store States
  const user = useStoreState((state) => state.auth.user);
  const errors = useStoreState((state) => state.auth.errors);
  const isLoading = useStoreState((state) => state.auth.loading);
  const successMsg = useStoreState((state) => state.auth.responseMsg);

  //Redux Store Actions
  const changePassword = useStoreActions(
    (actions) => actions.auth.changePassword
  );
  //
  const handleChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    if (inputs.password.length <= 0) {
      return setCustomError({
        type: 'danger',
        msg: 'Eski şifre boş bırakılamaz',
      });
    }
    if (
      inputs.new_password.length <= 0 ||
      inputs.new_password_again.length <= 0
    ) {
      return setCustomError({
        type: 'danger',
        msg: 'Yeni şifre boş bırakılamaz',
      });
    }
    if (inputs.new_password !== inputs.new_password_again) {
      return setCustomError({
        type: 'danger',
        msg: 'Yeni şifre birbiriyle eşleşmiyor',
      });
    }
    const body = {
      password: inputs.password,
      new_password: inputs.new_password,
    };
    changePassword({ ...body, push });
  };

  useEffect(() => {
    setCustomError({ msg: successMsg, type: 'success' });
  }, [successMsg]);

  return (
    <>
      <Row>
        <Col md={6} xs={12} className='mb-3'>
          <Media>
            <img
              width={150}
              height={150}
              className='mr-3'
              src={user && user.avatar}
              alt='profile'
            />
            <Media.Body>
              <h5>Hoşgeldiniz, {user && user.name}</h5>
              <ul>
                <li>Adınız: {user && user.name}</li>
                <li>E-posta: {user && user.email}</li>
                <li>
                  Kayıt Tarihiniz:{' '}
                  <Moment format='DD/MM/YYYY'>
                    {moment.utc(user && user.date)}
                  </Moment>
                </li>
              </ul>
            </Media.Body>
          </Media>
        </Col>
        <Col md={6} xs={12}>
          <h4>Şifre Değişiklik Formu</h4>
          {customError.msg.length > 0 && (
            <Alert variant={customError.type}>{customError.msg}</Alert>
          )}
          {errors &&
            errors.map((error) => (
              <Alert
                variant='danger'
                className='text-dark text-center'
                key={error.msg}
              >
                {error.msg}
              </Alert>
            ))}
          <Form onSubmit={onFormSubmit}>
            <InputGroup className='mb-3'>
              <InputGroup.Prepend>
                <InputGroup.Text id='basic-addon1'>
                  Mevcut Şifre
                </InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control
                placeholder='Mevcut Şifreniz'
                name='password'
                type='password'
                onChange={handleChange}
              />
            </InputGroup>
            <InputGroup className='mb-3'>
              <InputGroup.Prepend>
                <InputGroup.Text>Yeni Şifre/Tekrar</InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control
                type='password'
                name='new_password'
                onChange={handleChange}
              />
              <Form.Control
                type='password'
                name='new_password_again'
                onChange={handleChange}
              />
            </InputGroup>
            <p className='text-muted'>
              Dikkat: Şifrenizi değiştirdikten sonra sistem otomatik olarak
              çıkış yapacaktır.
            </p>
            <Button variant='primary' type='submit'>
              {isLoading ? (
                <Spinner
                  as='span'
                  animation='border'
                  size='sm'
                  role='status'
                  aria-hidden='true'
                />
              ) : (
                'Kaydet'
              )}
            </Button>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default Profile;
