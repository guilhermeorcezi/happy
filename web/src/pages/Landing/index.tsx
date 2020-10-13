import React from 'react';

import { FiArrowRight } from 'react-icons/fi';

import { Link } from 'react-router-dom';
import { Container, Content, Main, Location } from './styles';

import logoImg from '../../assets/logo.svg';

const Landing: React.FC = () => {
  return (
    <Container>
      <Content>
        <img src={logoImg} alt="Happy" />

        <Main>
          <h1>Leve felicidade para o mundo</h1>
          <p>Visite orfanatos e mude o dia de muitas crianças.</p>
        </Main>

        <Location>
          <strong>Potim</strong>
          <span>São Paulo</span>
        </Location>

        <Link to="find">
          <FiArrowRight size={26} color="rgba(0,0,0,0.6)" />
        </Link>
      </Content>
    </Container>
  );
};

export default Landing;
