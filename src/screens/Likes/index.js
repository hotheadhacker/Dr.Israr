import React from 'react'
import { SafeAreaView, View, Text, ScrollView, TouchableOpacity, StyleSheet, Image } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import TrackPlayer from 'react-native-track-player';
import MiniPlayer from '../../components/miniPlayer';
import {useRecoilState} from 'recoil';
import {LikedTracks, CurrentTrack, ShowMiniPlayer, isTrackPlaying} from '../../providers/Store';
import {tracks} from '../../data/Tracks';



export default ({navigation}) => {
    const [currentLikedTracks, setCurrentLikedTracks] = useRecoilState(LikedTracks);
    const [currentTrack, setCurrentTrack] = useRecoilState(CurrentTrack);
    const [showMiniPlayer, setShowMiniPlayer] = useRecoilState(ShowMiniPlayer);
    const [isPlaying, setIsTrackPlaying] = useRecoilState(isTrackPlaying);


    return(<SafeAreaView style={{flex: 1, flexDirection: 'column', justifyContent: 'space-between'}}>{
        currentLikedTracks.length == 0 ? <View style={{flex: 1, justifyContent: 'center'}}><Text style={{color: 'orange', alignSelf: 'center'}}>All your liked tracks/bayaans will appear here!</Text></View> :
                    <ScrollView style={styles.scrollView}>
                            {tracks.map((track) => (
                                !currentLikedTracks.includes(track.id) ? null :
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

                
            }
<View>
<MiniPlayer visibility={showMiniPlayer} />
</View>
    </SafeAreaView>)
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
        padding: 10,
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