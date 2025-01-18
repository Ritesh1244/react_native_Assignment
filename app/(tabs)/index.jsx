


// React Native Employee Reimbursements App in a single file

import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, FlatList, StyleSheet } from 'react-native';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createStore } from 'redux';

// Redux Setup
const initialState = {
  bills: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case 'ADD_BILL':
      return { ...state, bills: [...state.bills, action.payload] };
    default:
      return state;
  }
}

const store = createStore(rootReducer);

const addBill = (bill) => ({
  type: 'ADD_BILL',
  payload: bill,
});

// Screens
const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (email && password) {
      navigation.navigate('PhotoUploadScreen');
    } else {
      alert('Please enter both email and password');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

const PhotoUploadScreen = ({ navigation }) => {
  const [photo, setPhoto] = useState(null);
  const dispatch = useDispatch();

  const pickImage = async () => {
    // Mock image picking logic
    const result = { uri: 'https://via.placeholder.com/200' };
    setPhoto(result.uri);
  };

  const handleSubmit = () => {
    if (photo) {
      dispatch(addBill({ uri: photo, date: new Date().toLocaleString() }));
      navigation.navigate('BillsListScreen');
    } else {
      alert('Please upload a photo first');
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Take Photo" onPress={pickImage} />
      {photo && <Image source={{ uri: photo }} style={styles.image} />}
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

const BillsListScreen = () => {
  const bills = useSelector((state) => state.bills);

  return (
    <View style={styles.container}>
      <FlatList
        data={bills}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.billItem}>
            <Image source={{ uri: item.uri }} style={styles.image} />
            <Text>{item.date}</Text>
          </View>
        )}
      />
    </View>
  );
};

// App Entry Point
const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="LoginScreen">
          <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ title: 'Login' }} />
          <Stack.Screen name="PhotoUploadScreen" component={PhotoUploadScreen} options={{ title: 'Upload Bill' }} />
          <Stack.Screen name="BillsListScreen" component={BillsListScreen} options={{ title: 'Submitted Bills' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  image: {
    width: 200,
    height: 200,
    marginVertical: 20,
  },
  billItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
});
