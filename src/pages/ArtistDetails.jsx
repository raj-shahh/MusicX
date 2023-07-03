import { useParams } from 'react-router-dom';
import { useGetArtistDetailsQuery, useGetArtistTopSongsQuery } from '../redux/services/Shazam';
import { Loader, Error, DetailsHeader, RelatedSongs } from '../components';

const rawSongObjectToSong = (rawSongObject) => {
  const name = rawSongObject?.attributes?.name;
  const artistName = rawSongObject?.attributes?.artistName;
  let image = rawSongObject?.attributes?.artwork?.url;
  image = image.replace('{w}', '800');
  image = image.replace('{h}', '800');
  const preview = rawSongObject?.attributes?.previews?.[0]?.url;
  const songid = rawSongObject?.id;

  const song = {
    artists: [artistName],
    hub: {
      actions: [{ name: 'apple', type: 'applemusicplay', id: songid }, { name: 'apple', type: 'uri', uri: preview }],
    },
    images: {
      coverart: image,
    },
    subtitle: artistName,
    title: name,
  };
  return song;
};

const ArtistDetails = () => {
  const { artistid } = useParams();
  const { data: artistObj, isLoading: isLoadingArtistDetails, error: artistDetailsError } = useGetArtistDetailsQuery(artistid);
  const artist = artistObj?.data[0];

  const { data: artistTopSongsObject, isLoading: isLoadingArtistTopSongs, error: artistTopSongsError } = useGetArtistTopSongsQuery(artistid);
  const artistTopSongs = {
    tracks: [],
  };
  artistTopSongsObject?.data?.forEach((rawSongObject) => {
    const song = rawSongObjectToSong(rawSongObject);
    artistTopSongs.tracks.push(song);
  });

  if (isLoadingArtistDetails || isLoadingArtistTopSongs) return <Loader />;
  if (artistDetailsError || artistTopSongsError) return <Error />;
  return (
    <div className="flex flex-col">
      <DetailsHeader artist={artist} />
      <h2 className="font-bold text-2xl text-white">Top Songs</h2>
      <RelatedSongs similarSongs={artistTopSongs} />
    </div>
  );
};

export default ArtistDetails;
