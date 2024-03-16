import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, FlatList, SafeAreaView} from 'react-native';
import {useDispatch} from 'react-redux';
import {get_product_data} from '../Redux/Actions/productAction';
import {hp, wp} from '../utils/constant';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);

  useEffect(() => {
    get_data();
  }, []);

  const get_data = async () => {
    let request = {
      onSuccess: res => {
        setData(res?.data?.tours || []);
      },
      onFail: () => {},
    };
    dispatch(get_product_data(request));
  };

  const renderTourItem = ({item, index}) => {
    const colors = [
      '#FF6384',
      '#36A2EB',
      '#FFCE56',
      '#4BC0C0',
      '#9966FF',
      '#FF8A65',
      '#FFD700',
    ];
    const colorIndex = index % colors.length;

    return (
      <View
        style={[styles.tourContainer, {backgroundColor: colors[colorIndex]}]}>
        <Text style={styles.description}>{item?.description}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data}
        bounces={false}
        renderItem={renderTourItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        keyExtractor={(item, index) => index.toString()}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  listContainer: {
    paddingHorizontal: wp(5),
    paddingVertical: hp(2),
  },
  tourContainer: {
    borderRadius: 8,
    padding: 16,
    marginBottom: hp(2),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  description: {
    fontSize: 16,
    color: '#20001E',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default HomeScreen;
