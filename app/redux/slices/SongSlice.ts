import { createSlice } from "@reduxjs/toolkit";
import { Song } from "@/app/redux/types/Song.type";

interface MusicPlayerState {
  isPlaying: boolean;
  currentSong: Song | null;
}

const initialState: MusicPlayerState = {
  isPlaying: false,
  currentSong: null,
};

const musicPlayerSlice = createSlice({
  name: "musicPlayer",
  initialState,
  reducers: {
    setSong(state, action) {
      state.currentSong = action.payload;
    },
    setIsPlaying(state, action) {
      state.isPlaying = action.payload;
    },
    stopSong(state) {
      state.isPlaying = false;
      state.currentSong = null;
    },
  },
});

export const { setSong, setIsPlaying, stopSong } = musicPlayerSlice.actions;
export default musicPlayerSlice.reducer;
