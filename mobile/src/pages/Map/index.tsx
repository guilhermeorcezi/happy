import React, {useCallback} from 'react';
import {StyleSheet, Dimensions} from 'react-native';

import MapView, {Marker, Callout, PROVIDER_GOOGLE} from 'react-native-maps';
import Icon from 'react-native-vector-icons/Feather';

import {useNavigation} from '@react-navigation/native';
import mapMarker from '../../assets/map-marker.png';

import {
  Container,
  CalloutContainer,
  CalloutText,
  Footer,
  FooterText,
  CreateButton,
} from './styles';

const Map: React.FC = () => {
  const navigation = useNavigation();

  const handleNavigateToDetails = useCallback(() => {
    navigation.navigate('OrphanageDetails');
  }, [navigation]);

  const handleNavigateToCreate = useCallback(() => {
    navigation.navigate('SelectMapPosition');
  }, [navigation]);

  return (
    <Container>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: -22.8434484,
          longitude: -45.2573658,
          latitudeDelta: 0.008,
          longitudeDelta: 0.008,
        }}>
        <Marker
          icon={mapMarker}
          calloutAnchor={{x: 2.7, y: 0.8}}
          coordinate={{
            latitude: -22.8434484,
            longitude: -45.2573658,
          }}>
          <Callout tooltip onPress={handleNavigateToDetails}>
            <CalloutContainer>
              <CalloutText>Lar das Meninas</CalloutText>
            </CalloutContainer>
          </Callout>
        </Marker>
      </MapView>

      <Footer>
        <FooterText>2 orfanatos encontrados</FooterText>
        <CreateButton onPress={handleNavigateToCreate}>
          <Icon name="plus" size={20} color="#FFF" />
        </CreateButton>
      </Footer>
    </Container>
  );
};

const styles = StyleSheet.create({
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

export default Map;
