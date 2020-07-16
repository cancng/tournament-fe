import React from 'react';
import { Media } from 'react-bootstrap';
import { useStoreState } from 'easy-peasy';
import moment from 'moment';
import Moment from 'react-moment';
const Profile = () => {
  // Redux Store States
  const user = useStoreState((state) => state.auth.user);
  return (
    <Media>
      <img
        width={150}
        height={150}
        className='mr-3'
        src={user.avatar}
        alt='profile'
      />
      <Media.Body>
        <h5>Hoşgeldiniz, {user.name}</h5>
        <ul>
          <li>Adınız: {user.name}</li>
          <li>E-posta: {user.email}</li>
          <li>
            Kayıt Tarihiniz:{' '}
            <Moment format='DD/MM/YYYY'>{moment.utc(user.date)}</Moment>
          </li>
        </ul>
      </Media.Body>
    </Media>
  );
};

export default Profile;
