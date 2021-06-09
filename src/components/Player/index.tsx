import styles from './styles.module.scss';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import { useContext, useEffect, useRef, useState } from 'react';
import { PlayerContext } from '../../contexts/playerContext';
import Image from 'next/image';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { convertDurationToTimeString } from '../../utils/convertDurationToTimeString';

export function Player() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [progress, setProgress] = useState(0);

  const {
    episodeList,
    currentEpisodeIndex,
    showPlayer,
    isPlaying,
    isLooping,
    isShuffling,
    hasNext,
    hasPrevious,
    handleShowAndHidePlayer,
    handlePlayOrPauseAudio,
    handleTogglePlay,
    handleToggleLoop,
    handleToggleShuffle,
    playNext,
    playPrevious
  } = useContext(PlayerContext);
  const episode = episodeList[currentEpisodeIndex];

  useEffect(() => {
    if (!audioRef.current) {
      return;
    };
    isPlaying ? audioRef.current.play() : audioRef.current.pause();
    progress === episode?.duration && playNext();
  }, [isPlaying])

  function setupProgressListener() {
    audioRef.current.currentTime = 0;
    audioRef.current.addEventListener('timeupdate', () => {
      setProgress(Math.floor(audioRef.current.currentTime));
    })
  }

  function handleSeek(amount: number) {
    audioRef.current.currentTime = amount;
    setProgress(amount);
  }

  return (
    <>
      {
        episode && (
          <audio
            src={episode.url}
            ref={audioRef}
            loop={isLooping}
            onPlay={() => handlePlayOrPauseAudio(true)}
            onPause={() => handlePlayOrPauseAudio(false)}
            onLoadedMetadata={setupProgressListener}
            autoPlay
          />
        )
      }
      {
        showPlayer ? (
          <div className={styles.player} >
            <header>
              <div className={styles.playing}>
                <img src="/assets/icons/headphone-icon.svg" alt="Tocando agora" />
                <p>Ouvindo agora</p>
              </div>
            </header>
            {
              episode ? (
                <>
                  <div className={styles.waves}>
                    <span className={styles.w1} />
                    <span className={styles.w2} />
                    <span className={styles.w3} />
                    <span className={styles.w4} />
                    <span className={styles.w5} />
                    <span className={styles.w6} />
                    <span className={styles.w7} />
                    <span className={styles.w8} />
                    <span className={styles.w9} />
                    <span className={styles.w10} />
                    <span className={styles.w11} />
                    <span className={styles.w12} />
                  </div>
                  <div className={styles.showedPlayer}>
                    <Image
                      width={600}
                      height={600}
                      src={episode.thumbnail}
                      objectFit="cover"
                    />
                    <h3>{episode.title}</h3>
                    <p>{episode.members}</p>
                  </div>
                </>
              ) : (
                <>
                  <img src="/assets/icons/sound-waves-icon.svg" alt="Tocando agora" />
                  <div className={styles.emptyPlayer}>
                    <p>Selecione um podcast para ouvir</p>
                  </div>
                </>
              )
            }

            <footer className={!episode ? styles.empty : ''}>
              <div className={styles.progress}>
                <span>{convertDurationToTimeString(progress)}</span>
                {episode ? (
                  <Slider
                    max={episode.duration}
                    value={progress}
                    onChange={handleSeek}
                    trackStyle={{ backgroundColor: 'var(--black-solid)' }}
                    handleStyle={{ border: '3px solid var(--black-solid)' }}
                  />
                ) : (
                  < div className={styles.slider}>
                    <div className={styles.emptySlider} />
                  </div>
                )}
                <span>{convertDurationToTimeString(episode?.duration ?? 0)}</span>
              </div>
              <button type="button" className={styles.hideButton} onClick={() => handleShowAndHidePlayer(false)}>
                <FaAngleRight size={20} />
              </button>
              <div className={styles.buttons}>
                <button
                  type="button"
                  disabled={!episode}
                  onClick={handleToggleShuffle}
                  className={isShuffling ? styles.isActive : ''}
                >
                  <img src="/assets/icons/shuffle-icon.svg" alt="Embaralhar" />
                </button>
                <button type="button" disabled={!episode || !hasPrevious} onClick={playPrevious}>
                  <img src="/assets/icons/play-previous-icon.svg" alt="Trocar para anterior" />
                </button>
                <button
                  type="button"
                  className={styles.playButton}
                  disabled={!episode}
                  onClick={handleTogglePlay}>
                  {!isPlaying
                    ? <img src="/assets/icons/play-button-icon.svg" alt="Startar" />
                    : <img src="/assets/icons/pause-icon.svg" alt="Pausar" />
                  }
                </button>
                <button type="button" disabled={!episode || !hasNext} onClick={playNext}>
                  <img src="/assets/icons/play-next-icon.svg" alt="Trocar para próxima" />
                </button>
                <button
                  type="button"
                  disabled={!episode}
                  onClick={handleToggleLoop}
                  className={isLooping ? styles.isActive : ''}
                >
                  <img src="/assets/icons/repeat-icon.svg" alt="Repetir" />
                </button>
              </div>
            </footer>
          </div>
        ) : (
          <div className={styles.playerHidden}>
            <button type="button" className={styles.showButton} onClick={() => handleShowAndHidePlayer(true)}>
              <FaAngleLeft size={20} />
            </button>
          </div>
        )
      }
    </>
  );
}