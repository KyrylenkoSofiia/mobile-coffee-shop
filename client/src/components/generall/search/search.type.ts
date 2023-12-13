import { type ViewStyle } from 'react-native';

export interface searchType {
  placeholder: string;
  value: string;
  updateValue: (value: string) => void;
  additionalStyles?: ViewStyle;

}
