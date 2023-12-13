import React, { type FC } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import ModalWindow from '../modal/modal';
import { type modalErrorProps } from './modalError.type';

const ModalError: FC<modalErrorProps> = ({ modalProps, close, text }) => {
  return (
    <ModalWindow modalProps={modalProps} close={close}>
      <View style={styles.container}>
        <Image
          source={{ uri: 'https://100dayscss.com/codepen/alert.png' }}
          width={44}
          height={38}
        />
        <Text style={styles.text}>Something went wrong...</Text>
        <Text style={styles.text}>{text}</Text>
      </View>
    </ModalWindow>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    gap: 10,
  },
  text: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
  },
});

export default ModalError;
