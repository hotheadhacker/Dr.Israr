import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Linking,
  Share,
  ToastAndroid,
  Switch
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import ContactUsScreen from './ContactUs';
import AboutDevScreen from './AboutDev';
import ContributeScreen from './Contribute';
import {useRecoilState} from 'recoil';
import {HideMoreSurahInfo} from '../../providers/Store';
import AsyncStorage from '@react-native-async-storage/async-storage';



export default Setting = ({route, navigation}) => {
  const [hideMoreSurahInfo, setHideMoreSurahInfo] = useRecoilState(HideMoreSurahInfo);

  const SettingStack = createStackNavigator();

  const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          'Salaam! Download Dr. Israr App from Play Store to listen bayan-ul-quran for free. Download Now.\n https://play.google.com/store/apps/details?id=dev.isalman.drisrar',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
          ToastAndroid.show("Thanks for sharing our app with your friends! Jazakallah", ToastAndroid.SHORT);
        } else {
          // shared
          ToastAndroid.show("Thanks for sharing our app with your friends! Jazakallah", ToastAndroid.SHORT);
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
        ToastAndroid.show("Don't feel like sharing app now, you can always do it later! Jazakallah", ToastAndroid.SHORT);

      }
    } catch (error) {
      alert(error.message);
    }
  };

  // handle hide more info of surah

  async function toggleSwitch(){
    let toggleState = !hideMoreSurahInfo;
    if(toggleState)
      ToastAndroid.show("'More Surah Info' under player sceen is disabled", ToastAndroid.SHORT);
    else
      ToastAndroid.show("More Surah Info is enabled", ToastAndroid.SHORT);

    setHideMoreSurahInfo(toggleState)
    await AsyncStorage.setItem('hideMoreSurahInfo', toggleState.toString());
    
  }

  const TransitionScreenOptions = {
    ...TransitionPresets.SlideFromRightIOS, // This is where the transition happens
  };
  

  const IndexScreen = ({route}) => (
    <SafeAreaView
      style={{flex: 1, padding: 10, backgroundColor: 'black', paddingTop: 25}}>
      <View style={{backgroundColor: '#181818', padding: 10, marginTop: 5}}>
        <TouchableOpacity
          style={{flexDirection: 'row', justifyContent: 'space-between'}}
          onPress={() => navigation.navigate('ContactUsScreen')}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Icon
              name="script-text"
              size={25}
              style={{marginRight: 5, color: 'white'}}
            />
            <Text style={{color: 'white', fontSize: 18}}>Hide More Sura Info</Text>
          </View>
          <Switch
            trackColor={{ false: "#767577", true: "#80c492" }}
            thumbColor={hideMoreSurahInfo ? "green" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={hideMoreSurahInfo}
          />
        </TouchableOpacity>
      </View>
      <View style={{backgroundColor: '#181818', padding: 10, marginTop: 5}}>
        <TouchableOpacity
          style={{flexDirection: 'row', justifyContent: 'space-between'}}
          onPress={() => navigation.navigate('ContactUsScreen')}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Icon
              name="contacts"
              size={25}
              style={{marginRight: 5, color: 'white'}}
            />
            <Text style={{color: 'white', fontSize: 18}}>Contact Us</Text>
          </View>
          <Icon
            name="chevron-right"
            size={25}
            style={{marginRight: 5, color: 'white'}}
          />
        </TouchableOpacity>
      </View>
      <View style={{backgroundColor: '#181818', padding: 10, marginTop: 5}}>
        <TouchableOpacity
          style={{flexDirection: 'row', justifyContent: 'space-between'}}
          onPress={() => navigation.navigate('AboutDevScreen')}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Icon
              name="information"
              size={25}
              style={{marginRight: 5, color: 'white'}}
            />
            <Text style={{color: 'white', fontSize: 18}}>About Developer</Text>
          </View>
          <Icon
            name="chevron-right"
            size={25}
            style={{marginRight: 5, color: 'white'}}
          />
        </TouchableOpacity>
      </View>
      <View style={{backgroundColor: '#181818', padding: 10, marginTop: 5}}>
        <TouchableOpacity
          style={{flexDirection: 'row', justifyContent: 'space-between'}}
          onPress={() => navigation.navigate('ContributeScreen')}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Icon
              name="github"
              size={25}
              style={{marginRight: 5, color: 'white'}}
            />
            <Text style={{color: 'white', fontSize: 18}}>Contribute</Text>
          </View>
          <Icon
            name="chevron-right"
            size={25}
            style={{marginRight: 5, color: 'white'}}
          />
        </TouchableOpacity>
      </View>
      <View style={{backgroundColor: '#181818', padding: 10, marginTop: 5}}>
        <TouchableOpacity
          style={{flexDirection: 'row', justifyContent: 'space-between'}}
          onPress={async () =>{
            await Linking.openURL('market://details?id=dev.isalman.drisrar')
            ToastAndroid.show("Please give 5 star rating! Jazakallah", ToastAndroid.SHORT);

          }
          }>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Icon
              name="star"
              size={25}
              style={{marginRight: 5, color: 'white'}}
            />
            <Text style={{color: 'white', fontSize: 18}}>Rate Us</Text>
          </View>
          <Icon
            name="chevron-right"
            size={25}
            style={{marginRight: 5, color: 'white'}}
          />
        </TouchableOpacity>
      </View>
      <View style={{backgroundColor: '#181818', padding: 10, marginTop: 5}}>
        <TouchableOpacity
          style={{flexDirection: 'row', justifyContent: 'space-between'}}
          onPress={onShare}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Icon
              name="share"
              size={25}
              style={{marginRight: 5, color: 'white'}}
            />
            <Text style={{color: 'white', fontSize: 18}}>Share App</Text>
          </View>
          <Icon
            name="chevron-right"
            size={25}
            style={{marginRight: 5, color: 'white'}}
          />
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          backgroundColor: '#181818',
          padding: 10,
          marginTop: 5,
        }}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Icon name="git" size={25} style={{marginRight: 5, color: 'white'}} />
          <Text style={{color: 'white', fontSize: 18}}>Version</Text>
        </View>
        <Text style={{color: 'white', fontSize: 15}}>4.2-stable</Text>
      </View>
      <View style={{color: 'white', flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 10, fontStyle: 'italic'}}>
      <Text style={{color: 'white', flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 10, fontStyle: 'italic'}}>
        Keep Praying For Palestine 🇵🇸
      </Text>
      </View >
      
      
      {/* <Text style={{color: 'white', marginTop: 10, fontStyle: 'italic'}}>⚠️ This is a beta release, there might be some 🐛 bugs, and some of the features might be unresponsive, if you spotted one</Text>
      <TouchableOpacity onPress={() => navigation.navigate('ContributeScreen')}><Text Text style={{color: 'orange', fontStyle: 'italic'}}>let us know!</Text></TouchableOpacity> */}
    </SafeAreaView>
  );

  return (
    <SettingStack.Navigator
    screenOptions={TransitionScreenOptions}>
      <SettingStack.Screen
        options={{headerShown: false}}
        name="SettingScreen"
        component={IndexScreen}
      />
      <SettingStack.Screen
        options={{
          headerShown: true,
          title: 'Contact Us',
          headerStyle: {
            backgroundColor: '#181818',
          },
          headerTintColor: 'white',
        }}
        name="ContactUsScreen"
        component={ContactUsScreen}
      />
      <SettingStack.Screen
        options={{
          headerShown: true,
          title: 'About Developer',
          headerStyle: {
            backgroundColor: '#181818',
          },
          headerTintColor: 'white',
        }}
        name="AboutDevScreen"
        component={AboutDevScreen}
      />
      <SettingStack.Screen
        options={{
          headerShown: true,
          title: 'Contribute',
          headerStyle: {
            backgroundColor: '#181818',
          },
          headerTintColor: 'white',
        }}
        name="ContributeScreen"
        component={ContributeScreen}
      />
    </SettingStack.Navigator>
  );
};
