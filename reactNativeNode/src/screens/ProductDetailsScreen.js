import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {addToCart} from '../Redux/Actions/productAction'; // Import the addToCart action creator
import {useDispatch} from 'react-redux';

const ProductDetailsScreen = ({route}) => {
  const {productId, productsData} = route.params;
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [product, setProduct] = useState(null);

  useEffect(() => {
    const getProductDetails = () => {
      const foundProduct = productsData?.find(item => item.id === productId);
      setProduct(foundProduct);
    };

    getProductDetails();
  }, [productId, productsData]);

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    navigation.navigate('Cart');
  };

  return (
    <>
      <SafeAreaView />
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}>
            <Text style={styles.backButtonText}>Back</Text>
          </TouchableOpacity>
          {product && (
            <View style={styles.productDetailsContainer}>
              <Image
                source={{uri: product.thumbnail}}
                style={styles.thumbnail}
              />
              <Text style={styles.title}>{product.title}</Text>
              <Text style={styles.description}>{product.description}</Text>
              <Text style={styles.brand}>Brand: {product.brand}</Text>
              <Text style={styles.price}>Price: ${product.price}</Text>
              <TouchableOpacity
                style={styles.addToCartButton}
                onPress={handleAddToCart}>
                <Text style={styles.addToCartButtonText}>Add to Cart</Text>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 1,
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#009387',
  },
  productDetailsContainer: {
    alignItems: 'center',
  },
  thumbnail: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  brand: {
    fontSize: 16,
    marginBottom: 10,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#009387',
  },
  addToCartButton: {
    backgroundColor: '#009387',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  addToCartButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default ProductDetailsScreen;
