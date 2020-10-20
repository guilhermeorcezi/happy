import React, {useState, useCallback} from 'react';

import {Alert, Switch} from 'react-native';
import ImagePicker from 'react-native-image-picker';

import Icon from 'react-native-vector-icons/Feather';

import {useNavigation, useRoute} from '@react-navigation/native';
import {
  Container,
  Title,
  Label,
  Input,
  ImagesInput,
  SwitchContainer,
  NextButton,
  NextButtonText,
  UploadedImagesContainer,
  UploadedImage,
} from './styles';
import api from '../../../services/api';

interface OrphanageDataRouteParams {
  position: {
    latitude: number;
    longitude: number;
  };
}

const OrphanageData: React.FC = () => {
  const [name, setName] = useState('');
  const [about, setAbout] = useState('');
  const [instructions, setInstructions] = useState('');
  const [opening_hours, setOpeningHours] = useState('');
  const [open_on_weekends, setOpenOnWeekends] = useState(true);
  const [images, setImages] = useState<string[]>([]);

  const navigation = useNavigation();
  const route = useRoute();
  const params = route.params as OrphanageDataRouteParams;

  const handleCreateOrphanage = useCallback(async () => {
    const {latitude, longitude} = params.position;

    const data = new FormData();

    data.append('name', name);
    data.append('about', about);
    data.append('latitude', latitude);
    data.append('longitude', longitude);
    data.append('instructions', instructions);
    data.append('opening_hours', opening_hours);
    data.append('open_on_weekends', open_on_weekends);

    images.forEach((image, index) => {
      data.append('images', {
        name: `image_${index}.jpg`,
        type: 'image/jpg',
        uri: image,
      } as any);
    });

    await api.post('orphanages', data);

    navigation.navigate('Map');
  }, [
    name,
    about,
    instructions,
    opening_hours,
    open_on_weekends,
    navigation,
    images,
    params.position,
  ]);

  const handleSelectImages = useCallback(() => {
    ImagePicker.showImagePicker(
      {
        title: 'Selecionar imagem',
        cancelButtonTitle: 'Cancelar',
        takePhotoButtonTitle: 'Usar câmera',
        chooseFromLibraryButtonTitle: 'Escolher da galeria',
      },
      (response) => {
        if (response.didCancel) {
          return;
        }

        if (response.error) {
          Alert.alert('Erro ao adicionar imagem', 'Tente novamente');
        }

        const {uri: image} = response;

        setImages([...images, image]);
      },
    );
  }, [images]);

  return (
    <Container contentContainerStyle={{padding: 24}}>
      <Title>Dados</Title>

      <Label>Nome</Label>
      <Input value={name} onChangeText={setName} />

      <Label>Sobre</Label>
      <Input
        value={about}
        onChangeText={setAbout}
        style={{height: 110}}
        multiline
      />

      {/* <Label>Whatsapp</Label>
      <Input /> */}

      <Label>Fotos</Label>

      {images && (
        <UploadedImagesContainer>
          {images.map((image, index) => {
            return <UploadedImage key={index} source={{uri: image}} />;
          })}
        </UploadedImagesContainer>
      )}

      <ImagesInput onPress={handleSelectImages}>
        <Icon name="plus" size={24} color="#15B6D6" />
      </ImagesInput>

      <Title>Visitação</Title>

      <Label>Instruções</Label>
      <Input
        value={instructions}
        onChangeText={setInstructions}
        style={{height: 110}}
        multiline
      />

      <Label>Horario de visitas</Label>
      <Input value={opening_hours} onChangeText={setOpeningHours} />

      <SwitchContainer>
        <Label>Atende final de semana?</Label>
        <Switch
          thumbColor="#fff"
          trackColor={{false: '#ccc', true: '#39CC83'}}
          value={open_on_weekends}
          onValueChange={setOpenOnWeekends}
        />
      </SwitchContainer>

      <NextButton onPress={handleCreateOrphanage}>
        <NextButtonText>Cadastrar</NextButtonText>
      </NextButton>
    </Container>
  );
};

export default OrphanageData;
