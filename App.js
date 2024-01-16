import React, {useEffect} from 'react';
import {NavigationContainer, DarkTheme} from '@react-navigation/native';
import {RecoilRoot} from 'recoil';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {StyleSheet, Text, View} from 'react-native';
import {ColorfulTabBar} from 'react-navigation-tabbar-collection';
import Icon from 'react-native-vector-icons/AntDesign';
import HomeIndex from './src/screens/Home/Index';
import PlayerScreen from './src/screens/Player';
import analytics from '@react-native-firebase/analytics';
import {StoreProvider} from 'easy-peasy';
import SettingScreen from './src/screens/Setting/index';
import LikesScreen from './src/screens/Likes/index';
import Onboarding from './src/screens/Onboarding/index'
// import easyPeasyStore from './src/providers/EasyPeasyStore'
import messaging from '@react-native-firebase/messaging';

const Tab = createBottomTabNavigator();

const DemoScreen = ({route}) => (
  <View style={styles.screen}>
    <Text style={{color: 'white'}}>All Your Liked/Saved Bayans Will Appear Here...</Text>
  </View>
);


const App = () => {
  // for firebase analytics
  const routeNameRef = React.useRef();
  const navigationRef = React.useRef();


useEffect(() => {
  // Assume a message-notification contains a "type" property in the data payload of the screen to open

  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log(
      'Notification caused app to open from background state:',
      remoteMessage.notification,
    );
    // navigation.navigate(remoteMessage.data.type);
  });

  // Check whether an initial notification is available
  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        console.log(
          'Notification caused app to open from quit state:',
          remoteMessage.notification,
        );
        // setInitialRoute(remoteMessage.data.type); // e.g. "Settings"
      }
      // setLoading(false);
    });

    async function getToken(){
      await messaging().registerDeviceForRemoteMessages();
      const token = await messaging().getToken();
      return token;
    }

    console.log('token= '+ JSON.stringify(getToken()));
    
}, []);


  return (
    <RecoilRoot>
      {/* <Onboarding /> */}
      <NavigationContainer
        theme={DarkTheme}
        ref={navigationRef}
        onReady={() => {
          routeNameRef.current = navigationRef.current.getCurrentRoute().name;
        }}
        onStateChange={async () => {
          const previousRouteName = routeNameRef.current;
          const currentRouteName = navigationRef.current.getCurrentRoute().name;

          if (previousRouteName !== currentRouteName) {
            await analytics().logScreenView({
              screen_name: currentRouteName,
              screen_class: currentRouteName,
            });
          }
          routeNameRef.current = currentRouteName;
        }}>
        <Tab.Navigator
          initialRouteName="Home"
          tabBar={props => <ColorfulTabBar {...props} darkMode={true} />}>
          <Tab.Screen
            name="Home"
            component={HomeIndex}
            options={{
              title: 'Home',
              headerShown: false,
              icon: ({focused, color, size}) => (
                <Icon name="home" size={size} color={color} />
              ),
              color: 'primary',
            }}
          />
          {/* <Tab.Screen
            name="Player"
            component={PlayerScreen}
            options={{
              title: 'Player',
              icon: ({focused, color, size}) => (
                <Icon name="sharealt" size={size} color={color} />
              ),
              color: 'info',
            }}
          />
          <Tab.Screen
            name="Chat"
            component={DemoScreen}
            options={{
              title: 'Chat',
              icon: ({focused, color, size}) => (
                <Icon name="API" size={size} color={color} />
              ),
              color: 'warning',
            }}
          /> */}
          <Tab.Screen
            name="Likes"
            component={LikesScreen}
            options={{
              title: 'Liked',
              headerStyle: {
                backgroundColor: '#181818',
              },
              headerTintColor: 'white',
              icon: ({focused, color, size}) => (
                <Icon name="hearto" size={size} color={color} />
              ),
              color: 'danger',
            }}
          />
          <Tab.Screen
            name="Settings"
            component={SettingScreen}
            options={{
              headerShown: false,
              title: 'Settings',
              icon: ({focused, color, size}) => (
                <Icon name="setting" size={size} color={color} />
              ),
              color: 'success',
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </RecoilRoot>
  );
};

export default App;

const styles = StyleSheet.create({
  screen: {
    width: '100%',
    height: '100%',
    flex: 6,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
});
