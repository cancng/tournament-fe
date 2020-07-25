import React from 'react';
import banner from '../banner.png';
import { Col, Row } from 'react-bootstrap';

const Landing = () => {
  return (
    <>
      <Row className='mb-5'>
        <Col>
          <img src={banner} alt='landing banner' style={{ width: '100%' }} />
          {/*<p className='lead display-4 text-center'>Turnuva Kayıt Sistemi</p>*/}
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
      {/*Footer*/}
      <footer className='footer bg-light'>
        <div className='container'>
          <div className='row'>
            <div className='col-lg-6 h-100 text-center text-lg-left my-auto'>
              <p className='text-muted small mb-4 mb-lg-0'>
                &copy; Turnuva Kayıt {new Date().getUTCFullYear()}. Tüm hakları
                saklıdır.
              </p>
            </div>
            <div className='col-lg-6 h-100 text-center text-lg-right my-auto'>
              <ul className='list-inline mb-0'>
                <li className='list-inline-item mr-3'>
                  <a href='https://www.facebook.com/lolyamacom'>
                    <i className='fab fa-facebook fa-2x fa-fw' />
                  </a>
                </li>
                <li className='list-inline-item mr-3'>
                  <a href='https://discord.gg/sRFAtjv'>
                    <i className='fab fa-discord fa-2x fa-fw' />
                  </a>
                </li>
                <li className='list-inline-item'>
                  <a href='https://www.instagram.com/lol.yama/'>
                    <i className='fab fa-instagram fa-2x fa-fw' />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Landing;
