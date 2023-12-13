import React, { useState } from 'react';
import { FlatList, View } from 'react-native';
import useProductStore from '../../store/products/store';
import MainListItem from '../../components/main/mainListItem/mainListItem';
import TextField from '../../components/generall/textField/textField';
import Button from '../../components/generall/button/button';
import UsePicImage from '../../hooks/usePicImage';
import { addProductImage, createProductUrl, productByIdUrl } from '../../utils/network';
import ModalError from '../../components/generall/modalError/modalError';
import { authorizedRequest } from '../../utils/queries';
import DetailsLayout from '../../layout/detailsLayout/detailsLayout';
import { BasketSvg } from '../../assets/images/icons';

const Admin = () => {
  const productsStore = useProductStore((state) => state);
  const { link, error, handleImageSelect, errorText, updateError } = UsePicImage({
    endpoint: addProductImage,
  });
  const [input, setInput] = useState({
    price: '',
    title: '',
    description: '',
    fullDescription: '',
  });
  const { price, title, description, fullDescription } = input;

  const handleInput = (name: string, value: string) => {
    setInput((prevInput) => ({ ...prevInput, [name]: value }));
  };

  const createProduct = async () => {
    try {
      const newProduct = await authorizedRequest(createProductUrl, 'POST', 'accessToken', {
        ...input,
        picture: link,
      });
      productsStore.addProduct(newProduct);
    } catch (err) {
      updateError(true, String(err));
    }
  };

  const deleteProduct = async (id: string) => {
    try {
      await authorizedRequest(productByIdUrl(id), 'DELETE');
      productsStore.removeProduct(id)
    } catch (err) {
      updateError(true, String(err));
    }
  }

  return (
    <DetailsLayout>
      <View style={{ padding: 30, gap: 20 }}>
        <ModalError
          modalProps={{
            animationType: 'slide',
            transparent: true,
            visible: error,
          }}
          text={errorText}
          close={() => {
            updateError(false, '');
          }}
        />
        <TextField
          value={price}
          onChange={(value) => {
            handleInput('price', value);
          }}
          title="Price"
          placeholder="Enter price"
          errorMessage="Incorrect price format"
          eye={false}
          validation={/^.{2,}$/}
        />
        <TextField
          value={title}
          onChange={(value) => {
            handleInput('title', value);
          }}
          title="Title"
          placeholder="Enter title"
          errorMessage="Incorrect title format"
          eye={false}
          validation={/^.{2,}$/}
        />
        <TextField
          value={description}
          onChange={(value) => {
            handleInput('description', value);
          }}
          title="Description"
          placeholder="Enter description"
          errorMessage="Incorrect description format"
          eye={false}
          validation={/^.{2,}$/}
        />
        <TextField
          value={fullDescription}
          onChange={(value) => {
            handleInput('fullDescription', value);
          }}
          title="Full product description"
          placeholder="Enter full product description"
          errorMessage="Incorrect product description"
          eye={false}
          validation={/^.{2,}$/}
        />
        <Button onPress={handleImageSelect} title="select product image" />
        <Button title="Create Product" onPress={createProduct} />

        <FlatList
          data={productsStore.products}
          renderItem={({ item }) => (
            <MainListItem product={item} icon={<BasketSvg />} onClick={() => { deleteProduct(item._id) }} />
          )}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.starsCount + item.title}
        />
      </View>
    </DetailsLayout>
  );
};

export default Admin;
