import React, { useEffect, useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import MainLayout from '../../layout/mainLayout/mainLayout';
import Avatar from '../../components/generall/avatar/avatar';
import DropDown from '../../components/generall/dropDown/dropDown';
import Search from '../../components/generall/search/search';
import useUserStore from '../../store/user/store';
import PromoBanner from '../../components/main/promoBanner/promoBanner';
import Carousel from '../../components/main/carusel/carousel';
import MainListItem from '../../components/main/mainListItem/mainListItem';
import useProductStore, { categories } from '../../store/products/store';
import { unauthorizedRequest } from '../../utils/queries';
import { getAllProductsUrl } from '../../utils/network';
import { styles } from './main.style';
import ModalError from '../../components/generall/modalError/modalError';
import UseErrors from '../../hooks/useErrors';
import AnimatedMark from '../../components/generall/animatedMark/animatedMark';

function Main () {
  const user = useUserStore((state) => state);
  const productsStore = useProductStore((state) => state);
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);
  const [location, setLocation] = useState('Ukraine');
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>(categories[0]);
  const { updateError, error, resetErrors, errorText } = UseErrors();
  const updateLocation = (location: string) => {
    setLocation(location);
  };

  const handleSearch = (value: string) => {
    setSearch(value);
    debounce(() => {
      setDebouncedSearch(value);
    }, 500);
  };

  const updateCategories = (category: string) => {
    setActiveCategory(category);
  };

  const getProductData = async (search?: string) => {
    try {
      const response = await unauthorizedRequest(getAllProductsUrl(search), 'GET');
      if (response) {
        productsStore.updateProductData(response);
      }
    } catch (err) {
      updateError(err);
    }
  };

  useEffect(() => {
    getProductData();
  }, []);

  const debounce = (callback: () => void, delay: number) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    const id = setTimeout(callback, delay);
    setTimeoutId(id);
  };

  useEffect(() => {
    getProductData(debouncedSearch)
  }, [debouncedSearch]);

  useEffect(() => {
    productsStore.sortBy(activeCategory)
  }, [activeCategory])

  return (
    <MainLayout style={{ paddingBottom: 70 }}>
      <ModalError
        modalProps={{
          animationType: 'slide',
          transparent: true,
          visible: error,
        }}
        close={resetErrors}
        text={errorText}
      />
      <View style={styles.locationContainer}>
        <View style={styles.locationDropDownContainer}>
          <View>
            <Text style={styles.whiteText}>Location</Text>
          </View>
          <View>
            <DropDown
              currentValue={location}
              valueList={['USA', 'UGANDA', 'MOON']}
              updateCurrentValue={updateLocation}
            />
          </View>
        </View>
        <Avatar url={user.avatar} />
      </View>
      <Search
        additionalStyles={styles.search}
        placeholder="Search coffee"
        value={search}
        updateValue={handleSearch}
      />
      <PromoBanner
        src="http://192.168.88.106:3000/files/output/file0201020301.png"
        title="Buy one get one Free"
      />
      <Carousel list={categories} active={activeCategory} updateActive={updateCategories} />

      <View style={styles.menuContainer}>
        <FlatList
          data={productsStore.products}
          renderItem={({ item }) => (
            <MainListItem
              product={item}
              icon={<AnimatedMark />}
              onClick={() => {}}
            />
          )}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.starsCount + item.title}
        />
      </View>
    </MainLayout>
  );
}

export default Main;
