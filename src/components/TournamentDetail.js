import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { Row, Col, Spinner, Table, Alert } from 'react-bootstrap';
import Moment from 'react-moment';
import moment from 'moment';
import ParticipantsModal from './ParticipantsModal';

const TournamentDetail = () => {
  const params = useParams();

  // Redux Store States
  const selectedTournament = useStoreState(
    (state) => state.tournament.selectedTournament
  );
  const loading = useStoreState((state) => state.tournament.loading);
  const customMsg = useStoreState((state) => state.tournament.customError);

  // Redux Store Actions
  const setSelectedTournament = useStoreActions(
    (actions) => actions.tournament.fetchTournament
  );
  useEffect(() => {
    setSelectedTournament(params.tournamentId);
  }, [params.tournamentId]);
  return (
    <>
      <Row>
        {/*<Button variant='primary' onClick={yenile}>
          yenile
        </Button>*/}
        <Col>
          <h2 className='text-center mb-5'>Turnuva Detayı</h2>
          {customMsg.msg.length > 0 && (
            <Alert variant={customMsg.type}>{customMsg.msg}</Alert>
          )}

          {loading ? (
            <Row className='justify-content-center'>
              <Spinner animation='border' variant='danger' />
            </Row>
          ) : (
            <Table bordered size='sm' responsive className='text-center'>
              <thead>
                <tr>
                  <th>Turnuva ID</th>
                  <th>Turnuva Adı</th>
                  <th>Turnuva Tarihi</th>
                  <th>Turnuva Aktif?</th>
                  <th>Kayıtlı Takımlar</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{selectedTournament._id}</td>
                  <td>{selectedTournament.name}</td>
                  <td>
                    <Moment format='DD/MM/YYYY'>
                      {moment.utc(selectedTournament.eventDate)}
                    </Moment>
                  </td>
                  <td>
                    {selectedTournament.isActive ? (
                      <i className='fas fa-check text-success' />
                    ) : (
                      <i className='fas fa-times text-danger' />
                    )}
                  </td>
                  <td>
                    <ParticipantsModal
                      selectedTournament={selectedTournament}
                    />
                  </td>
                </tr>
              </tbody>
            </Table>
          )}
        </Col>
      </Row>
    </>
  );
};

export default TournamentDetail;
