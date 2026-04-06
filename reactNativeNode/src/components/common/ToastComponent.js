import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Toast, {ToastConfigParams} from 'react-native-toast-message';
import {Image} from 'react-native';
import {fontSize, hp, wp} from '../../utils/constant';
import {Images} from '../../assets';
import {strings} from '../../helper/appConstant';
import {colors} from '../../helper/colors';

const ToastConfig = {
  error: props => {
    const styles = errorStyles;
    return (
      <View style={styles.container}>
        <Image source={Images?.toastError} style={styles.successIconStyle} />
        <View style={styles.descriptionView}>
          <Text style={styles.text1}>{strings?.error_occurred}</Text>
          <Text style={styles.descriptionLabelStyle}>{props.text1}</Text>
        </View>
      </View>
    );
  },

  success: props => {
    const styles = successStyles;
    return (
      <View style={styles.container}>
        <Image source={Images?.toastSuccess} style={styles.successIconStyle} />
        <View style={styles.descriptionView}>
          <Text style={styles.text1}>{strings?.successful}</Text>
          <Text style={styles.descriptionLabelStyle}>{props.text1}</Text>
        </View>
      </View>
    );
  },
};

const ToastComponent = () => {
  return <Toast config={ToastConfig} autoHide={true} />;
};

export default ToastComponent;

const errorStyles = StyleSheet.create({
  descriptionView: {
    marginHorizontal: wp(8),
    maxWidth: '90%',
  },
  descriptionLabelStyle: {
    color: colors?.grey,
    lineHeight: hp(15),
    fontSize: fontSize(12),
  },
  container: {
    width: '90%',
    borderWidth: 2,
    padding: wp(16),
    flexDirection: 'row',
    borderRadius: hp(16),
    borderColor: colors?.toastErrorBorder,
    backgroundColor: colors?.toastErrorColor,
  },
  successIconStyle: {
    height: hp(20),
    width: hp(20),
  },
  text1: {
    color: colors.black,
  },
});
const successStyles = StyleSheet.create({
  descriptionView: {
    marginHorizontal: wp(8),
    maxWidth: '90%',
  },
  successIconStyle: {
    height: hp(20),
    width: hp(20),
  },
  container: {
    width: '90%',
    borderWidth: 2,
    padding: wp(16),
    flexDirection: 'row',
    borderRadius: hp(16),
    borderColor: colors?.toastSuccessBorder,
    backgroundColor: colors?.toastSuccessColor,
  },
  text1: {
    flex: 1,
    lineHeight: hp(20),
    color: colors.black,
    fontSize: fontSize(16),
  },
  descriptionLabelStyle: {
    color: colors?.grey,
    lineHeight: hp(15),
    fontSize: fontSize(12),
  },
});
