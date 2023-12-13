import React from 'react';
import { FlatList, View, Text } from 'react-native';
import useUserStore from '../../store/user/store';
import { BasketSvg } from '../../assets/images/icons';
import MainListItem from '../main/mainListItem/mainListItem';
import UseErrors from '../../hooks/useErrors';
import ModalError from '../generall/modalError/modalError';
import { favoriteByIdUrl } from '../../utils/network';
import { authorizedRequest } from '../../utils/queries';
const FavoriteComponent = () => {
  const { error, errorText, updateError, resetErrors } = UseErrors()

  const user = useUserStore((state) => state);
  const removeFromFavorite = async (id: string) => {
    try {
      await authorizedRequest(favoriteByIdUrl(id), 'DELETE');
      user.removeFromFavorite(id)
    } catch (err) {
      updateError(err)
    }
  }

  return (
    <View style={{ paddingTop: 50, paddingLeft: 25, paddingRight: 25 }}>
      <ModalError
        modalProps={{
          animationType: 'slide',
          transparent: true,
          visible: error,
        }}
        text={errorText}
        close={resetErrors}
      />
      {user.favorite.length !== 0
        ? (
        <FlatList
          data={user.favorite}
          renderItem={({ item }) => (
            <MainListItem
              product={item}
              icon={<BasketSvg />}
              onClick={() => {
                removeFromFavorite(item._id);
              }}
            />
          )}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.starsCount + item.title}
        />
          )
        : (
        <Text style={{ textAlign: 'center' }}>Your favorite list clear, lets change that</Text>
          )}
    </View>
  );
};

export default FavoriteComponent;
