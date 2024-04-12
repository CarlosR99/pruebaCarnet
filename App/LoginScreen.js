import React, { useState } from 'react';
import { Button, TextInput, View, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function LoginScreen() {
  const [codigo, setCodigo] = useState('');
  const [password, setPassword] = useState('');
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const handleLogin = () => {
    let formData = new FormData();
    formData.append('codigo', codigo);
    formData.append('password', password);
    formData.append('imagen', { uri: image, name: 'imagen.jpg', type: 'image/jpeg' });

    fetch('http://tu-servidor.com/api/login', {
      method: 'POST',
      body: formData,
    })
    .then((response) => response.json())
    .then((data) => {
      console.log('Éxito:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  };

  return (
    <View>
      <Button title="Seleccionar imagen" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
      <TextInput
        value={codigo}
        onChangeText={setCodigo}
        placeholder="Código"
      />
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="Contraseña"
        secureTextEntry
      />
      <Button title="Iniciar sesión" onPress={handleLogin} />
    </View>
  );
}