import React, {useCallback, useState, useEffect} from 'react';
import {StyleSheet, Dimensions} from 'react-native';

import MapView, {Marker, Callout, PROVIDER_GOOGLE} from 'react-native-maps';
import Icon from 'react-native-vector-icons/Feather';

import {useNavigation} from '@react-navigation/native';
import {or} from 'react-native-reanimated';
import mapMarker from '../../assets/map-marker.png';

import {
  Container,
  CalloutContainer,
  CalloutText,
  Footer,
  FooterText,
  CreateButton,
} from './styles';
import api from '../../services/api';

interface Orphanage {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
}

const Map: React.FC = () => {
  const [orphanages, setOrphanages] = useState<Orphanage[]>([]);
  const navigation = useNavigation();

  useEffect(() => {
    api.get('orphanages').then((response) => {
      setOrphanages(response.data);
    });
  }, []);

  const handleNavigateToDetails = useCallback(
    (id: number) => {
      navigation.navigate('OrphanageDetails');
    },
    [navigation],
  );

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
        {orphanages.map((orphanage) => (
          <Marker
            key={orphanage.id}
            icon={mapMarker}
            calloutAnchor={{x: 2.7, y: 0.8}}
            coordinate={{
              latitude: orphanage.latitude,
              longitude: orphanage.longitude,
            }}>
            <Callout
              tooltip
              onPress={() => handleNavigateToDetails(orphanage.id)}>
              <CalloutContainer>
                <CalloutText>{orphanage.name}</CalloutText>
              </CalloutContainer>
            </Callout>
          </Marker>
        ))}
      </MapView>

      <Footer>
        <FooterText>
          {orphanages.length} orfanatos encontrados
        </FooterText>
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
