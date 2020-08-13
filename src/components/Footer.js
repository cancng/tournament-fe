import React from 'react';

const Footer = () => {
  return (
    <footer className='py-5 bg-dark'>
      <div className='container'>
        <div className='row'>
          <div className='col-lg-6 h-100 text-center text-lg-left my-auto'>
            <p className='text-white small mb-4 mb-lg-0'>
              &copy; Turnuva Kayıt {new Date().getUTCFullYear()}. Tüm hakları
              saklıdır.
            </p>
          </div>
          <div className='col-lg-6 h-100 text-center text-lg-right my-auto'>
            <ul className='list-inline mb-0'>
              <li className='list-inline-item mr-3'>
                <a
                  href='https://www.facebook.com/lolyamacom'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <i className='fab fa-facebook fa-2x fa-fw text-white' />
                </a>
              </li>
              <li className='list-inline-item mr-3'>
                <a
                  href='https://discord.gg/sRFAtjv'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <i className='fab fa-discord fa-2x fa-fw text-white' />
                </a>
              </li>
              <li className='list-inline-item'>
                <a
                  href='https://www.instagram.com/lol.yama/'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <i className='fab fa-instagram fa-2x fa-fw text-white' />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
