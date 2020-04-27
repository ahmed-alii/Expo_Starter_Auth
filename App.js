import React, {useState} from "react";
import {Platform, StatusBar, StyleSheet, Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import BottomTabNavigator from './navigation/BottomTabNavigator';
import UserContext from "./connection/userContext";
import AuthNavigation from "./navigation/AuthNavigation";

const Stack = createStackNavigator();

export default App = () => {
  const [loggedIn, setLoggedin] = useState(false);
  const value = {loggedIn, setLoggedin};

  if (loggedIn === true) {
    return (
        <UserContext.Provider value={value}>
          <UserContext.Consumer>
            {({loggedIn, setLoggedin}) => (
                <View style={styles.container}>
                  {Platform.OS === 'ios' && <StatusBar barStyle="default"/>}
                  <NavigationContainer>
                    <Stack.Navigator>
                      <Stack.Screen name="Root" component={BottomTabNavigator}/>
                    </Stack.Navigator>
                  </NavigationContainer>
                </View>
            )}
          </UserContext.Consumer>
        </UserContext.Provider>
    );
  } else {
    return (
        <UserContext.Provider value={value}>
          <UserContext.Consumer>
            {({loggedIn, setLoggedin}) => (
                <View style={styles.container}>
                  {Platform.OS === 'ios' && <StatusBar barStyle="default"/>}
                  <NavigationContainer>
                    {loggedIn === true && <Text>Hello</Text>}
                    <AuthNavigation/>
                  </NavigationContainer>
                </View>
            )}
          </UserContext.Consumer>
        </UserContext.Provider>

    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
