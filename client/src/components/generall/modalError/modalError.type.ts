import { type ModalProps } from 'react-native';

export interface modalErrorProps {
  modalProps: ModalProps;
  text: string;
  close: () => void;
}
