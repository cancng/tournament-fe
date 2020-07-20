import React, { useEffect } from 'react';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { Alert, Card, Col, Row, Spinner } from 'react-bootstrap';
import Moment from 'react-moment';
import moment from 'moment';
import RegisterModal from '../components/RegisterModal';
import LeaveModal from '../components/LeaveModal';

const Tournaments = () => {
  // Redux store states
  const tournaments = useStoreState((state) => state.tournament.tournaments);
  const loading = useStoreState((state) => state.tournament.loading);
  const errors = useStoreState((state) => state.tournament.errors);
  const customError = useStoreState((state) => state.tournament.customError);
  const loggedUser = useStoreState((state) => state.auth.user);
  const registeredTournaments = useStoreState(
    (state) => state.tournament.registeredTournaments
  );

  // Redux store actions
  const fetchAll = useStoreActions(
    (actions) => actions.tournament.fetchAllTournaments
  );
  const setError = useStoreActions((actions) => actions.tournament.setErrors);

  //
  useEffect(() => {
    fetchAll(loggedUser._id);
    setError([]);
  }, []);

  return (
    <>
      <Row>
        <div>
          <h2>Turnuvalar</h2>
          <p className='text-muted'>
            Kayıt olabileceğiniz turnuvalar aşağıda listelenmiştir.
          </p>
        </div>
      </Row>
      {loading ? (
        <Row className='justify-content-center'>
          <Spinner animation='border' />
        </Row>
      ) : tournaments.length === 0 ? (
        <Alert variant='danger' className='text-dark'>
          Kayıtlarda hiçbir turnuva yok <span role="img" aria-label="sad">😥</span>
        </Alert>
      ) : (
        <>
          <Row>
            <Col xs={12}>
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
            </Col>
            <Col xs={12}>
              {customError.msg.length > 0 && (
                <Alert variant={customError.type} className='text-center'>
                  {customError.msg}
                </Alert>
              )}
            </Col>
          </Row>
          <Row className='text-center'>
            {tournaments.map((tournament) => (
              <Col md={4} xs={12} className='mb-3' key={tournament._id}>
                <Card>
                  <Card.Header as='h5'>{tournament.name}</Card.Header>
                  <Card.Body>
                    <Card.Title>
                      Turnuva Tarihi:{' '}
                      <Moment format='DD/MM/YYYY'>
                        {moment.utc(tournament.eventDate)}
                      </Moment>
                    </Card.Title>
                    <RegisterModal
                      tournament={tournament}
                      // isRegistered={regTeam}
                    />
                    {tournament.isActive &&
                      registeredTournaments.map(
                        (tournamentt) =>
                          tournament._id === tournamentt.tournamentId && (
                            <React.Fragment key={tournamentt.tournamentId}>
                              <p
                                className='text-muted'
                                style={{ marginBottom: '3px' }}
                              >
                                Zaten kayıtlı
                              </p>
                              <LeaveModal tournamentt={tournamentt} />
                            </React.Fragment>
                          )
                      )}
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </>
      )}
    </>
  );
};

export default Tournaments;
