import Head from 'next/head';
import { useState } from 'react';
import { Header } from '../components/Header';
import { Player } from '../components/Player';
import { MobilePlayer } from '../components/Player/Mobile';
import { PlayerContext } from '../contexts/playerContext';
import styles from '../styles/app.module.scss';
import '../styles/global.scss';

function MyApp({ Component, pageProps }) {
  //Desktop
  const [episodeList, setEpisodeList] = useState([]);
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
  const [showPlayer, setShowPlayer] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLooping, setIsLooping] = useState(false);
  const [isShuffling, setIsShuffling] = useState(false);

  //Mobile
  const [episodeListMobile, setEpisodeListMobile] = useState([]);
  const [currentEpisodeIndexMobile, setCurrentEpisodeIndexMobile] = useState(0);
  const [isPlayingMobile, setIsPlayingMobile] = useState(false);
  const [isLoopingMobile, setIsLoopingMobile] = useState(false);
  const [isShufflingMobile, setIsShufflingMobile] = useState(false);

  function handlePlay(episode) {
    setEpisodeList([episode]);
    setCurrentEpisodeIndex(0);
    setShowPlayer(true);
    setIsPlaying(true);
  }

  function handlePlayMobile(episode) {
    setEpisodeListMobile([episode]);
    setCurrentEpisodeIndexMobile(0);
    setIsPlayingMobile(true);
  }

  function playList(list, index: number) {
    setEpisodeList(list);
    setCurrentEpisodeIndex(index)
    setShowPlayer(true);
    setIsPlaying(true);
  }

  function playListMobile(list, index: number) {
    setEpisodeListMobile(list);
    setCurrentEpisodeIndexMobile(index)
    setIsPlayingMobile(true);
  }

  function handleShowAndHidePlayer(state: boolean) {
    setShowPlayer(state);
  }

  function handleTogglePlay() {
    setIsPlaying(!isPlaying);
  }

  function handleTogglePlayMobile() {
    setIsPlayingMobile(!isPlayingMobile);
  }

  function handleToggleLoop() {
    setIsLooping(!isLooping);
  }

  function handleToggleLoopMobile() {
    setIsLoopingMobile(!isLoopingMobile);
  }

  function handleToggleShuffle() {
    setIsShuffling(!isShuffling);
  }

  function handleToggleShuffleMobile() {
    setIsShufflingMobile(!isShufflingMobile);
  }

  function handlePlayOrPauseAudio(state: boolean) {
    setIsPlaying(state);
  }

  function handlePlayOrPauseAudioMobile(state: boolean) {
    setIsPlayingMobile(state);
  }

  const hasPrevious = currentEpisodeIndex > 0;
  const hasNext = (currentEpisodeIndex + 1) < episodeList.length;

  function playNext() {
    if (isShuffling) {
      const nextRandomEpisodeIndex = Math.floor(Math.random() * episodeList.length)
      setCurrentEpisodeIndex(nextRandomEpisodeIndex);

    } else if (hasNext) {
      setCurrentEpisodeIndex(currentEpisodeIndex + 1);
    }
  }

  const hasPreviousMobile = currentEpisodeIndexMobile > 0;
  const hasNextMobile = (currentEpisodeIndexMobile + 1) < episodeListMobile.length;

  function playNextMobile() {
    if (isShufflingMobile) {
      const nextRandomEpisodeIndexMobile = Math.floor(Math.random() * episodeListMobile.length)
      setCurrentEpisodeIndexMobile(nextRandomEpisodeIndexMobile);

    } else if (hasNextMobile) {
      setCurrentEpisodeIndexMobile(currentEpisodeIndexMobile + 1);
    }
  }

  function playPrevious() {
    if (hasPrevious) {
      setCurrentEpisodeIndex(currentEpisodeIndex - 1);
    }
  }

  function playPreviousMobile() {
    if (hasPreviousMobile) {
      setCurrentEpisodeIndexMobile(currentEpisodeIndexMobile - 1);
    }
  }

  return (
    <>
      <Head>
        <title>Uniscast 🎙️</title>
      </Head>
      <PlayerContext.Provider value={{
        episodeList,
        episodeListMobile,
        currentEpisodeIndex,
        currentEpisodeIndexMobile,
        showPlayer,
        isPlaying,
        isPlayingMobile,
        isLooping,
        isLoopingMobile,
        isShuffling,
        isShufflingMobile,
        hasNext,
        hasNextMobile,
        hasPrevious,
        hasPreviousMobile,
        handlePlay,
        handlePlayMobile,
        handleShowAndHidePlayer,
        handleTogglePlay,
        handleTogglePlayMobile,
        handleToggleLoop,
        handleToggleLoopMobile,
        handleToggleShuffle,
        handleToggleShuffleMobile,
        handlePlayOrPauseAudio,
        handlePlayOrPauseAudioMobile,
        playList,
        playListMobile,
        playNext,
        playNextMobile,
        playPrevious,
        playPreviousMobile
      }}>
        <div className={styles.wrapper}>
          <main>
            <Header />
            <Component {...pageProps} />
          </main>
          <Player />
          <MobilePlayer />
        </div>
      </PlayerContext.Provider>
    </>
  )
}

export default MyApp
