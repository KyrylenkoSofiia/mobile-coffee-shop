import React, { useEffect } from 'react';
import MainLayout from '../../layout/mainLayout/mainLayout';
import FavoriteComponent from '../../components/favorite/favorite';
import { authorizedRequest } from '../../utils/queries';
import { favoriteUrl } from '../../utils/network';
import useUserStore from '../../store/user/store';
import UseErrors from '../../hooks/useErrors';
import ModalError from '../../components/generall/modalError/modalError';
function Favorite () {
  const { updateError, resetErrors, errorText, error } = UseErrors();
  const user = useUserStore((state) => state);
  const getFavoriteList = async () => {
    try {
      const list = await authorizedRequest(favoriteUrl, 'GET');
      user.updateUserData({
        ...user,
        favorite: [...list.map((item: { value: string }) => item.value)],
      });
    } catch (err) {
      updateError(err);
    }
  };
  useEffect(() => {
    getFavoriteList();
  }, []);
  return (
    <MainLayout background={false}>
      <ModalError
        modalProps={{
          animationType: 'slide',
          transparent: true,
          visible: error,
        }}
        text={errorText}
        close={resetErrors}
      />
      <FavoriteComponent />
    </MainLayout>
  );
}

export default Favorite;
