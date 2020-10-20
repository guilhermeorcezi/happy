import React, {useCallback, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {StyleSheet, Dimensions} from 'react-native';

import MapView, {MapEvent, Marker} from 'react-native-maps';

import mapMarkerImg from '../../../assets/map-marker.png';

import {Container, NextButton, NextButtonText} from './styles';

const SelectMapPosition: React.FC = () => {
  const navigation = useNavigation();
  const [position, setPosition] = useState({latitude: 0, longitude: 0});

  const handleNextStep = useCallback(() => {
    navigation.navigate('OrphanageData', {position});
  }, [navigation, position]);

  const handleSelectMapPosition = useCallback((event: MapEvent) => {
    setPosition(event.nativeEvent.coordinate);
  }, []);

  return (
    <Container>
      <MapView
        initialRegion={{
          latitude: -22.8434484,
          longitude: -45.2573658,
          latitudeDelta: 0.008,
          longitudeDelta: 0.008,
        }}
        style={styles.mapStyle}
        onPress={handleSelectMapPosition}>
        {position.latitude !== 0 && (
          <Marker
            icon={mapMarkerImg}
            coordinate={{
              latitude: position.latitude,
              longitude: position.longitude,
            }}
          />
        )}
      </MapView>

      <NextButton onPress={handleNextStep}>
        <NextButtonText>Próximo</NextButtonText>
      </NextButton>
    </Container>
  );
};

export default SelectMapPosition;

const styles = StyleSheet.create({
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
