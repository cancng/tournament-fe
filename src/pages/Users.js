import React, { useEffect } from 'react';
import { Alert, Badge, Col, Form, Row, Spinner, Table } from 'react-bootstrap';
import { useStoreActions, useStoreState } from 'easy-peasy';
import Moment from 'react-moment';
import moment from 'moment';
import DeleteUserModal from '../components/DeleteUserModal';

const Users = () => {
  // Redux store states
  const loading = useStoreState((state) => state.user.loading);
  const users = useStoreState((state) => state.user.users);
  const customMsg = useStoreState((state) => state.user.customMsg);

  // Redux Store Actions
  const fetchUsers = useStoreActions((actions) => actions.user.fetchUsers);
  const setErrors = useStoreActions((actions) => actions.user.setErrors);
  const switchUserStatus = useStoreActions(
    (actions) => actions.user.switchUserStatus
  );

  const onSwitchChange = (e) => {
    switchUserStatus(e.target.id);
  };

  useEffect(() => {
    fetchUsers();
    setErrors([]);
  }, []);
  return (
    <>
      <Row>
        <div>
          <h2>Üyeler</h2>
          <p className='text-muted'>
            Siteye kayıtlı kullanıcılar aşağıda listelenmiştir.
          </p>
        </div>
      </Row>
      {loading ? (
        <Row className='justify-content-center'>
          <Spinner animation='border' />
        </Row>
      ) : users.length === 0 ? (
        <Row className='justify-content-center'>
          <Alert variant='danger' className='text-dark'>
            Sistemde henüz hiçbir üye yok.{' '}
            <span role='img' aria-label='sad'>
              😥
            </span>
          </Alert>
        </Row>
      ) : (
        <Row>
          <Col xs={12}>
            {customMsg.msg.length > 0 && (
              <Alert variant={customMsg.type} className='text-dark'>
                {customMsg.msg}
              </Alert>
            )}
            <Table bordered size='sm' responsive className='text-center'>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Üye Adı</th>
                  <th>Üye e-posta</th>
                  <th>Kayıt Tarihi</th>
                  <th>Üye aktif mi?</th>
                  <th>İşlemler</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id}>
                    <td>
                      {user.isAdmin === '1' ? (
                        <Badge variant='danger'>ADMINISTRATOR</Badge>
                      ) : (
                        user._id
                      )}
                    </td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                      <Moment format='DD/MM/YYYY'>
                        {moment.utc(user.date)}
                      </Moment>
                    </td>
                    <td>
                      <Form.Check
                        type='switch'
                        id={user._id}
                        checked={user.isActive}
                        onChange={onSwitchChange}
                        label=''
                        disabled={user.isAdmin === '1'}
                      />
                    </td>
                    <td>
                      <DeleteUserModal user={user} />
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

export default Users;
