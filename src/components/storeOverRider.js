import {CurrentTrack, isTrackPlaying, TotalDuration, CurrentDuration} from '../providers/Store';
import {useRecoilState} from 'recoil'
import React from 'react'


// export default
export default function CurrentTrackHelper(trackId){
    // const [currentTrack, setCurrentTrack] = useRecoilState(CurrentTrack);
    console.log('Helper function called: ' +trackId);
    setCurrentTrack(trackId.track)
    console.log('Helper function called with track id: ' +trackId.track);

    return(<></>)
}