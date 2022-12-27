import React from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
} from 'react-native';

import Text from './src/components/Text';
import MainScTop from './src/screens/MainScTop';
import BottomBar from './src/screens/BottomBar';
import MenuScreen from './src/screens/MenuScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MainScreen from './src/screens/MainScreen';
import MenuDetails from './src/screens/MenuDetails';
import BarcodeScanner from './src/screens/BarcodeScanner';

const Stack = createNativeStackNavigator();



const App = () => {
  return (
    <View style={{backgroundColor:"black",flex:1}}>
      <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name="MenuScreen" component={MenuScreen} />
        <Stack.Screen name="MainScreen" component={MainScreen} />
        <Stack.Screen name="MenuDetails" component={MenuDetails} />
        <Stack.Screen name="BarcodeScanner" component={BarcodeScanner} />
        </Stack.Navigator>
        <BottomBar/>
      </NavigationContainer>
   </View>
  );
}



export default App;
