import React from 'react';
import { Link } from 'react-router-dom';
import { FiPlus, FiArrowRight } from 'react-icons/fi';
import 'leaflet/dist/leaflet.css';
import { Map as LeafMap, TileLayer, Marker, Popup } from 'react-leaflet';

import mapMarkerImg from '../../assets/map-marker.svg';

import { Container, Aside, Header, Footer } from './styles';
import mapIcon from '../../utils/mapIcon';

const Map: React.FC = () => {
  return (
    <Container>
      <Aside>
        <Header>
          <img src={mapMarkerImg} alt="Happy" />

          <h2>Escolha um orfanato no mapa</h2>
          <p>Muitas crianças estão esperando a sua visita :)</p>
        </Header>

        <Footer>
          <strong>Potim</strong>
          <strong>São Paulo</strong>
        </Footer>
      </Aside>

      <LeafMap
        center={[-22.8436402, -45.2583467]}
        zoom={15}
        style={{ width: '100%', height: '100%' }}
      >
        <TileLayer
          url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
        />

        <Marker icon={mapIcon} position={[-22.8436402, -45.2583467]}>
          <Popup
            closeButton={false}
            minWidth={240}
            maxWidth={240}
            className="map-popup"
          >
            Lar das meninas
            <Link to="/details">
              <FiArrowRight size={20} color="#FFF" />
            </Link>
          </Popup>
        </Marker>
      </LeafMap>

      <Link to="create">
        <FiPlus size={32} color="#FFF" />
      </Link>
    </Container>
  );
};

export default Map;
