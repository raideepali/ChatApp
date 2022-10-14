import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {StyleSheet, SafeAreaView} from 'react-native';
import ScreenChat from './screens/Chats/ScreenChat';
import ScreenMessages from './screens/Messages/ScreenMessages';

const App = () => {
  const Stack = createNativeStackNavigator();

  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="ScreenMessages">
          <Stack.Screen name="ScreenMessages" component={ScreenMessages} />
          <Stack.Screen name="ScreenChat" component={ScreenChat} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  textInputStyle: {
    height: 40,
    borderWidth: 2,
  },
});
export default App;
