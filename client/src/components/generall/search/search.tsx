import React, { type FC } from 'react';
import {
  type NativeSyntheticEvent,
  TextInput,
  type TextInputChangeEventData,
  View,
  Pressable,
} from 'react-native';
import { type searchType } from './search.type';
import { FilterSvg, LensSvg } from '../../../assets/images/icons';
import { styles } from './search.style';

const Search: FC<searchType> = ({
  value,
  updateValue,
  placeholder,
  additionalStyles,

}) => {
  const handleChange = (event: NativeSyntheticEvent<TextInputChangeEventData>) => {
    const newValue = event.nativeEvent.text;
    updateValue(newValue);
  };

  return (

      <View style={[styles.search, additionalStyles]}>
        <View style={[styles.searchContainer]}>
          <View style={styles.searchInput}>
            <LensSvg />
            <TextInput
              style={styles.input}
              placeholderTextColor="#989898"
              placeholder={placeholder}
              value={value}
              onChange={handleChange}
            />
          </View>
          <Pressable style={[styles.filterIcon]}>
            <FilterSvg />
          </Pressable>
        </View>
      </View>
  );
};

export default Search;
