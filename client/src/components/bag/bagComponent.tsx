import React from 'react';
import { FlatList, View, Text } from 'react-native';
import useUserStore from '../../store/user/store';
import { ClockSvg } from '../../assets/images/icons';
import MainListItem from '../main/mainListItem/mainListItem';
import UseErrors from '../../hooks/useErrors';
import ModalError from '../generall/modalError/modalError';
import { getDateFrom } from '../../utils/dateAndTime';
const BagComponent = () => {
  const { error, errorText, resetErrors } = UseErrors();
  const user = useUserStore((state) => state);

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
      {user.orders.length !== 0
        ? (
        <FlatList
          data={user.orders}
          renderItem={({ item }) => (
            <MainListItem
              product={item}
              icon={<ClockSvg />}
              timer={getDateFrom(new Date(item.createdAt))}
              onClick={() => {}}
            />
          )}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.starsCount + item.title}
        />
          )
        : (
        <Text style={{ textAlign: 'center' }}>Your order list clear, lets change that</Text>
          )}
    </View>
  );
};

export default BagComponent;
