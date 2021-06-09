import { useEffect, useState } from 'react';
import { format, parseISO } from 'date-fns';
import styles from './podcast.module.scss';
import ptBR from 'date-fns/locale/pt-BR';
import { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import api from "../../services/api";
import { FaAngleLeft, FaMicrophone } from 'react-icons/fa';
import { convertDurationToTimeString } from "../../utils/convertDurationToTimeString";
import { Loading } from '../../components/Loading';
import Link from 'next/link';

type Episode = {
  id: string;
  title: string;
  thumbnail: string;
  members: string;
  duration: number;
  durationAsString: string;
  publishedAt: string;
  description: string;
}

type PodcastProps = {
  episode: Episode;
}

export default function Podcast({ episode }: PodcastProps) {
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setShowLoading(false);
    }, 1500);
  }, [])

  return (
    <>
      <div className={styles.podcast}>
        <div className={styles.thumbnailContainer}>
          <Link href="/">
            <button type="button">
              <FaAngleLeft size={20} />
            </button>
          </Link>
          <Image
            width={800}
            height={225}
            src={episode.thumbnail}
            objectFit="cover"
          />
        </div>
        <header>
          <h1>{episode.title}</h1>
          <div className={styles.headerContent}>
            <span>{episode.members}</span>
            <span>{episode.publishedAt}</span>
            <span>{episode.durationAsString}</span>
          </div>
        </header>
        <div className={styles.description} dangerouslySetInnerHTML={{ __html: episode.description }} />
        <div className={styles.backToHome}>
          <Link href="/">
            <button type="button">
              <FaMicrophone size={27.5} />
            </button>
          </Link>
          <h1>Acompanhe por mais Podcasts</h1>
        </div>
      </div>
      <Loading show={showLoading} />
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking'
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { podcast } = context.params;
  const { data } = await api.get(`/api/server.json`)
  const currentEpisode = data.episodes.find(episode => episode.id === podcast)

  const episode = {
    id: currentEpisode.id,
    title: currentEpisode.title,
    thumbnail: currentEpisode.thumbnail,
    members: currentEpisode.members,
    description: currentEpisode.description,
    url: currentEpisode.url,
    duration: Number(currentEpisode.duration),
    durationAsString: convertDurationToTimeString(Number(currentEpisode.duration)),
    publishedAt: format(parseISO(currentEpisode.published_at), 'EEEE, dd MMMM', {
      locale: ptBR
    }),
  }

  return {
    props: { episode },
    revalidate: 60 * 60 * 24,
  }
}
