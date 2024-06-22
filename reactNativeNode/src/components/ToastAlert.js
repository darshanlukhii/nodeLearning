import Toast from 'react-native-toast-message';

const ToastAlert = ({title, toastType}) => {
  Toast.show({type: toastType, text1: title || ''});
};

export default ToastAlert;
