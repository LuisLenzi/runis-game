import { useContext, useEffect, useRef, useState } from 'react';
import { PlayerContext } from '../../../contexts/playerContext';
import Image from 'next/image';
import styles from './styles.module.scss';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { convertDurationToTimeString } from '../../../utils/convertDurationToTimeString';

export function MobilePlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [progress, setProgress] = useState(0);

  const {
    episodeListMobile,
    currentEpisodeIndexMobile,
    isPlayingMobile,
    isLoopingMobile,
    isShufflingMobile,
    hasPreviousMobile,
    hasNextMobile,
    handleTogglePlayMobile,
    handleToggleLoopMobile,
    handleToggleShuffleMobile,
    handlePlayOrPauseAudioMobile,
    playNextMobile,
    playPreviousMobile
  } = useContext(PlayerContext);
  const episode = episodeListMobile[currentEpisodeIndexMobile];

  useEffect(() => {
    if (!audioRef.current) {
      return;
    };
    isPlayingMobile ? audioRef.current.play() : audioRef.current.pause();
    progress === episode?.duration && playNextMobile();
  }, [isPlayingMobile])

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
            loop={isLoopingMobile}
            onPlay={() => handlePlayOrPauseAudioMobile(true)}
            onPause={() => handlePlayOrPauseAudioMobile(false)}
            onLoadedMetadata={setupProgressListener}
            autoPlay
          />
        )
      }
      <div className={episode ? styles.player : styles.emptyPlayer}>
        {episode && (
          <div className={styles.mobilePlayerContent}>
            <h2>{episode.title}</h2>
          </div>
        )}
        <footer className={styles.empty}>
          <div className={styles.progress}>
            <span>{convertDurationToTimeString(progress)}</span>
            {episode ? (
              <Slider
                max={episode.duration}
                value={progress}
                onChange={handleSeek}
                trackStyle={{ backgroundColor: 'var(--orange-solid)' }}
                handleStyle={{ border: '3px solid var(--orange-solid)' }}
              />
            ) : (
              < div className={styles.slider}>
                <div className={styles.emptySlider} />
              </div>
            )}
            <span>{convertDurationToTimeString(episode?.duration ?? 0)}</span>
          </div>
          {episode && (
            <div className={styles.podcastImage}>
              <Image
                width={200}
                height={200}
                src={episode.thumbnail}
                objectFit="cover"
              />
            </div>
          )}
          <div className={styles.buttons}>
            <button
              type="button"
              disabled={!episode}
              onClick={handleToggleShuffleMobile}
              className={isShufflingMobile ? styles.isActive : ''}
            >
              <img src="/assets/icons/shuffle-icon.svg" alt="Embaralhar" />
            </button>
            <button type="button" disabled={!episode || !hasPreviousMobile} onClick={playPreviousMobile}>
              <img src="/assets/icons/play-previous-icon.svg" alt="Trocar para anterior" />
            </button>
            <button type="button" className={styles.playButton} onClick={handleTogglePlayMobile} disabled={!episode}>
              {!isPlayingMobile
                ? <img src="/assets/icons/play-button-icon.svg" alt="Startar" />
                : <img src="/assets/icons/pause-icon.svg" alt="Pausar" />
              }
            </button>
            <button type="button" disabled={!episode || !hasNextMobile} onClick={playNextMobile}>
              <img src="/assets/icons/play-next-icon.svg" alt="Trocar para próxima" />
            </button>
            <button
              type="button"
              disabled={!episode}
              onClick={handleToggleLoopMobile}
              className={isLoopingMobile ? styles.isActive : ''}
            >
              <img src="/assets/icons/repeat-icon.svg" alt="Repetir" />
            </button>
          </div>
        </footer>
      </div>
    </>
  )
}