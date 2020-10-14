import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiPlus, FiArrowRight } from 'react-icons/fi';
import 'leaflet/dist/leaflet.css';
import { Map as LeafMap, TileLayer, Marker, Popup } from 'react-leaflet';

import mapMarkerImg from '../../assets/map-marker.svg';

import { Container, Aside, Header, Footer } from './styles';
import mapIcon from '../../utils/mapIcon';
import api from '../../services/api';

interface IOrphanage {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
}

const Map: React.FC = () => {
  const [orphanages, setOrphanages] = useState<IOrphanage[]>([]);

  useEffect(() => {
    api.get('orphanages').then(response => {
      console.log(response.data);
      setOrphanages(response.data);
    });
  }, []);

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

        {orphanages.map(orphanage => (
          <Marker
            icon={mapIcon}
            key={orphanage.id}
            position={[orphanage.latitude, orphanage.longitude]}
          >
            <Popup
              closeButton={false}
              minWidth={240}
              maxWidth={240}
              className="map-popup"
            >
              {orphanage.name}
              <Link to={`orphanage/${orphanage.id}`}>
                <FiArrowRight size={20} color="#FFF" />
              </Link>
            </Popup>
          </Marker>
        ))}
      </LeafMap>

      <Link to="create">
        <FiPlus size={32} color="#FFF" />
      </Link>
    </Container>
  );
};

export default Map;
