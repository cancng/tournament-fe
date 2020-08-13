import React from 'react';
import { Col, Row } from 'react-bootstrap';

const About = () => {
  return (
    <>
      <Row className='mb-5'>
        <Col>
          <h1>Hakkımızda</h1>
          <hr />
          <p>
            Turnuva kayıt sistemi, Riot Games etkinlikler sayfasını kapattığı
            için tarafımızca yapılmış bir sistemdir. Sistem basit olarak bizim
            tarafımızdan turnuvalar oluşturulmasını, sizlerin ise takımlarınızı
            kaydetmeleriniz için yapılmıştır. Sisteme giriş yaparak aktif
            turnuvaları görebilir, kayıt yapabilir veya kayıt yaptığınız
            turnuvadan çekilebilirsiniz. Sorularınız için{' '}
            <a
              href='https://bit.ly/dcturnuva'
              target='_blank'
              rel='noopener noreferrer'
            >
              Discord kanalımıza
            </a>{' '}
            gelebilirsiniz.
          </p>
          <p>
            Eğer bu sistemi kendi sayfanızda kullanmak isterseniz de iletişime
            geçebilirsiniz. Detaylı iletişim için{' '}
            <a
              href='https://bit.ly/dcturnuva'
              target='_blank'
              rel='noopener noreferrer'
            >
              Discord kanalımıza
            </a>{' '}
            veya <code>admin@lolyama.com</code> e-posta adresinden iletişime
            geçebilirsiniz
          </p>
          {/*<p className='lead display-4 text-center'>Turnuva Kayıt Sistemi</p>*/}
        </Col>
      </Row>
    </>
  );
};

export default About;
