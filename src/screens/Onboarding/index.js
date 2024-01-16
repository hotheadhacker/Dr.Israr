
import Onboarding from 'react-native-onboarding-swiper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState, useEffect} from 'react';
import { Image } from 'react-native'



export default function OnboardingScreen(){
  const [onboarded, setOnboarded] = useState('false');
  useEffect(() => {
    (async () => {
      setOnboarded(await AsyncStorage.getItem('onboarded'))
    })();
  });
  const onDoneOnboarding = () => {
    AsyncStorage.setItem('onboarded', 'true');
    setOnboarded('true');
  }
    return(<>
      {onboarded !== 'true' ?
        <Onboarding
          pages={[
            {
              backgroundColor: '#f0ea95',
              image: <Image source={require('../../data/imgs/iqra.png')} />,
              title: 'For Beta Testers',
              subtitle: 'We value your contribution in reviewing this app. In the span of testing any glitches, performance degradation including crashes will be reported automatically, however if you send us a review on playstore with exact issue or problem which will sent as a private response to the developer. Discord: 🔗 https://discord.gg/6NfgfahrxX ',
            },
            {
              backgroundColor: '#fff',
              image: <Image source={require('../../data/artworks/dr-israr.png')} />,
              title: 'Introduction',
              subtitle: 'This is a project supporting Dr. Israr\'s incridable work. ',
            },
            {
              backgroundColor: '#5e5e5b',
              image: <Image source={require('../../data/artworks/bayan-ul-quran.png')} />,
              title: 'Audio Player',
              subtitle: 'This app plays series of audio ftom the collection of "Bayan-Ul-Quran"',
            },
          ]}
          onDone={onDoneOnboarding}
  /> : null }</>)
}