import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Vibration
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useRecoilState} from 'recoil';
import TrackPlayer, {Event} from 'react-native-track-player';
import {CurrentTrack, isTrackPlaying, TotalDuration, CurrentDuration, CurrentPositionSlider, LikedTracks, HideMoreSurahInfo} from '../../providers/Store';
import {tracks} from '../../data/Tracks';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {StackActions} from '@react-navigation/native';
import Slider from '@react-native-community/slider';
import AsyncStorage from '@react-native-async-storage/async-storage';

// import { SetupService } from '../../services/SetupService';



export default Player = ({route, navigation}) => {
  const [currentTrack, setCurrentTrack] = useRecoilState(CurrentTrack);
  const [isPlaying, setIsTrackPlaying] = useRecoilState(isTrackPlaying);
  // const [currentTrackInfo, setCurrentTrackInfo] = useState(tracks[currentTrack]);
  const [currentDuration, setCurrentDuration] = useRecoilState(CurrentDuration);
  const [totalDuration, setTotalDuration] = useRecoilState(TotalDuration);
  const [currentPositionSlider, setCurrentPositionSlider] = useRecoilState(CurrentPositionSlider);
  const [currentLikedTracks, setCurrentLikedTracks] = useRecoilState(LikedTracks);
  const [tempSlider, setTempSlider] = useState(false);
  const [tempSliderValue, setTempSliderValue] = useState(null);
  const [hideMoreSurahInfo, setHideMoreSurahInfo] = useRecoilState(HideMoreSurahInfo);

  
  

  // setCurrentTrackInfo(tracks[currentTrack])
  // handle dynamic change of track change
  // let currentTrackData = tracks.filter(function(item){
  //   return item.id == currentTrack;         
  //   })
  // setCurrentTrackInfo(currentTrackData)
  // console.log(currentTrackData);
  // setCurrentTrackInfo
  // handle vibrations
  const ONE_SECOND_IN_MS = 1000;

//   let currentTrackInfo = tracks[currentTrack];
  const popAction = StackActions.pop(1);

  // console.log('Current persisted track Id: '+ easyPeasyState.currTrackId);
  
  const SECOND_MS = 1000;
  async function getter(){
    try{
    let SECONDS = Math.round(await TrackPlayer.getPosition()) || 0;
    let TOTAL_SECONDS = Math.round(await TrackPlayer.getDuration()) || 1;
    let _currentDuration = new Date(SECONDS * 1000).toISOString().slice(11, 19);
    let _totalDuration = new Date(TOTAL_SECONDS * 1000).toISOString().slice(11, 19);
    setCurrentDuration(_currentDuration);
    setTotalDuration(_totalDuration);
    _currentSliderPosition = (SECONDS / TOTAL_SECONDS);
    setCurrentPositionSlider(_currentSliderPosition);
    await AsyncStorage.setItem('currentDurationDisplay', _currentDuration);
    await AsyncStorage.setItem('currentPositionSlider', _currentSliderPosition.toString());
    // console.log('current temp slider shown: ' + tempSlider);

    // console.log('current slider:' +currentPositionSlider);
    }catch(e){
      globalErrCatchMsg('getter()', e)
    }
  }
  // useEffect(() => {
    // const interval = setInterval(() => {
      setInterval(() => {
      // console.log('Logs every second');
      getter();
    }, SECOND_MS);

  //   return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
  // }, [])

  // handle remote track change
  // TrackPlayer.addEventListener(Event.PlaybackTrackChanged, (event) => {
  //   console.log('Event.PlaybackTrackChanged-playerScreen', event.track);
  //   setCurrentTrack(parseInt(event.track+1 ?? 0)); // this logic might break; due to some undiscovered reasons event.track returns  index as 0 and index 0 as undefined
  //   setCurrentTrackInfo(parseInt(tracks[event.track+1 ?? 0]));
  // });

  const handlePlayPause = async () => {
    try{
    setIsTrackPlaying(!isPlaying);
    !isPlaying ? await TrackPlayer.play() : await TrackPlayer.pause();
    console.log('playing: ' +isPlaying);
    await AsyncStorage.setItem('currentTrack', currentTrack.toString());
  
    console.log(await TrackPlayer.getDuration());
    }catch(e){
      globalErrCatchMsg('handlePlayPause', e)
    }
  }


  const handlePrev = async () => {
    try{
    console.log('handeling previous');
    if(currentTrack == 0)
      return
    setIsTrackPlaying(true);
    let _currentTrack = currentTrack - 1;
    await TrackPlayer.skipToPrevious()
    setCurrentTrack(_currentTrack);
    // setCurrentTrackInfo(tracks[_currentTrack]);
    await AsyncStorage.setItem('currentTrack', _currentTrack.toString());
    }catch(e){
      globalErrCatchMsg('handlePrev', e)
    }

  }


  const handleNext = async () => {
    console.log('handeling next');
    if(currentTrack == 114)
      return
    setIsTrackPlaying(true);
    let _currentTrack = currentTrack + 1;
    await TrackPlayer.skipToNext()
    TrackPlayer.play()
    setCurrentTrack(_currentTrack);
    // setCurrentTrackInfo(tracks[_currentTrack]);
    await AsyncStorage.setItem('currentTrack', _currentTrack.toString());

  }

  const handleOnSliderValueChange = (val) => {
    console.log(val);
    
    try{
      var a = totalDuration.split(':');
      // minutes are worth 60 seconds. Hours are worth 60 minutes.
      var seconds = (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2]) || 0; 
      let currentSeconds = seconds * val;
  
      // normalize to time string
      let tempTimeSlider = new Date(currentSeconds * 1000).toISOString().slice(11, 19);
  
      // set temp value
      setTempSliderValue(tempTimeSlider);
  
      // console.log(tempTimeSlider);
    }catch(e){
      globalErrCatchMsg('handleOnSliderValueChange', e)
      // console.log(e); // will mostly fire on track init
    }
    

  }

  const handleOnSliderStart = (val) => {
    console.log(val);
    // activate temp slider while sliding 
    setTempSlider(true);
  }

  const handleOnSliderEnd = async (val) => {
    // disable temp slider to false
    setTempSlider(false);
    console.log('Final Val: '+val);
    var a = totalDuration.split(':');
    // minutes are worth 60 seconds. Hours are worth 60 minutes.
    var seconds = (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2]);
    let convertedSliderVal = (val*seconds)
    console.log(seconds);
    console.log('converted val: '+ convertedSliderVal);
    TrackPlayer.seekTo(convertedSliderVal);
    // setCurrentPositionSlider(val);
    

  }

  const handleForwardSeek = async () => {
    try{
      // +15 secs
      let currPos = await TrackPlayer.getPosition() || 0;
      TrackPlayer.seekTo(currPos + 15);
      console.log('ff 30 secs: '+ currPos);
      
    }catch(e){
      console.log(e);
    }
    
  }
  const handleBackwardSeek = async () => {
    try{
      // -15 sec
      let currPos = await TrackPlayer.getPosition() || 0;
      TrackPlayer.seekTo(currPos - 15);
      console.log('ff 30 secs: '+ currPos);
      
    }catch(e){
      console.log(e);
    }
    
  }

  const handleLiked = async (trackId) => {
    console.log(currentLikedTracks);
    // await AsyncStorage.setItem('likedTracks', JSON.stringify([1]))
    if(currentLikedTracks){
      if((currentLikedTracks).includes(trackId)){
        console.log('it already included');
        // remove from liked
        arr = currentLikedTracks.filter(function(item) {
          return item != trackId
      })
      setCurrentLikedTracks(arr);
      await AsyncStorage.setItem('likedTracks', JSON.stringify(arr));
      Vibration.vibrate(0.1 * ONE_SECOND_IN_MS)
      return;
      }
      let tempLikes = [...currentLikedTracks, trackId]
      setCurrentLikedTracks([...currentLikedTracks, trackId])
      
      // save to async storage
      await AsyncStorage.setItem('likedTracks', JSON.stringify(tempLikes));
      Vibration.vibrate(0.1 * ONE_SECOND_IN_MS)
      Vibration.vibrate(0.1 * ONE_SECOND_IN_MS)

    }
    else{
      setCurrentLikedTracks([trackId])
      // save to async storage
      let tempLikes = [...currentLikedTracks, trackId]
      await AsyncStorage.setItem('likedTracks', JSON.stringify(tempLikes));
      if(Platform.OS == "android")
        Vibration.vibrate(0.4 * ONE_SECOND_IN_MS)

    }
    console.log(currentLikedTracks);
  }


  // global err listener for dubugging
  function globalErrCatchMsg(functionName, err){
    console.log('err from: ' + functionName);
    console.log(err);
    }
    

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10 }}>
      <TouchableOpacity>
        <Icon
          name="chevron-down"
          style={{ color: 'white', marginRight: 20 }}
          onPress={() => navigation.dispatch(popAction)}
          size={40}
        />
      </TouchableOpacity>

      {/* Centering the "Now Playing" text */}
      <View style={{ flex: 1, alignItems: 'center' }}>
        <Text style={{ fontSize: 20, paddingTop: 10, color: 'white' }}>
          Now Playing
        </Text>
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10 }}>
        <TouchableOpacity onPress={() => handleLiked(tracks[currentTrack]?.id)}>
          <Icon
            name="cards-heart"
            style={{ color: currentLikedTracks.includes(tracks[currentTrack]?.id) ? '#e31b23' : 'white'}}
            size={35}
          />
        </TouchableOpacity>

        <Icon name="dots-vertical" style={{ color: 'white' }} size={40} />
      </View>
    </View>

      <View style={styles.artworkContainer}>
        <Image style={{borderRadius: 50/2, borderColor: 'green', borderWidth: 5}} source={tracks[currentTrack]?.artwork} />
      </View>

      <View style={{alignItems: 'center', marginBottom: 20}}>
        <Text style={{fontSize: 25, marginBottom: 10, color: 'white'}}>
          {tracks[currentTrack]?.title}
        </Text>
        <Text style={{fontSize: 15, color: 'white'}}>{tracks[currentTrack]?.artist}</Text>
      </View>

      <View>
      <Slider
        style={{height: 60, marginLeft: 15, marginRight: 15}}
        minimumValue={0}
        maximumValue={1}
        value={currentPositionSlider}
        onSlidingStart={(val) => handleOnSliderStart(val)}
        onSlidingComplete={(val) => handleOnSliderEnd(val)}
        onValueChange={(val) => handleOnSliderValueChange(val)}
        minimumTrackTintColor="green"
        maximumTrackTintColor="white"
        thumbTintColor="white"
        />
      </View>
      <View style={{flexDirection: 'row',
          justifyContent: 'space-between', paddingLeft: 20, paddingRight: 20}}>
        <Text style={{color: 'white'}}>{tempSlider ? tempSliderValue : currentDuration}</Text>
        <Text style={{color: 'white'}}>{totalDuration || tracks[currentTrack]?.duration}</Text>
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'center'}}>
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                      <TouchableOpacity onPress={handleBackwardSeek}>
                        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                          <Icon name="rewind-15" size={35} style={{color: 'white'}}/>
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={handlePrev}>
                          <Icon name="skip-previous-outline" size={60} style={{color: 'white'}} />
                      </TouchableOpacity>
                      <TouchableOpacity onPress={handlePlayPause}>
                          <Icon name={isPlaying ? 'pause-circle' : 'play-circle'} size={60} style={{color: 'white'}}/>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={handleNext}>
                          <Icon name="skip-next-outline" size={60} style={{color: 'white'}}/>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={handleForwardSeek}>
                        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                          <Icon name="fast-forward-15" size={30} style={{color: 'white'}}/>
                        </View>
                      </TouchableOpacity>

          </View>
         
      </View>
      
        {/* more about surah  */}
        {
          !tracks[currentTrack]?.moreInfo || hideMoreSurahInfo ? null :
        <View style={{backgroundColor: '#181818', margin: 10, marginTop: 25, padding: 10, borderRadius: 15}}>
          <Text style={{color: 'orange', fontSize: 15}}>More About This Surah:</Text>
            <Text style={{color: 'white', padding: 10, fontFamily: 'monospace'}}>{tracks[currentTrack]?.moreInfo}</Text>
        </View>
        }
        </ScrollView>

      {/* future to */}
      {/* add suggestions view  */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  artworkContainer: {
    alignItems: 'center',
    marginTop: 100,
    marginBottom: 30,
    borderRadius: 200,
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 10,
    // },
    // shadowOpacity: 0.51,
    // shadowRadius: 13.16,
    // elevation: 20,
  },
  textWhite: {
    color: 'white'
  }
});
