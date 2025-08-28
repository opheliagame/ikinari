import { configureStore } from '@reduxjs/toolkit' 

import { createSlice } from '@reduxjs/toolkit'


export const previewSlice = createSlice({
  name: 'preview',
  initialState: {
    value: null,
  },
  reducers: {
    setPreviewScene: (state, action) => {
      state.value = action.payload
    }
  }
})
export const { setPreviewScene } = previewSlice.actions 

export const playerSlice = createSlice({
  name: 'player',
  initialState: {
    value: {
      isPlaying: false,
      timeline: [],
      sceneIndex: -1,
    }
  },
  reducers: {
    addScene: (state, action) => {
      state.value.timeline.push(action.payload)
    },
    incrementScene: (state) => {
      state.value.sceneIndex = (state.value.sceneIndex + 1) % state.value.timeline.length
    },
    togglePlay: (state) => {
      state.value.isPlaying = !state.value.isPlaying
    }
  }
})

export const { addScene, incrementScene, togglePlay } = playerSlice.actions

export default configureStore({
  reducer: {
    preview: previewSlice.reducer,
    player: playerSlice.reducer,
  }
})