import React from 'react';
import { Button, Col, Nav, Navbar, Row } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';
import { useStoreActions, useStoreState } from 'easy-peasy';
import tournament from '../tournament.png';

const AppNav = () => {
  // Redux store states
  const user = useStoreState((state) => state.auth.user);
  const isAuthenticated = useStoreState((state) => state.auth.isAuthenticated);
  // const loading = useStoreState((state) => state.auth.loading);

  // Redux store actions
  const logout = useStoreActions((actions) => actions.auth.setAuthError);
  const authedNav = (
    <>
      <Nav className='mr-auto'>
        <NavLink to='/' className='nav-link' exact>
          Anasayfa
        </NavLink>
        <NavLink to='/tournaments' className='nav-link'>
          Turnuvalar
        </NavLink>
      </Nav>
      <Nav>
        <Row>
          <Col>
            {user && user.isAdmin === '1' && (
              <NavLink to='/admin' className='btn btn-danger btn-sm'>
                <i className='fas fa-user-cog' /> Yönetici
              </NavLink>
            )}
            <NavLink to='/profile' className='btn btn-warning btn-sm ml-2'>
              <i className='fas fa-user text-dark' /> Profilim
            </NavLink>
            <Button
              onClick={logout}
              variant='danger'
              size='sm'
              className='ml-2'
            >
              Çıkış Yap
            </Button>
          </Col>
        </Row>
      </Nav>
    </>
  );
  const guestNav = (
    <>
      <Nav className='mr-auto'>
        <NavLink to='/' className='nav-link' exact>
          Anasayfa
        </NavLink>
        {/*<NavLink to='/' className='nav-link' disabled>
          Turnuvalar
        </NavLink>*/}
      </Nav>
      <Nav>
        <NavLink to='/login' className='btn btn-primary btn-sm'>
          <i className='fas fa-key' /> Giriş Yap
        </NavLink>
      </Nav>
    </>
  );
  return (
    <Navbar bg='dark' expand='lg' variant='dark' className='mb-3'>
      <Navbar.Brand>
        <Link to='/'>
          <img
            src={tournament}
            width='30'
            height='30'
            className='d-inline-block align-top'
            alt='Tournament'
          />
        </Link>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls='basic-navbar-nav' />
      <Navbar.Collapse id='basic-navbar-nav'>
        {isAuthenticated ? authedNav : guestNav}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default AppNav;
