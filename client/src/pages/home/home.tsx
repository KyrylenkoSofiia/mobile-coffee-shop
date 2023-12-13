import { useNavigation } from '@react-navigation/native';
import { View, Text, ImageBackground, Pressable } from 'react-native';
import React, { useEffect } from 'react';
import { styles } from './home.style';
import useUserStore from '../../store/user/store';
import { whoAmI } from '../../utils/network';
import { authorizedRequest } from '../../utils/queries';
import img from '../../assets/images/coffee.jpg';
import ModalError from '../../components/generall/modalError/modalError';
import UseErrors from '../../hooks/useErrors';

function Home() {
  const navigation = useNavigation();
  const { error, errorText, resetErrors, updateError } = UseErrors();
  const user = useUserStore((state) => state);
  const handleNavigate = (route: string) => {
    navigation.navigate(route as never);
  };
  const updateUserData = async () => {
    try {
      const userData = await authorizedRequest(whoAmI, 'GET');
      user.updateUserData(userData);
      handleNavigate('Main');
    } catch (err) {
      updateError(err);
    }
  };

  useEffect(() => {
    updateUserData();
  }, []);

  return (
    <ImageBackground source={img} style={styles.backgroundImage}>
      <ModalError
        modalProps={{
          animationType: 'slide',
          transparent: true,
          visible: error,
        }}
        text={errorText}
        close={resetErrors}
      />
      <View style={styles.container}>
        <Text style={styles.text}>Coffee so good, your taste buds will love it.</Text>
        <Text style={styles.blurText}>The best grain, the finest roast, the powerful flavor.</Text>
        <View style={styles.buttonsContainer}>
          <Pressable
            style={styles.button}
            onPress={() => {
              handleNavigate('Login');
            }}
          >
            <Text>Login</Text>
          </Pressable>
          <Pressable
            style={styles.button}
            onPress={() => {
              handleNavigate('Register');
            }}
          >
            <Text>Register</Text>
          </Pressable>
        </View>
      </View>
    </ImageBackground>
  );
}

export default Home;
