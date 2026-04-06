import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  SafeAreaView,
  Button,
} from 'react-native';

const Zoom = () => {
  const [mId, setMId] = useState('');
  const [passCode, setPassCode] = useState('');

  return (
    <View style={[styles.container, styles.darkMode]}>
      <SafeAreaView>
        <Text style={[styles.title, styles.darkModeText]}>Zoom</Text>
        <View style={styles.formContainer}>
          <TextInput
            value={mId}
            placeholder="Enter your Meeting id"
            onChangeText={text => {
              setMId(text);
            }}
            style={[styles.input, styles.darkModeInput]}
          />
          <TextInput
            value={passCode}
            placeholder="Enter your Meeting passcode"
            onChangeText={text => {
              setPassCode(text);
            }}
            style={[styles.input, styles.darkModeInput]}
          />
          <Button title="Join" color="#00bcd4" />
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  darkMode: {
    backgroundColor: '#1f1f1f',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00bcd4',
    marginBottom: 20,
    textAlign: 'center',
  },
  darkModeText: {
    color: '#fff',
  },
  formContainer: {
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    elevation: 5,
  },
  input: {
    borderWidth: 1,
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
    fontSize: 16,
    width: '100%',
    color: '#333',
  },
  darkModeInput: {
    borderColor: '#00bcd4',
    color: '#fff',
  },
});

export default Zoom;
