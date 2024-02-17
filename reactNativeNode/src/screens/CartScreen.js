import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {removeFromCart, updateQuantity} from '../Redux/Actions/productAction';

const CartScreen = ({navigation}) => {
  const cartItems = useSelector(state => state.productData.cart);
  const dispatch = useDispatch();

  const handleQuantityChange = (item, increase) => {
    let newQuantity = item.quantity + (increase ? 1 : -1);
    newQuantity = Math.max(newQuantity, 1);
    dispatch(updateQuantity(item.id, newQuantity));
  };

  const renderItem = ({item}) => (
    <View style={styles.cartItem}>
      <Image source={{uri: item.thumbnail}} style={styles.itemImage} />
      <View style={styles.itemDetails}>
        <Text style={styles.itemTitle}>{item?.title}</Text>
        <Text style={styles.itemPrice}>${item?.price}</Text>
        <View style={styles.quantityContainer}>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => handleQuantityChange(item, true)}>
            <Text style={styles.quantityButtonText}>+</Text>
          </TouchableOpacity>
          <Text style={styles.quantity}>{item.quantity}</Text>
          <TouchableOpacity
            style={[
              styles.quantityButton,
              {backgroundColor: item.quantity === 1 ? '#ccc' : '#009387'},
            ]}
            onPress={() => handleQuantityChange(item, false)}
            disabled={item.quantity === 1}>
            <Text style={styles.quantityButtonText}>-</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity
        style={styles.removeButton}
        onPress={() => {
          dispatch(removeFromCart(item.id));
          navigation.navigate('Home');
        }}>
        <Text style={styles.removeButtonText}>Remove</Text>
      </TouchableOpacity>
    </View>
  );

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  return (
    <>
      <SafeAreaView />
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}>
            <Text style={styles.backButtonText}>Back</Text>
          </TouchableOpacity>
          <Text style={styles.heading}>Your Cart</Text>
        </View>
        <FlatList
          data={cartItems}
          renderItem={renderItem}
          keyExtractor={item => item?.id?.toString()}
          contentContainerStyle={styles.cartList}
          showsVerticalScrollIndicator={false}
        />
        <View style={styles.totalContainer}>
          <Text style={styles.totalText}>Total: ${totalPrice.toFixed(2)}</Text>
          <TouchableOpacity
            style={styles.checkoutButton}
            onPress={() => alert('Proceed to checkout')}>
            <Text style={styles.checkoutButtonText}>Checkout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {},
  backButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#009387',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  cartList: {
    flexGrow: 1,
  },
  cartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 10,
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 5,
  },
  itemDetails: {
    flex: 1,
    marginLeft: 10,
  },
  itemTitle: {
    fontSize: 16,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  removeButton: {
    padding: 5,
    backgroundColor: '#009387',
    borderRadius: 5,
  },
  removeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  totalContainer: {
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    paddingVertical: 20,
    alignItems: 'center',
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  checkoutButton: {
    backgroundColor: '#009387',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  checkoutButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  quantityButton: {
    padding: 5,
    borderRadius: 5,
    backgroundColor: '#009387',
  },
  quantityButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  quantity: {
    marginHorizontal: 10,
    fontSize: 16,
  },
});

export default CartScreen;
