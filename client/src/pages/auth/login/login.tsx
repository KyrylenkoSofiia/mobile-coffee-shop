import React, { useEffect, useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TextField from '../../../components/generall/textField/textField';
import BaseLayout from '../../../layout/baseLayout/baseLayout';
import SingleCheckbox from '../../../components/generall/singleCheckbox/singleCheckbox';
import OrContinueWith from '../../../components/generall/orContinueWith/orContinueWith';
import { AppleSvg, GoogleSvg } from '../../../assets/images/icons';
import { styles } from './login.style';
import { unauthorizedRequest } from '../../../utils/queries';
import { loginUrl } from '../../../utils/network';
import AuthHeader from '../../../components/auth/authHeader/authHeader';
import { validateEmail, validatePassword } from '../../../utils/regex';
import useUserStore from '../../../store/user/store';
import Button from '../../../components/generall/button/button';
import ModalError from '../../../components/generall/modalError/modalError';
import UseErrors from '../../../hooks/useErrors';

function Login() {
  const [inputData, setInputData] = useState({
    mail: '',
    password: '',
  });
  const [rememberMe, setRememberMe] = useState(false);
  const { error, errorText, updateError, resetErrors } = UseErrors();

  const { mail, password } = inputData;
  const updateUserData = useUserStore((state) => state.updateUserData);
  const navigation = useNavigation();

  const getMailFromStorage = async () => {
    const mail = await AsyncStorage.getItem('mail');
    if (mail) {
      setInputData({ ...inputData, mail });
    }
  };

  const handleEmailChange = (text: string) => {
    setInputData({ ...inputData, mail: text });
  };

  const handlePasswordChange = (text: string) => {
    setInputData({ ...inputData, password: text });
  };

  const handleNavigate = (route: string) => {
    navigation.navigate(route as never);
  };

  const signIn = async () => {
    try {
      const userData = await unauthorizedRequest(loginUrl, 'POST', inputData);
      if (userData?.accessToken) {
        await AsyncStorage.setItem('accessToken', userData.accessToken);
        await AsyncStorage.setItem('refreshToken', userData.refreshToken);
      }
      updateUserData(userData);
      if (rememberMe) {
        await AsyncStorage.setItem('mail', userData.mail);
      }
      handleNavigate('Main');
    } catch (err) {
      updateError(err);
    }
  };

  useEffect(() => {
    getMailFromStorage();
  }, []);

  return (
    <BaseLayout style={styles.layout}>
      <ModalError
        modalProps={{
          animationType: 'slide',
          transparent: true,
          visible: error,
        }}
        text={errorText}
        close={resetErrors}
      />
      <AuthHeader />
      <TextField
        value={mail}
        onChange={handleEmailChange}
        title="E-mail"
        placeholder="Enter your email"
        validation={validateEmail}
        errorMessage="Incorrect email format"
        eye={false}
      />
      <TextField
        value={password}
        onChange={handlePasswordChange}
        title="Password"
        placeholder="Enter your password"
        validation={validatePassword}
        errorMessage="Incorrect password format"
        eye
      />
      <View style={styles.centerView}>
        <SingleCheckbox
          option="Remember me"
          onToggle={() => {
            setRememberMe(!rememberMe);
          }}
        />
        <Pressable>
          <Text style={styles.redText}>Forgot password</Text>
        </Pressable>
      </View>
      <Button title="Sign in" onPress={signIn} additionalStyles={styles.marginTop} />
      <OrContinueWith />
      <Pressable style={styles.signButton}>
        <GoogleSvg />
        <Text>Continue with Google</Text>
      </Pressable>
      <Pressable style={styles.signButton}>
        <AppleSvg />
        <Text>Continue with Apple</Text>
      </Pressable>
      <View style={[styles.centerText, styles.marginTop]}>
        <Text>Don`t have an account? </Text>
        <Pressable
          onPress={() => {
            handleNavigate('Register');
          }}
        >
          <Text style={styles.greenText}>Sign up</Text>
        </Pressable>
      </View>
    </BaseLayout>
  );
}

export default Login;
