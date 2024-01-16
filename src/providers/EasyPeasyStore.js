// import {createStore, action} from 'easy-peasy'

// export default createStore({
//     // todos: ['Create store', 'Wrap application', 'Use store'],
//     currentDuration: 0,
//     setCurrentDuration: action((state, payload) => {
//     //   state.todos.push(payload);
//     state.currentDuration = payload.position;
//     }),
  
// });

import { persist, createStore, action } from 'easy-peasy';

const store = createStore(
  persist({
    currTrackId: null,
    setCurrentTrackId: action((state, payload) => {
      state.currTrackId = payload.setCurrentTrackId;
    }),
  }),
);