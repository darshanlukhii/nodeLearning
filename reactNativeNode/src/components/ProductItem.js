import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';

const ProductItem = ({item, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Image source={{uri: item.thumbnail}} style={styles.thumbnail} />
      <Text style={styles.productTitle}>{item.title}</Text>
      <Text style={styles.productPrice}>${item.price}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 20,
    alignItems: 'center',
    elevation: 3,
  },
  thumbnail: {
    width: 150,
    height: 150,
    borderRadius: 10,
  },
  productTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  productPrice: {
    fontSize: 14,
    color: '#009387',
    marginBottom: 10,
  },
});

export default ProductItem;
