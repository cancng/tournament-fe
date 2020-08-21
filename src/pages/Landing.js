import React, { useEffect } from 'react';
import banner from '../banner.png';
import { Col, Row, Table, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useStoreState, useStoreActions } from 'easy-peasy';
import Moment from 'react-moment';
import moment from 'moment';


const Landing = () => {
  // Redux store states
  const tournaments = useStoreState((state) => state.tournament.tournaments);
  const loading = useStoreState((state) => state.tournament.loading);
  const isLogged = useStoreState((state) => state.auth.isAuthenticated);

  // Redux store actions
  const fetchAll = useStoreActions(
    (actions) => actions.tournament.fetchAllTournaments
  );
  // const setError = useStoreActions((actions) => actions.tournament.setErrors);

  useEffect(() => {
    fetchAll();
  }, []);

  return (
    <>
      <Row className='mb-5'>
        <Col>
          <img src={banner} alt='landing banner' style={{ width: '100%' }} />
        </Col>
      </Row>

      <Row className='text-center'>
        <Col md={4} xs={12}>
          <i className='fas fa-user fa-2x text-primary' />
          <p>
            Turnuva kayıt sistemi ile turnuvalara kolayca kayıt olabilir ve
            karışıklık oluşmasını önleyebilirsiniz. Üyelik sistemi sayesinde
            kayıt olduğunuz turnuvalar direk olarak organizatöre gösterilir ve
            onaydan geçer.
          </p>
        </Col>
        <Col md={4} xs={12}>
          <i className='fab fa-discord fa-2x text-primary' />
          <p>
            Kayıt olduktan sonra ilgili Discord sunucusuna giderek işlemlerinizi
            hızlıca başlatın. Organizatöre ulaşamadığınız durumlarda kontrol
            panelinizden destek talebi oluşturabilirsiniz.
          </p>
        </Col>
        <Col md={4} xs={12}>
          <i className='fas fa-check-circle fa-2x text-primary' />
          <p>
            Kullanımı kolay olması sebebiyle hiçbir karışıklığa sebebiyet
            vermeden turnuva kayıt veya turnuvadan kayıt sildirme işlemlerinizi
            kullanıcı panelinizden yapabilirsiniz.
          </p>
        </Col>
      </Row>
      <hr />
      <Row>
        <Col md={{ span: 6, offset: 3 }} xs={12}>
          <h2>Aktif Turnuva Listesi</h2>
          <p>Sisteme kayıt olarak turnuvalara katılabilirsiniz. </p>
          {/* <Spinner animation='border' variant='secondary' /> */}
          {loading ? (
            <Spinner
              animation='border'
              variant='secondary'
              className='m-auto d-block'
            />
          ) : (
            <Table size='sm'>
              <thead>
                <tr>
                  <th>Turnuva Adı</th>
                  <th>Turnuva Tarihi</th>
                  <th>Aktiflik</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {tournaments.map((tournament) => (
                  <tr key={tournament._id}>
                    <td>{tournament.name}</td>
                    <td>
                      <Moment format='DD/MM/YYYY'>
                        {moment.utc(tournament.eventDate)}
                      </Moment>
                    </td>
                    <td>
                      <Spinner
                        animation='grow'
                        variant={tournament.isActive ? 'success' : 'dark'}
                      />
                    </td>
                    <td>
                      <Link
                        to={isLogged ? '/tournaments' : '/login'}
                        className='btn btn-primary btn-sm'
                      >
                        {isLogged ? 'Kayıt Ol' : 'Giriş Yap'}
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Col>
      </Row>
    </>
  );
};

export default Landing;
