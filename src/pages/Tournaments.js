import React, { useEffect, useState } from 'react';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { Alert, Card, Col, Row, Spinner } from 'react-bootstrap';
import Moment from 'react-moment';
import moment from 'moment';
import RegisterModal from '../components/RegisterModal';

const Tournaments = () => {
  const [regTeam, setRegTeam] = useState({
    name: '',
    registered: false,
    tournamentId: '',
  });

  // Redux store states
  const tournaments = useStoreState((state) => state.tournament.tournaments);
  const loading = useStoreState((state) => state.tournament.loading);
  const errors = useStoreState((state) => state.tournament.errors);
  const loggedUser = useStoreState((state) => state.auth.user);

  // Redux store actions
  const fetchAll = useStoreActions(
    (actions) => actions.tournament.fetchAllTournaments
  );
  const setError = useStoreActions((actions) => actions.tournament.setErrors);

  //
  useEffect(() => {
    fetchAll();
    setError([]);
  }, []);

  useEffect(() => {
    // const isRegistered =
    //   tournaments.teams &&
    //   tournaments.teams.find((team) => team.captain === loggedUser._id);
    tournaments.forEach((tournament) => {
      const deneme = tournament.teams.find(
        (team) => team.captain === loggedUser._id
      );
      // console.log(deneme);
      if (deneme !== undefined) {
        setRegTeam({
          name: deneme.name,
          registered: true,
          tournamentId: tournament._id,
        });
      }
    });
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
          Kayıtlarda hiçbir turnuva yok 😥
        </Alert>
      ) : (
        <>
          <Row>
            <Col xs={12}>
              {errors &&
                errors.map((error) => (
                  <Alert variant='danger' className='text-dark text-center'>
                    {error.msg}
                  </Alert>
                ))}
            </Col>
          </Row>
          <Row className='text-center'>
            {tournaments.map((tournament) => (
              <Col md={4} xs={12} className='mb-3' key={tournament._id}>
                <Card
                // border={tournament.isActive ? '' : 'danger'}
                >
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
                      isRegistered={regTeam}
                    />
                    {regTeam.tournamentId === tournament._id && (
                      <p className='text-muted'>
                        <span className='font-weight-bold'>{regTeam.name}</span>{' '}
                        takımı zaten kayıtlı.
                      </p>
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
