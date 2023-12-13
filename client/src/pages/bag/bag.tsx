import React, { useEffect } from 'react'

import MainLayout from '../../layout/mainLayout/mainLayout';
import { authorizedRequest } from '../../utils/queries';
import { allBagUrl } from '../../utils/network';
import useUserStore from '../../store/user/store';
import UseErrors from '../../hooks/useErrors';
import ModalError from '../../components/generall/modalError/modalError';
import BagComponent from '../../components/bag/bagComponent';
function Bag () {
  const { updateError, resetErrors, errorText, error } = UseErrors();
  const user = useUserStore((state) => state);
  const getBagList = async () => {
    try {
      const list = await authorizedRequest(allBagUrl, 'GET');
      user.updateUserData({
        ...user,
        orders: [...list],
      });
    } catch (err) {
      updateError(err);
    }
  };

  useEffect(() => {
    getBagList();
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
      <BagComponent />
    </MainLayout>
  );
}

export default Bag;
