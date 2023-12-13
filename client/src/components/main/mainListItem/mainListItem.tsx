import React, { type FC } from 'react';
import { Pressable, View, Text, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { type mainListItemType } from './mainListItem.type';
import { StarSvg } from '../../../assets/images/icons';
import { styles } from './mainListItem.style';

const MainListItem: FC<mainListItemType> = ({ product, icon, onClick, timer }) => {
  const { description, title, picture, stars, price } = product;
  const navigate = useNavigation();
  const handleNavigate = (route: string, id: string) => {
    navigate.navigate(route, {
      id,
    });
  };
  return (
    <>
      <Pressable
        style={styles.wrapper}
        onPress={() => {
          handleNavigate('Details', product._id);
        }}
      >
        {timer && <Text>will arrive {timer}</Text>}
        <View>
          <Image style={styles.img} source={{ uri: picture }} />
          <View style={styles.starsWrapper}>
            <StarSvg />
            <Text style={styles.starStatistic}>{stars}</Text>
          </View>
        </View>
        <View style={styles.bottomContainer}>
          <Text style={styles.titleText}>{title}</Text>
          <Text style={styles.descriptionText}>{description}</Text>
          <View style={styles.bottomControl}>
            <Text style={styles.priceText}>$ {price}</Text>
            <Pressable onPress={onClick}>{icon}</Pressable>
          </View>
        </View>
      </Pressable>
    </>
  );
};

export default MainListItem;
