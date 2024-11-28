/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import Home from './src/pages/Home';
import Profile from './src/pages/Profile';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Provider, useBaseContext } from './src/context';
import { HomeProvider } from './src/context/Home';


type SectionProps = PropsWithChildren<{
  title: string;
}>;

// Create the bottom tab navigator
const Tab = createBottomTabNavigator();

function App() {
  return (
    <Provider>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen
            name="Home"
            // component={Home}
            options={{
              title: 'Home',
              // headerRight: (props) => {
              //   const {handlePlusIconPress} = useBaseContext();
              //   return <Ionicons
              //     name="add"
              //     size={30}
              //     color="black"
              //     style={{ marginRight: 20 }}
              //     onPress={(props) => {
              //       console.log('props', props)
              //       handlePlusIconPress()
              //       // Alert.alert('Plus icon pressed')
              //     }}
              //   />
              // },
            }}
          >
            {(props) => (
              <HomeProvider>
                 <Home {...props} />
              </HomeProvider>
            )}
          </Tab.Screen>
          <Tab.Screen name="Profile" component={Profile} />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
