// import React from 'react';
// import {View, StyleSheet, Image} from 'react-native';

// import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

// import {images} from '../assets';
// import {colors} from '../utils/themes';
// import Calls from '../Screen/Calls/Calls';
// import {fontSize, hp} from '../utils/constant';
// import Message from '../Screen/Message/Message';
// import Contacts from '../Screen/Contacts/Contacts';
// import Settings from '../Screen/Settings/Settings';

// const TabNavigation = () => {
//   const Tab = createBottomTabNavigator();

//   return (
//     <View style={styles.container}>
//       <Tab.Navigator
//         screenOptions={({route}) => ({
//           tabBarIcon: ({focused}) => {
//             let iconName, iconStyle;
//             if (route.name === 'Message') {
//               iconName = focused ? images.chatFocus : images.chatUnFocus;
//               iconStyle = focused
//                 ? styles.focusTabImageIconStyle
//                 : styles.tabImageIconStyle;
//             } else if (route.name === 'Calls') {
//               iconName = focused ? images.callFocus : images.callUnFocus;
//               iconStyle = focused
//                 ? styles.focusTabImageIconStyle
//                 : styles.tabImageIconStyle;
//             } else if (route.name === 'Contacts') {
//               iconName = focused ? images.contactsFocus : images.Contacts;
//               iconStyle = focused
//                 ? styles.focusTabImageIconStyle
//                 : styles.tabImageIconStyle;
//             } else if (route.name === 'Settings') {
//               iconName = focused
//                 ? images.settingsFocus
//                 : images.settingsUnFocus;
//               iconStyle = focused
//                 ? styles.focusTabImageIconStyle
//                 : styles.tabImageIconStyle;
//             }
//             return <Image source={iconName} style={iconStyle} />;
//           },
//           tabBarStyle: styles.tabBarStyle,
//           tabBarLabelStyle: styles.labelStyle,
//           tabBarActiveTintColor: colors.textColor,
//           tabBarInactiveTintColor: colors.subMessageText,
//           headerShown: false,
//         })}>
//         <Tab.Screen name="Message" component={Message} />
//         <Tab.Screen name="Calls" component={Calls} />
//         <Tab.Screen name="Contacts" component={Contacts} />
//         <Tab.Screen name="Settings" component={Settings} />
//       </Tab.Navigator>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   labelStyle: {
//     fontFamily: 'Poppins-SemiBold',
//     fontSize: fontSize(12),
//   },
//   tabImageIconStyle: {
//     height: hp(22),
//     width: hp(22),
//     tintColor: colors.subMessageText,
//   },
//   focusTabImageIconStyle: {
//     height: hp(22),
//     width: hp(22),
//     tintColor: colors.textColor,
//   },
//   tabBarStyle: {
//     height: hp(75),
//     paddingBottom: hp(12),
//   },
// });

// export default TabNavigation;
