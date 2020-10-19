import React, {useCallback} from 'react';
import {View} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {BorderlessButton} from 'react-native-gesture-handler';

import {useNavigation} from '@react-navigation/native';
import {Container, Title} from './styles';

interface HeaderProps {
  title: string;
  showCancel?: boolean;
}

const Header: React.FC<HeaderProps> = ({title, showCancel = true}) => {
  const navigation = useNavigation();

  const handleBackToHome = useCallback(() => {
    navigation.navigate('Map');
  }, [navigation]);

  return (
    <Container>
      <BorderlessButton onPress={navigation.goBack}>
        <Icon name="arrow-left" size={24} color="#15b6d6" />
      </BorderlessButton>

      <Title>{title}</Title>

      {showCancel ? (
        <BorderlessButton onPress={handleBackToHome}>
          <Icon name="x" size={24} color="#15b6d6" />
        </BorderlessButton>
      ) : (
        <View />
      )}
    </Container>
  );
};

export default Header;
