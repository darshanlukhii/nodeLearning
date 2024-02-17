import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  TextInput,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {getProductData} from '../Redux/Actions/productAction';
import ProductItem from '../components/ProductItem';

const HomeScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState('');
  const data = useSelector(state => state?.productData?.productData);

  useEffect(() => {
    get_data();
  }, []);

  const get_data = async () => {
    let request = {
      onSuccess: res => {},
      onFail: () => {},
    };
    dispatch(getProductData(request));
  };

  const filteredProducts = data?.products?.filter(product =>
    product.title.toLowerCase().includes(searchText.toLowerCase()),
  );

  return (
    <View style={styles.container}>
      <SafeAreaView />
      <TextInput
        style={styles.searchInput}
        placeholder="Search for products"
        value={searchText}
        onChangeText={text => setSearchText(text)}
      />
      <Text style={styles.heading}>Featured Products</Text>
      <FlatList
        data={filteredProducts}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <ProductItem
            item={item}
            onPress={() =>
              navigation.navigate('ProductDetails', {
                productId: item.id,
                productsData: filteredProducts,
              })
            }
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    margin: 10,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 20,
    marginBottom: 10,
  },
});

export default HomeScreen;
