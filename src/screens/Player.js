import {View, Text} from 'react-native';
import React from 'react';
import TrackPlayer, {usePlaybackState} from 'react-native-track-player';

import {tracks} from '../data/Tracks';
export default function Player({route}) {
  console.log('playing1');

  // some js logic
  const music = [
    {
      title: 'death bed',
      artist: 'Powfu',
      artwork:
        'https://images-na.ssl-images-amazon.com/images/I/A1LVEJikmZL._AC_SX425_.jpg',
      url: 'https://archive.org/download/BayanUlQuranByDr.IsrarAhmed_201707/001%20AL-FATIAH.mp3',
      duration: 2 * 60 + 53,
      id: '1',
    },
    {
      title: 'bad liar',
      artist: 'Imagine Dragons',
      artwork:
        'https://images-na.ssl-images-amazon.com/images/I/A1LVEJikmZL._AC_SX425_.jpg',
      url: 'https://sample-music.netlify.app/Bad%20Liar.mp3',
      duration: 2 * 60,
      id: '2',
      track_number: '2',
    },
  ];

  const trackPlayer = async () => {
    // await TrackPlayer.setupPlayer();

    // await TrackPlayer.add(music);

    await TrackPlayer.play();
    console.log('playing');
  };

  // trackPlayer();

  return (
    <View>
      <Text>Let's Say Hi From Player</Text>
      <Text>{route.name}</Text>
    </View>
  );
}
