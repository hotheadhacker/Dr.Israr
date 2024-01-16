import {atom} from 'recoil'

export const MainStore = atom({
    key: 'test',
    default: 0,
});

export const ShowMiniPlayer = atom({
    key: 'show',
    default: false,
});
export const CurrentTrack = atom({
    key: 'track',
    default: null,
});

export const isTrackPlaying = atom({
    key: 'isPlaying',
    default: false,
});

export const TotalDuration = atom({
    key: 'totalDuration',
    default: 0,
});

export const CurrentDuration = atom({
    key: 'currentDuration',
    default: 0,
});

export const CurrentPositionSlider = atom({
    key: 'currentPositionSlider',
    default: 0,
});

export const LikedTracks = atom({
    key: 'LikedTracks',
    default: {},
});

export const HideMoreSurahInfo = atom({
    key: 'HideMoreSurahInfo',
    default: false,
});

