import { View, Text, StyleSheet, Image, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import {useRecoilState} from 'recoil';
import {CurrentTrack, isTrackPlaying, CurrentDuration} from '../providers/Store';
import {tracks} from '../data/Tracks'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import TrackPlayer, {usePlaybackState, Capability} from 'react-native-track-player';
import AsyncStorage from '@react-native-async-storage/async-storage';



export default MiniPlayer = ({visibility}) => {

    const [currentTrack, setCurrentTrack] = useRecoilState(CurrentTrack);
    const [isPlaying, setIsTrackPlaying] = useRecoilState(isTrackPlaying);
    const [currentDuration] = useRecoilState(CurrentDuration);

    const navigation = useNavigation();

    /// remote controles

    const handlePrev = async () => {
        console.log('handeling previous');
        if(currentTrack == 0)
            return
        setIsTrackPlaying(true);
        let _currentTrack = currentTrack - 1;
        await TrackPlayer.skipToPrevious()
        setIsTrackPlaying(true)
        setCurrentTrack(_currentTrack);
        await AsyncStorage.setItem('currentTrack', _currentTrack.toString());

        // console.log('Current Track: '+_currentTrack);
      }
    
    
      const handleNext = async () => {
        console.log('handeling next');
        if(currentTrack == 114)
            return
        let _currentTrack = currentTrack + 1;
        await TrackPlayer.skipToNext()
        TrackPlayer.play()
        setIsTrackPlaying(true)
        setCurrentTrack(_currentTrack);
        await AsyncStorage.setItem('currentTrack', _currentTrack.toString());

        // console.log('Current Track: '+_currentTrack);


      }
    return( !visibility ? null :
        <TouchableWithoutFeedback onPress={()=> navigation.navigate('HomePlayerScreen')}>
            <View style={styles.container}>
                {/* <Text style={styles.text}>{currentTrack}</Text> */}
                <View style={{flexDirection: 'row'}}>
                    <Image source={tracks[currentTrack]?.artwork} style={styles.miniThumbnail} />
                    <Text style={styles.text}>{tracks[currentTrack]?.title}</Text>
                    <Text style={styles.duration}>{currentDuration}</Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity onPress={handlePrev}>
                        <Icon name="skip-previous-outline" size={40} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={async () => {
                        !isPlaying ? TrackPlayer.play() : TrackPlayer.pause();
                        setIsTrackPlaying(!isPlaying)
                        await AsyncStorage.setItem('currentTrack', currentTrack.toString());

                    }}>
                        <Icon name={isPlaying ? 'pause-circle' : 'play-circle'} size={40} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleNext}>
                        <Icon name="skip-next-outline" size={40} />
                    </TouchableOpacity>
                </View>
            
            </View>
        </TouchableWithoutFeedback>
        
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: 'green',
        justifyContent: 'space-between',
        padding: 10,
        marginLeft: 5,
        marginRight: 5,
        borderRadius: 7
    },
    text: {
        color: 'white',
        marginTop: 10,
        marginLeft: 10,
    }, miniThumbnail: {
        width: 40,
        height: 40,
        borderRadius: 40/5
    },
    duration: {
        color: 'orange',
        fontSize: 12,
        marginTop: 12,
        marginLeft: 10,
    }

});