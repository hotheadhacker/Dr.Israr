import { createStackNavigator } from '@react-navigation/stack';
import React, {useEffect} from 'react'
import HomeScreen from './Home';
import PlayerScreen from './Player';
import TrackPlayer, { Event, State } from 'react-native-track-player';

import { SetupService } from '../../services/SetupService';
import {tracks} from '../../data/Tracks';
import {useRecoilState} from 'recoil'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {CurrentTrack, ShowMiniPlayer, CurrentDuration, CurrentPositionSlider, LikedTracks, isTrackPlaying, HideMoreSurahInfo} from '../../providers/Store';




export default HomeIndex = () => {
    const [currentTrack, setCurrentTrack] = useRecoilState(CurrentTrack);
    const [showMiniPlayer, setShowMiniPlayer] = useRecoilState(ShowMiniPlayer);
    const [currentDuration, setCurrentDuration] = useRecoilState(CurrentDuration);
    const [currentPositionSlider, setCurrentPositionSlider] = useRecoilState(CurrentPositionSlider);
    const [currentLikedTracks, setCurrentLikedTracks] = useRecoilState(LikedTracks);
    const [isPlaying, setIsTrackPlaying] = useRecoilState(isTrackPlaying);
    const [hideMoreSurahInfo, setHideMoreSurahInfo] = useRecoilState(HideMoreSurahInfo);






    const HomeStack = createStackNavigator();

    // setup player
    useEffect(() => {
        async function run() {
        const isSetup = await SetupService();
        // setIsPlayerReady(isSetup);
        await TrackPlayer.add(tracks);
        
        // get last played track for screen init 
        try {
            // get liked trackes
            const likedTracks = JSON.parse(await AsyncStorage.getItem('likedTracks') ?? '[]')
            console.log('liked asyncstorage tracks: '+likedTracks);
            setCurrentLikedTracks(likedTracks)

            // get if hidden more surah info

            const hideMoreSurahInfo = await AsyncStorage.getItem('hideMoreSurahInfo') // get give some values than true.
            if(hideMoreSurahInfo && (hideMoreSurahInfo === 'true'))
                setHideMoreSurahInfo(true)
            else if(hideMoreSurahInfo && (hideMoreSurahInfo === 'true'))
                setHideMoreSurahInfo(false)
            else
                setHideMoreSurahInfo(false)

            const value = await AsyncStorage.getItem('currentTrack') ?? '0'
            const currDurationDisplay = await AsyncStorage.getItem('currentDurationDisplay') ?? '00:00:00'
            const currPosSlider = await AsyncStorage.getItem('currentPositionSlider') ?? 0.0001
            // console.log('curret async val: '+ value);
            if(value && typeof(value) != "undefined") {
                setCurrentTrack(parseInt(value));
                setShowMiniPlayer(true);
                // set mini notification bar in sync
                TrackPlayer.skip(parseInt(value));
            //   console.log('inside condition '+value);

            }
            if(currDurationDisplay) {
                setCurrentDuration(currDurationDisplay);
                // set initial position
                var a = currDurationDisplay.split(':');
                // minutes are worth 60 seconds. Hours are worth 60 minutes.
                var seconds = (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2]); 
                await TrackPlayer.seekTo(seconds);
            }
            if(currPosSlider) {
                setCurrentPositionSlider(parseFloat(currPosSlider));
            }
          } catch(e) {
            console.log('err in getting init values from asyncStorage: '+e);
            // error reading value
          }
            // add event lister for track change
            TrackPlayer.addEventListener(Event.PlaybackTrackChanged, (event) => {
                console.log('Event.PlaybackTrackChanged2', event.track);
                let newTrackId = 0
                
                if(typeof(event.track) != "undefined")
                    newTrackId = event.track + 1

                if(event.track == 114){
                    newTrackId = 0
                }

                setCurrentTrack(parseInt(newTrackId)); // this logic might break; due to some undiscovered reasons event.track returns  index as 0 and index 0 as undefined
            });

            TrackPlayer.addEventListener(Event.RemotePause, () => {
                setIsTrackPlaying(false);
              });
            
              TrackPlayer.addEventListener(Event.RemotePlay, () => {
                setIsTrackPlaying(true);
              });
         

        // const queue = await TrackPlayer.getQueue();
        // if (isSetup && queue.length <= 0) {
        //     await QueueInitialTracksService();


        // }
        }

        run();
    }, []);

     


    return(
        <HomeStack.Navigator screenOptions={{ presentation: 'modal' }}>
            <HomeStack.Screen options={{headerShown: false}} name="HomeScreen" component={HomeScreen} />
            <HomeStack.Screen options={{headerShown: false}} name="HomePlayerScreen" component={PlayerScreen} />
        </HomeStack.Navigator>
    );

}