import React, { useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Col, Row } from 'react-bootstrap';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { useHistory } from 'react-router-dom';

const ActivateAccount = (props) => {
  const { push } = useHistory();
  const isAuthenticated = useStoreState((state) => state.auth.isAuthenticated);

  const activateAccount = useStoreActions(
    (actions) => actions.auth.activateAccount
  );

  useEffect(() => {
    // console.log(props.match.params.userToken);
    if (!isAuthenticated)
      activateAccount({ userToken: props.match.params.userToken, push });
  }, []);
  return isAuthenticated ? (
    <>
      <Row>
        <Col>
          <h1>Geçersiz Sayfa!</h1>
          <Link to='/' className='btn btn-primary'>
            Geri Dön
          </Link>
        </Col>
      </Row>
    </>
  ) : (
    <Redirect to='/' />
  );
};

export default ActivateAccount;
