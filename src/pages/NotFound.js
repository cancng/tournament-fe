import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <>
      <h1 className='x-large text-primary'>
        <i className='fas fa-exclamation-triangle' /> Sayfa bulunamadı
      </h1>
      <p className='large'>
        Üzgünüm girmek istediğin sayfayı bulamadık, anasayfaya gitmek için
        <Link to='/'> buraya tıkla.</Link>
      </p>
    </>
  );
};

export default NotFound;
