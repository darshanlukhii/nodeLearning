import {Platform} from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {getStatusBarHeight} from 'react-native-status-bar-height';

import {RFValue} from 'react-native-responsive-fontsize';

export const wp = val => widthPercentageToDP(val);

export const hp = val => heightPercentageToDP(val);

export const statusBarHeight = getStatusBarHeight();

export const isIos = Platform.OS === 'ios';

export const fontSize = val => RFValue(val, 812);
