import React, { useEffect, useState } from 'react';
import { Alert, Button, Col, Form, Row, Spinner } from 'react-bootstrap';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { Link, Redirect } from 'react-router-dom';
import ReCAPTCHA from 'react-google-recaptcha';
import swal from 'sweetalert';

const Login = () => {
  const [inputs, setInputs] = useState({ email: '', password: '' });
  const [token, setToken] = useState(null);
  const [error, setError] = useState('');

  // redux store states
  const errors = useStoreState((state) => state.auth.errors);
  const isLoading = useStoreState((state) => state.auth.loading);
  const isAuthenticated = useStoreState((state) => state.auth.isAuthenticated);
  const swalMsg = useStoreState((state) => state.auth.swalMsg);

  //redux store actions
  const submitLogin = useStoreActions((actions) => actions.auth.loginUser);
  const setSwalMsg = useStoreActions((actions) => actions.auth.setSwalMsg);
  const onChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };
  const formOnSubmit = (e) => {
    e.preventDefault();
    if (inputs.email !== '' && inputs.password !== '') {
      setError('');
      submitLogin({ ...inputs, captcha: token });
    } else setError('Formdaki alanları doldurunuz.');
  };

  useEffect(() => {
    if (swalMsg.msg)
      swal('', swalMsg.msg, swalMsg.type).then((r) => {
        setSwalMsg({ head: null, msg: null, type: null });
      });
  }, [swalMsg]);

  if (isAuthenticated) {
    return <Redirect to='/' />;
  }

  return (
    <Row>
      <Col md={{ span: 6, offset: 3 }}>
        <h1>Giriş Yap</h1>
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
              Kayıt olduğunuz e-posta adresinizi giriniz.
            </Form.Text>
          </Form.Group>

          <Form.Group controlId='formBasicPassword'>
            <Form.Label>Şifreniz</Form.Label>
            <Form.Control
              type='password'
              placeholder='Şifrenizi girin...'
              name='password'
              value={inputs.password}
              onChange={onChange}
              minLength='6'
            />
          </Form.Group>
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
              'Gönder'
            )}
          </Button>
        </Form>
        <p className='my-1'>
          Üyeliğiniz yok mu? <Link to='/register'>Kayıt olun</Link>
        </p>
      </Col>
    </Row>
  );
};

export default Login;
