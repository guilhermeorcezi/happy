import React from 'react';
import {View, ScrollView, Text, StyleSheet, Dimensions} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import FeatherIcon from 'react-native-vector-icons/Feather';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

import {RectButton} from 'react-native-gesture-handler';
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

const OrphanageDetails: React.FC = () => {
  return (
    <Container>
      <ImagesContainer>
        <ScrollView horizontal pagingEnabled>
          <Image
            style={styles.image}
            source={{
              uri: 'https://fmnova.com.br/images/noticias/safe_image.jpg',
            }}
          />
          <Image
            style={styles.image}
            source={{
              uri: 'https://fmnova.com.br/images/noticias/safe_image.jpg',
            }}
          />
          <Image
            style={styles.image}
            source={{
              uri: 'https://fmnova.com.br/images/noticias/safe_image.jpg',
            }}
          />
        </ScrollView>
      </ImagesContainer>

      <DetailsContainer>
        <Title>Orf. Esperança</Title>
        <Description>
          Presta assistência a crianças de 06 a 15 anos que se encontre em
          situação de risco e/ou vulnerabilidade social.
        </Description>

        <MapContainer>
          <MapView
            initialRegion={{
              latitude: -27.2092052,
              longitude: -49.6401092,
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
                latitude: -27.2092052,
                longitude: -49.6401092,
              }}
            />
          </MapView>

          <RoutesContainer>
            <RoutesText>Ver rotas no Google Maps</RoutesText>
          </RoutesContainer>
        </MapContainer>

        <Separator />

        <Title>Instruções para visita</Title>
        <Description>
          Venha como se sentir a vontade e traga muito amor e paciência para
          dar.
        </Description>

        <ScheduleContainer>
          <ScheduleItem isBlue>
            <FeatherIcon name="clock" size={40} color="#2AB5D1" />
            <ScheduleText isBlue>Segunda à Sexta 8h às 18h</ScheduleText>
          </ScheduleItem>
          <ScheduleItem isGreen>
            <FeatherIcon name="info" size={40} color="#39CC83" />
            <ScheduleText isGreen>Atendemos fim de semana</ScheduleText>
          </ScheduleItem>
        </ScheduleContainer>

        <ContactButton onPress={() => {}}>
          <FontAwesomeIcon name="whatsapp" size={24} color="#FFF" />
          <ContactButtonText>Entrar em contato</ContactButtonText>
        </ContactButton>
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
