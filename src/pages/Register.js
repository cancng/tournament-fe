import React, { useState } from 'react';
import { Alert, Button, Col, Form, Row, Spinner } from 'react-bootstrap';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { Link, Redirect } from 'react-router-dom';
import ReCAPTCHA from 'react-google-recaptcha';

const Register = () => {
  const [inputs, setInputs] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });
  const [error, setError] = useState('');
  const [token, setToken] = useState(null);
  const [inputClass, setInputClass] = useState('');

  // redux store states
  const errors = useStoreState((state) => state.auth.errors);
  const isLoading = useStoreState((state) => state.auth.loading);
  const isAuthenticated = useStoreState((state) => state.auth.isAuthenticated);

  //redux store actions
  const submitRegister = useStoreActions(
    (actions) => actions.auth.registerUser
  );
  const onChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };
  const formOnSubmit = (e) => {
    e.preventDefault();
    if (
      inputs.email !== '' &&
      inputs.password !== '' &&
      inputs.password2 !== '' &&
      inputs.name !== ''
    ) {
      if (inputs.password !== inputs.password2) {
        setError('Şifreleriniz eşleşmiyor');
        setInputClass('is-invalid');
        return;
      }
      setError('');
      submitRegister({
        name: inputs.name,
        email: inputs.email,
        password: inputs.password,
        captcha: token,
      });
      setInputClass('');
    } else setError('Formdaki alanları doldurunuz.');
  };
  if (isAuthenticated) {
    return <Redirect to='/' />;
  }
  return (
    <Row>
      <Col md={{ span: 6, offset: 3 }}>
        <h1>Kayıt ol</h1>
        <hr />
        {errors &&
          errors.map((error) => (
            <Alert variant='danger' key={error}>
              {error.msg}
            </Alert>
          ))}
        {error && (
          <Alert variant='danger' key={error}>
            {error}
          </Alert>
        )}
        <Form onSubmit={formOnSubmit}>
          <Form.Group>
            <Form.Label>İsminiz</Form.Label>
            <Form.Control
              type='text'
              placeholder='İsminizi girin...'
              name='name'
              value={inputs.name}
              onChange={onChange}
            />
          </Form.Group>
          <Form.Group controlId='formBasicEmail'>
            <Form.Label>E-posta Adresi</Form.Label>
            <Form.Control
              type='email'
              placeholder='E-posta adresiniz...'
              name='email'
              value={inputs.email}
              onChange={onChange}
            />
            <Form.Text className='text-muted'>
              Girişte kullanacağınız e-posta adresiniz
            </Form.Text>
          </Form.Group>

          <Form.Group controlId='formBasicPassword'>
            <Form.Label>Şifreniz</Form.Label>
            <Form.Control
              type='password'
              className={inputClass}
              placeholder='Şifreniz'
              name='password'
              value={inputs.password}
              onChange={onChange}
              minLength='6'
            />
          </Form.Group>
          <Form.Group controlId='formBasicPassword2'>
            {/*<Form.Label>Şifreniz</Form.Label>*/}
            <Form.Control
              type='password'
              className={inputClass}
              placeholder='Şifreniz (tekrar)'
              name='password2'
              value={inputs.password2}
              onChange={onChange}
              minLength='6'
            />
          </Form.Group>
          {/*<Form.Group controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Check me out" />
          </Form.Group>*/}
          <Form.Group>
            <ReCAPTCHA
              sitekey='6LcrQbQZAAAAAAp_c-tvX77NXuLHxlBIh5pAixnP'
              onChange={(e) => setToken(e)}
            />
          </Form.Group>
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
              'Kayıt Ol'
            )}
          </Button>
        </Form>
        <p className='my-1'>
          Zaten üye misiniz? <Link to='/login'>Giriş yapın</Link>
        </p>
      </Col>
    </Row>
  );
};

export default Register;
