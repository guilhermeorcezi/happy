import React, {useEffect, useState, useCallback} from 'react';
import {ScrollView, StyleSheet, Dimensions, Linking} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import FeatherIcon from 'react-native-vector-icons/Feather';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

import {useRoute} from '@react-navigation/native';

import mapMarkerImg from '../../assets/map-marker.png';

import {
  Container,
  ImagesContainer,
  Image,
  DetailsContainer,
  Title,
  Description,
  MapContainer,
  RoutesContainer,
  RoutesText,
  Separator,
  ScheduleContainer,
  ScheduleItem,
  ScheduleText,
  ContactButton,
  ContactButtonText,
} from './styles';
import api from '../../services/api';

interface OrphanageDetailsParams {
  id: number;
}

interface Orphanage {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  about: string;
  instructions: string;
  opening_hours: string;
  open_on_weekends: boolean;
  images: Array<{
    id: number;
    url: string;
  }>;
}

const OrphanageDetails: React.FC = () => {
  const [orphanage, setOrphanage] = useState<Orphanage>();

  const route = useRoute();
  const params = route.params as OrphanageDetailsParams;

  useEffect(() => {
    api.get(`orphanages/${params.id}`).then((response) => {
      setOrphanage(response.data);
    });
  }, [params.id]);

  if (!orphanage) {
    return (
      <Container>
        <Description>Carregando...</Description>
      </Container>
    );
  }

  const handleOpenGoogleMapRoutes = () => {
    Linking.openURL(
      `https://www.google.com/maps/dir/?api=1&destination=${orphanage?.latitude},${orphanage?.longitude}`,
    );
  };

  return (
    <Container>
      <ImagesContainer>
        <ScrollView horizontal pagingEnabled>
          {orphanage.images.map((image) => (
            <Image
              key={image.id}
              style={styles.image}
              source={{
                uri: image.url,
              }}
            />
          ))}
        </ScrollView>
      </ImagesContainer>

      <DetailsContainer>
        <Title>{orphanage.name}</Title>
        <Description>{orphanage.about}</Description>

        <MapContainer>
          <MapView
            initialRegion={{
              latitude: Number(orphanage.latitude),
              longitude: Number(orphanage.longitude),
              latitudeDelta: 0.008,
              longitudeDelta: 0.008,
            }}
            zoomEnabled={false}
            pitchEnabled={false}
            scrollEnabled={false}
            rotateEnabled={false}
            style={styles.mapStyle}>
            <Marker
              icon={mapMarkerImg}
              coordinate={{
                latitude: Number(orphanage.latitude),
                longitude: Number(orphanage.longitude),
              }}
            />
          </MapView>

          <RoutesContainer onPress={handleOpenGoogleMapRoutes}>
            <RoutesText>Ver rotas no Google Maps</RoutesText>
          </RoutesContainer>
        </MapContainer>

        <Separator />

        <Title>Instruções para visita</Title>
        <Description>{orphanage.instructions}</Description>

        <ScheduleContainer>
          <ScheduleItem isBlue>
            <FeatherIcon name="clock" size={40} color="#2AB5D1" />
            <ScheduleText isBlue>
              Segunda à Sexta {orphanage.opening_hours}
            </ScheduleText>
          </ScheduleItem>

          {orphanage.open_on_weekends ? (
            <ScheduleItem isGreen>
              <FeatherIcon name="info" size={40} color="#a1e9c5" />
              <ScheduleText isGreen>Atendemos fim de semana</ScheduleText>
            </ScheduleItem>
          ) : (
            <ScheduleItem isRed>
              <FeatherIcon name="info" size={40} color="#FF669D" />
              <ScheduleText isRed>Não atendemos fim de semana</ScheduleText>
            </ScheduleItem>
          )}
        </ScheduleContainer>

        {/* <ContactButton onPress={() => {}}>
          <FontAwesomeIcon name="whatsapp" size={24} color="#FFF" />
          <ContactButtonText>Entrar em contato</ContactButtonText>
        </ContactButton> */}
      </DetailsContainer>
    </Container>
  );
};

export default OrphanageDetails;

const styles = StyleSheet.create({
  image: {
    width: Dimensions.get('window').width,
    resizeMode: 'cover',
  },

  mapStyle: {
    width: '100%',
    height: 150,
  },
});
