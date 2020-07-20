import React, { useEffect } from 'react';
import Moment from 'react-moment';
import moment from 'moment';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { Table, Form, Spinner, Row, Alert, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import DeleteModal from './DeleteModal';

const AdminTournaments = () => {
  // Redux store states
  const tournaments = useStoreState((state) => state.tournament.tournaments);
  const loading = useStoreState((state) => state.tournament.loading);

  // Redux store actions
  const fetchAll = useStoreActions(
    (actions) => actions.tournament.fetchAllTournaments
  );
  const switchTournamentStatus = useStoreActions(
    (actions) => actions.tournament.switchTournamentStatus
  );

  const onSwitchChange = (e) => {
    switchTournamentStatus(e.target.id);
  };
  //
  useEffect(() => {
    fetchAll();
  }, []);
  return (
    <>
      <Row>
        <Col>
          <h1>Admin Paneli</h1>
          <p>
            Oluşturduğunuz turnuvaları listeleyebilir, aktiflik durumlarını
            yönetebilir veya turnuvayı silebilirsiniz. İsterseniz yeşil renkli
            Turnuva Oluştur butonu ile yeni bir turnuva oluşturabilirsiniz.
          </p>
          <Link
            to='/new-tournament'
            className='float-right btn btn-success btn-sm mb-3'
          >
            <i className='fas fa-plus' /> Turnuva Oluştur
          </Link>
        </Col>
      </Row>

      {loading ? (
        <Row className='justify-content-center'>
          <Spinner animation='border' />
        </Row>
      ) : tournaments.length === 0 ? (
        <Row className='justify-content-center'>
          <Alert variant='danger' className='text-dark'>
            Kayıtlarda hiçbir turnuva yok <span role="img" aria-label="sad">😥</span> Yeni bir turnuva oluşturabilirsin.
          </Alert>
        </Row>
      ) : (
        <Row>
          <Col xs={12}>
            <Table bordered size='sm' responsive className='text-center'>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Turnuva Adı</th>
                  <th>Turnuva Tarihi</th>
                  <th>Takım Sayısı</th>
                  <th>Turnuva Durumu</th>
                  <th>İşlemler</th>
                </tr>
              </thead>
              <tbody>
                {tournaments.map((tournament) => (
                  <tr key={tournament._id}>
                    <td>
                      <Link to={`/tournamentdetail/${tournament._id}`}>
                        {tournament._id}{' '}
                        <i className='fas fa-external-link-alt' />
                      </Link>
                    </td>
                    <td>{tournament.name}</td>
                    <td>
                      <Moment format='DD/MM/YYYY'>
                        {moment.utc(tournament.eventDate)}
                      </Moment>
                    </td>
                    <td>{tournament.teams.length}</td>
                    <td>
                      <Form.Check
                        type='switch'
                        id={tournament._id}
                        checked={tournament.isActive}
                        onChange={onSwitchChange}
                        label=''
                      />
                    </td>
                    <td>
                      <DeleteModal tournament={tournament} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      )}
    </>
  );
};

export default AdminTournaments;
