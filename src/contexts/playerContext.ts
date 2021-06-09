import { createContext } from 'react';

type Episode = {
  title: string;
  members: string;
  thumbnail: string;
  duration: number;
  url: string;
}

type PlayerContextProps = {
  episodeList: Episode[];
  episodeListMobile: Episode[];
  currentEpisodeIndex: number;
  currentEpisodeIndexMobile: number;
  showPlayer: boolean;
  isPlaying: boolean;
  isPlayingMobile: boolean;
  isLooping: boolean;
  isLoopingMobile: boolean;
  isShuffling: boolean;
  isShufflingMobile: boolean;
  hasPrevious: boolean,
  hasPreviousMobile: boolean,
  hasNext: boolean;
  hasNextMobile: boolean;
  handlePlay: (episode: Episode) => void;
  handlePlayMobile: (episode: Episode) => void;
  handleShowAndHidePlayer: (state: boolean) => void;
  handleTogglePlay: () => void;
  handleTogglePlayMobile: () => void;
  handleToggleLoop: () => void;
  handleToggleLoopMobile: () => void;
  handleToggleShuffle: () => void;
  handleToggleShuffleMobile: () => void;
  handlePlayOrPauseAudio: (state: boolean) => void;
  handlePlayOrPauseAudioMobile: (state: boolean) => void;
  playList: (list: Episode[], index: number) => void;
  playListMobile: (list: Episode[], index: number) => void;
  playNext: () => void;
  playNextMobile: () => void;
  playPrevious: () => void;
  playPreviousMobile: () => void;
}

export const PlayerContext = createContext({} as PlayerContextProps);