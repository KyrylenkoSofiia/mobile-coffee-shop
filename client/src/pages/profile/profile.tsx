import React, { useState, type FC } from 'react';
import DetailsLayout from '../../layout/detailsLayout/detailsLayout';
import useUserStore from '../../store/user/store';
import Avatar from '../../components/generall/avatar/avatar';
import { Text, View } from 'react-native';
import TextField from '../../components/generall/textField/textField';
import { validateEmail, validateUserName } from '../../utils/regex';
import Button from '../../components/generall/button/button';
import { authorizedRequest, unauthorizedRequest } from '../../utils/queries';
import { logoutUrl, updateUserData } from '../../utils/network';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { styles } from './profile.style';
import ModalError from '../../components/generall/modalError/modalError';
import UseErrors from '../../hooks/useErrors';
const Profile: FC = () => {
  const user = useUserStore((state) => state);
  const [userName, setUserName] = useState(user.userName);
  const [mail, setMail] = useState(user.mail);
  const navigation = useNavigation();
  const { updateError, error, errorText, resetErrors } = UseErrors()
  const handleNavigate = (route: string) => {
    navigation.navigate(route as never);
  };

  const updateUser = async () => {
    try {
      const updUser = await authorizedRequest(updateUserData, 'PATCH', 'accessToken', {
        userName,
        mail,
      });
      user.updateUserData(updUser);
    } catch (err) {
      updateError(err);
    }
  };
  const signOut = async () => {
    try {
      const refreshToken = await AsyncStorage.getItem('refreshToken');
      if (refreshToken) {
        await unauthorizedRequest(logoutUrl, 'DELETE', {
          refreshToken,
        });
        handleNavigate('Home');
      }
    } catch (err) {
      updateError(err);
    }
  };
  return (
    <DetailsLayout>
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
        <View style={styles.wrapper}>
          <Avatar url={user.avatar} style={styles.avatar} />
        </View>
        <Text style={styles.text}>{userName}</Text>
        <Text style={styles.text}>{mail}</Text>
        <TextField
          value={userName}
          onChange={setUserName}
          title={'userName'}
          placeholder={'please add your userName'}
          validation={validateUserName}
          errorMessage={'incorrect userName format'}
          eye={false}
        />
        <TextField
          value={mail}
          onChange={setMail}
          title={'mail'}
          placeholder={'please add your mail address'}
          validation={validateEmail}
          errorMessage={'incorrect mail format'}
          eye={false}
        />
        {user.isAdmin && (
          <Button
            onPress={() => {
              handleNavigate('Admin');
            }}
            title={'Add new product position'}
          />
        )}
        <Button onPress={updateUser} title={'Submit'} />
        <Button onPress={signOut} title={'Logout'} />
      </View>
    </DetailsLayout>
  );
};

export default Profile;
