import { SafeAreaView, View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import {useRecoilState} from 'recoil'
import { createStackNavigator } from '@react-navigation/stack';


import {CurrentTrack, isTrackPlaying, ShowMiniPlayer} from '../../providers/Store';
import {tracks} from '../../data/Tracks';
import MiniPlayer from '../../components/miniPlayer';
import TrackPlayer from 'react-native-track-player';

export default function Home ({route, navigation}) {
    const Stack = createStackNavigator();

    // test recoil state management
    const [currentTrack, setCurrentTrack] = useRecoilState(CurrentTrack);
    const [showMiniPlayer, setShowMiniPlayer] = useRecoilState(ShowMiniPlayer);
    const [isPlaying, setIsTrackPlaying] = useRecoilState(isTrackPlaying);

    // some js logic
    console.log('home screen loaded, init333');
    return(
        <SafeAreaView style={styles.container}>
            {/* <Text style={styles.heroText}>Dr. Israr Bayaan Ul Quran</Text> */}
            <Image style={{height: 40, width: 40, alignSelf: 'center', marginTop: 5}} source={require("../../data/imgs/iqra.png")} />
            <Text style={styles.trackList}>Tracks</Text>

            <ScrollView style={styles.scrollView}>
                {tracks.map((track) => (
                    <TouchableOpacity style={{flexDirection: 'row', marginTop: 5, justifyContent: 'space-between', padding: 15, backgroundColor: '#181818', borderRadius: 15/2,
                    borderBottomWidth: 1}}
                    key={track.id}
                    onPress={() =>{
                        setCurrentTrack(parseInt(track.id));
                        if(!showMiniPlayer)
                            setShowMiniPlayer(true);
                        if(currentTrack != track.id){
                            TrackPlayer.skip(parseInt(track.id));
                            TrackPlayer.play();
                            setIsTrackPlaying(true);
                        }
                        navigation.navigate('HomePlayerScreen')
                    }}
                    >
                        <View style={{flexDirection: 'row'}}>
                            <Image source={track.artwork} style={styles.thumbnail} />
                            <Text style={styles.trackList}>{track.title}</Text>
                        </View>
                        <Text style={styles.trackDuration}>{track.duration}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            <MiniPlayer visibility={showMiniPlayer} />

        </SafeAreaView>
    );
}

// lets add some styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        color: 'white',
    },
    trackList: {
        color: 'white',
        fontSize: 18,
        marginLeft: 10,
        marginTop: 5
    },
    trackDuration: {
        color: 'white',
        fontSize: 11,
        marginTop: 15,
    },
    scrollView: {
        padding: 10
    },
    heroText: {
        fontSize: 25,
        color: 'white',
        alignSelf: 'center'
    },
    thumbnail: {
        width: 40,
        height: 40,
        borderRadius: 40/2,
    }
});