import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  HiHome, 
  HiSearch, 
  HiHeart, 
  HiCollection, 
  HiPlus,
  HiPlay,
  HiPause,
  HiVolumeUp,
  HiDotsHorizontal
} from 'react-icons/hi';
import { 
  HiBackward,
  HiForward,
  HiArrowPath as HiRefresh,
  HiArrowsRightLeft as HiShuffle
} from 'react-icons/hi2';
import { BsSpotify } from 'react-icons/bs';

// Mock Data
const mockUser = {
  name: "John Doe",
  avatar: "https://images.unsplash.com/photo-1528922937574-0d49d40eb933"
};

const mockPlaylists = [
  { id: 1, name: "Liked Songs", tracks: 234, image: "https://images.unsplash.com/photo-1487260211189-670c54da558d", color: "from-purple-900 to-blue-900" },
  { id: 2, name: "Chill Vibes", tracks: 56, image: "https://images.unsplash.com/photo-1520262494112-9fe481d36ec3", color: "from-green-900 to-blue-900" },
  { id: 3, name: "Jazz Classics", tracks: 89, image: "https://images.unsplash.com/photo-1615648091777-276a4267fde1", color: "from-yellow-900 to-red-900" },
  { id: 4, name: "Rock Anthems", tracks: 124, image: "https://images.unsplash.com/photo-1431308305062-f218b6fe520a", color: "from-red-900 to-pink-900" },
  { id: 5, name: "Classical Flow", tracks: 67, image: "https://images.unsplash.com/photo-1488630228244-bcdf33562a43", color: "from-indigo-900 to-purple-900" },
  { id: 6, name: "Indie Mix", tracks: 78, image: "https://images.unsplash.com/photo-1597052826387-65a5a9639944", color: "from-pink-900 to-red-900" }
];

const mockTracks = [
  { id: 1, title: "Blinding Lights", artist: "The Weeknd", album: "After Hours", duration: "3:20", image: "https://images.pexels.com/photos/167092/pexels-photo-167092.jpeg", liked: true },
  { id: 2, title: "Watermelon Sugar", artist: "Harry Styles", album: "Fine Line", duration: "2:54", image: "https://images.unsplash.com/photo-1487260211189-670c54da558d", liked: false },
  { id: 3, title: "Levitating", artist: "Dua Lipa", album: "Future Nostalgia", duration: "3:23", image: "https://images.unsplash.com/photo-1520262494112-9fe481d36ec3", liked: true },
  { id: 4, title: "Good 4 U", artist: "Olivia Rodrigo", album: "SOUR", duration: "2:58", image: "https://images.unsplash.com/photo-1528922937574-0d49d40eb933", liked: false },
  { id: 5, title: "Stay", artist: "The Kid LAROI & Justin Bieber", album: "F*CK LOVE 3", duration: "2:21", image: "https://images.unsplash.com/photo-1597052826387-65a5a9639944", liked: true }
];

const mockArtists = [
  { id: 1, name: "The Weeknd", followers: "85M", image: "https://images.unsplash.com/photo-1528922937574-0d49d40eb933" },
  { id: 2, name: "Billie Eilish", followers: "67M", image: "https://images.unsplash.com/photo-1597052826387-65a5a9639944" },
  { id: 3, name: "Drake", followers: "92M", image: "https://images.unsplash.com/photo-1431308305062-f218b6fe520a" },
  { id: 4, name: "Taylor Swift", followers: "78M", image: "https://images.unsplash.com/photo-1615648091777-276a4267fde1" }
];

const mockCategories = [
  { id: 1, name: "Made For You", color: "bg-purple-600", image: "https://images.unsplash.com/photo-1487260211189-670c54da558d" },
  { id: 2, name: "Recently Played", color: "bg-green-600", image: "https://images.unsplash.com/photo-1520262494112-9fe481d36ec3" },
  { id: 3, name: "Podcasts", color: "bg-blue-600", image: "https://images.pexels.com/photos/6953769/pexels-photo-6953769.jpeg" },
  { id: 4, name: "Charts", color: "bg-red-600", image: "https://images.pexels.com/photos/167092/pexels-photo-167092.jpeg" },
  { id: 5, name: "New Releases", color: "bg-yellow-600", image: "https://images.unsplash.com/photo-1528922937574-0d49d40eb933" },
  { id: 6, name: "Discover", color: "bg-pink-600", image: "https://images.unsplash.com/photo-1597052826387-65a5a9639944" }
];

// Components
export const Sidebar = ({ currentView, setCurrentView, playlists = [] }) => {
  const [likedSongs] = useState(mockPlaylists[0]);
  
  return (
    <div className="w-64 bg-black h-full p-6 flex flex-col">
      {/* Logo */}
      <div className="flex items-center mb-8">
        <BsSpotify className="text-white text-3xl mr-2" />
        <span className="text-white text-xl font-bold">Spotify</span>
      </div>
      
      {/* Main Navigation */}
      <nav className="mb-8">
        <button 
          onClick={() => setCurrentView('home')}
          className={`flex items-center w-full p-2 rounded-md mb-2 transition-colors ${
            currentView === 'home' ? 'bg-gray-800 text-white' : 'text-gray-400 hover:text-white'
          }`}
        >
          <HiHome className="mr-3 text-xl" />
          Home
        </button>
        <button 
          onClick={() => setCurrentView('search')}
          className={`flex items-center w-full p-2 rounded-md mb-2 transition-colors ${
            currentView === 'search' ? 'bg-gray-800 text-white' : 'text-gray-400 hover:text-white'
          }`}
        >
          <HiSearch className="mr-3 text-xl" />
          Search
        </button>
        <button 
          onClick={() => setCurrentView('library')}
          className={`flex items-center w-full p-2 rounded-md transition-colors ${
            currentView === 'library' ? 'bg-gray-800 text-white' : 'text-gray-400 hover:text-white'
          }`}
        >
          <HiCollection className="mr-3 text-xl" />
          Your Library
        </button>
      </nav>
      
      {/* Create Playlist */}
      <button className="flex items-center w-full p-2 text-gray-400 hover:text-white transition-colors mb-4">
        <HiPlus className="mr-3 text-xl" />
        Create Playlist
      </button>
      
      {/* Liked Songs */}
      <button 
        onClick={() => setCurrentView({ type: 'playlist', data: likedSongs })}
        className="flex items-center w-full p-2 text-gray-400 hover:text-white transition-colors mb-6"
      >
        <div className="w-5 h-5 bg-gradient-to-br from-purple-400 to-blue-600 rounded-sm mr-3 flex items-center justify-center">
          <HiHeart className="text-white text-xs" />
        </div>
        Liked Songs
      </button>
      
      {/* Playlists */}
      <div className="flex-1 overflow-y-auto">
        <div className="border-t border-gray-800 pt-4">
          {mockPlaylists.slice(1).map((playlist) => (
            <button
              key={playlist.id}
              onClick={() => setCurrentView({ type: 'playlist', data: playlist })}
              className="block w-full text-left p-2 text-gray-400 hover:text-white transition-colors truncate"
            >
              {playlist.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export const TopBar = ({ title = "Home", showSearch = false, searchQuery = "", setSearchQuery = () => {} }) => {
  return (
    <div className="flex items-center justify-between p-6 bg-gradient-to-b from-gray-900/50 to-transparent">
      <div className="flex items-center">
        {showSearch ? (
          <div className="relative">
            <HiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="What do you want to listen to?"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-white text-black rounded-full py-2 pl-10 pr-4 w-80 focus:outline-none focus:ring-2 focus:ring-white"
            />
          </div>
        ) : (
          <h1 className="text-white text-3xl font-bold">{title}</h1>
        )}
      </div>
      
      <div className="flex items-center space-x-4">
        <div className="w-8 h-8 bg-gray-700 rounded-full overflow-hidden">
          <img src={mockUser.avatar} alt="User" className="w-full h-full object-cover" />
        </div>
      </div>
    </div>
  );
};

export const PlaylistCard = ({ playlist, onClick, size = "medium" }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const sizeClasses = {
    small: "w-32",
    medium: "w-48",
    large: "w-56"
  };
  
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      onClick={onClick}
      className={`${sizeClasses[size]} bg-gray-800 rounded-lg p-4 cursor-pointer transition-colors hover:bg-gray-700`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative mb-4">
        <img 
          src={playlist.image} 
          alt={playlist.name}
          className="w-full aspect-square object-cover rounded-lg"
        />
        <AnimatePresence>
          {isHovered && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute bottom-2 right-2 w-12 h-12 bg-green-500 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
            >
              <HiPlay className="text-black text-xl ml-1" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
      <h3 className="text-white font-semibold truncate mb-1">{playlist.name}</h3>
      <p className="text-gray-400 text-sm">{playlist.tracks} songs</p>
    </motion.div>
  );
};

export const TrackRow = ({ track, index, onPlay, isPlaying = false }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(track.liked);
  
  return (
    <div 
      className={`grid grid-cols-12 gap-4 p-2 rounded-md hover:bg-gray-800 transition-colors ${isPlaying ? 'bg-gray-800' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="col-span-1 flex items-center">
        {isHovered ? (
          <button onClick={() => onPlay(track)} className="text-white hover:text-green-500">
            {isPlaying ? <HiPause /> : <HiPlay />}
          </button>
        ) : (
          <span className="text-gray-400 text-sm">{index + 1}</span>
        )}
      </div>
      
      <div className="col-span-5 flex items-center">
        <img src={track.image} alt={track.title} className="w-10 h-10 rounded mr-3" />
        <div>
          <p className={`font-medium ${isPlaying ? 'text-green-500' : 'text-white'}`}>{track.title}</p>
          <p className="text-gray-400 text-sm">{track.artist}</p>
        </div>
      </div>
      
      <div className="col-span-4 flex items-center">
        <p className="text-gray-400 text-sm">{track.album}</p>
      </div>
      
      <div className="col-span-1 flex items-center">
        <button 
          onClick={() => setIsLiked(!isLiked)}
          className={`mr-4 ${isLiked ? 'text-green-500' : 'text-gray-400 hover:text-white'}`}
        >
          <HiHeart />
        </button>
      </div>
      
      <div className="col-span-1 flex items-center justify-end">
        <span className="text-gray-400 text-sm">{track.duration}</span>
      </div>
    </div>
  );
};

export const CategoryCard = ({ category, onClick }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      onClick={onClick}
      className={`${category.color} rounded-lg h-32 relative overflow-hidden cursor-pointer`}
    >
      <div className="p-4">
        <h3 className="text-white font-bold text-lg">{category.name}</h3>
      </div>
      <img 
        src={category.image} 
        alt={category.name}
        className="absolute bottom-0 right-0 w-20 h-20 object-cover transform rotate-12 translate-x-2 translate-y-2"
      />
    </motion.div>
  );
};

export const Player = ({ currentTrack, isPlaying, setIsPlaying, volume, setVolume }) => {
  const [progress, setProgress] = useState(0);
  const [isShuffle, setIsShuffle] = useState(false);
  const [repeatMode, setRepeatMode] = useState('off'); // off, one, all
  
  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress(prev => prev >= 100 ? 0 : prev + 0.5);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);
  
  if (!currentTrack) return null;
  
  return (
    <div className="bg-gray-900 border-t border-gray-800 p-4">
      <div className="grid grid-cols-3 items-center">
        {/* Track Info */}
        <div className="flex items-center">
          <img src={currentTrack.image} alt={currentTrack.title} className="w-14 h-14 rounded mr-4" />
          <div>
            <p className="text-white font-medium">{currentTrack.title}</p>
            <p className="text-gray-400 text-sm">{currentTrack.artist}</p>
          </div>
          <button className="ml-4 text-gray-400 hover:text-green-500">
            <HiHeart />
          </button>
        </div>
        
        {/* Controls */}
        <div className="flex flex-col items-center">
          <div className="flex items-center space-x-4 mb-2">
            <button 
              onClick={() => setIsShuffle(!isShuffle)}
              className={`${isShuffle ? 'text-green-500' : 'text-gray-400'} hover:text-white`}
            >
              <HiShuffle />
            </button>
            <button className="text-gray-400 hover:text-white">
              <HiBackward />
            </button>
            <button 
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-8 h-8 bg-white rounded-full flex items-center justify-center hover:scale-110 transition-transform"
            >
              {isPlaying ? <HiPause className="text-black" /> : <HiPlay className="text-black ml-1" />}
            </button>
            <button className="text-gray-400 hover:text-white">
              <HiForward />
            </button>
            <button 
              onClick={() => setRepeatMode(repeatMode === 'off' ? 'all' : repeatMode === 'all' ? 'one' : 'off')}
              className={`${repeatMode !== 'off' ? 'text-green-500' : 'text-gray-400'} hover:text-white`}
            >
              <HiRefresh />
            </button>
          </div>
          
          {/* Progress Bar */}
          <div className="flex items-center w-full max-w-lg">
            <span className="text-gray-400 text-xs mr-2">
              {Math.floor(progress * 2)}:{String(Math.floor((progress * 2) % 1 * 60)).padStart(2, '0')}
            </span>
            <div className="flex-1 bg-gray-600 h-1 rounded-full">
              <div 
                className="bg-white h-1 rounded-full transition-all duration-1000"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-gray-400 text-xs ml-2">{currentTrack.duration}</span>
          </div>
        </div>
        
        {/* Volume */}
        <div className="flex items-center justify-end">
          <HiVolumeUp className="text-gray-400 mr-2" />
          <div className="w-24 bg-gray-600 h-1 rounded-full">
            <div 
              className="bg-white h-1 rounded-full"
              style={{ width: `${volume}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export const HomeView = ({ setCurrentView, onTrackSelect }) => {
  const recentlyPlayed = mockPlaylists.slice(0, 6);
  const madeForYou = mockPlaylists.slice(2, 6);
  const popularArtists = mockArtists.slice(0, 4);
  
  return (
    <div className="p-6 pb-32">
      {/* Recently Played */}
      <section className="mb-8">
        <h2 className="text-white text-2xl font-bold mb-4">Recently played</h2>
        <div className="grid grid-cols-3 gap-4">
          {recentlyPlayed.map((playlist) => (
            <motion.div
              key={playlist.id}
              whileHover={{ scale: 1.02 }}
              onClick={() => setCurrentView({ type: 'playlist', data: playlist })}
              className="bg-gray-800 rounded-md flex items-center overflow-hidden cursor-pointer hover:bg-gray-700 transition-colors"
            >
              <img src={playlist.image} alt={playlist.name} className="w-16 h-16 object-cover" />
              <span className="text-white font-medium ml-4">{playlist.name}</span>
            </motion.div>
          ))}
        </div>
      </section>
      
      {/* Made for You */}
      <section className="mb-8">
        <h2 className="text-white text-2xl font-bold mb-4">Made for you</h2>
        <div className="grid grid-cols-auto-fit gap-6">
          {madeForYou.map((playlist) => (
            <PlaylistCard 
              key={playlist.id} 
              playlist={playlist} 
              onClick={() => setCurrentView({ type: 'playlist', data: playlist })}
            />
          ))}
        </div>
      </section>
      
      {/* Popular Artists */}
      <section>
        <h2 className="text-white text-2xl font-bold mb-4">Popular artists</h2>
        <div className="grid grid-cols-auto-fit gap-6">
          {popularArtists.map((artist) => (
            <motion.div
              key={artist.id}
              whileHover={{ scale: 1.05 }}
              onClick={() => setCurrentView({ type: 'artist', data: artist })}
              className="bg-gray-800 rounded-lg p-4 cursor-pointer hover:bg-gray-700 transition-colors w-48"
            >
              <img 
                src={artist.image} 
                alt={artist.name}
                className="w-full aspect-square object-cover rounded-full mb-4"
              />
              <h3 className="text-white font-semibold">{artist.name}</h3>
              <p className="text-gray-400 text-sm">Artist</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export const SearchView = ({ searchQuery, setSearchQuery, setCurrentView, onTrackSelect }) => {
  const [searchResults, setSearchResults] = useState([]);
  
  useEffect(() => {
    if (searchQuery.trim()) {
      // Filter tracks and playlists based on search query
      const filteredTracks = mockTracks.filter(track =>
        track.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        track.artist.toLowerCase().includes(searchQuery.toLowerCase())
      );
      const filteredPlaylists = mockPlaylists.filter(playlist =>
        playlist.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults({ tracks: filteredTracks, playlists: filteredPlaylists });
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);
  
  return (
    <div className="p-6 pb-32">
      {!searchQuery.trim() ? (
        <>
          <h2 className="text-white text-2xl font-bold mb-6">Browse all</h2>
          <div className="grid grid-cols-auto-fit gap-6">
            {mockCategories.map((category) => (
              <CategoryCard 
                key={category.id} 
                category={category}
                onClick={() => {/* Handle category click */}}
              />
            ))}
          </div>
        </>
      ) : (
        <div>
          {searchResults.tracks?.length > 0 && (
            <section className="mb-8">
              <h2 className="text-white text-2xl font-bold mb-4">Songs</h2>
              <div className="space-y-1">
                {searchResults.tracks.slice(0, 5).map((track, index) => (
                  <TrackRow 
                    key={track.id} 
                    track={track} 
                    index={index}
                    onPlay={onTrackSelect}
                  />
                ))}
              </div>
            </section>
          )}
          
          {searchResults.playlists?.length > 0 && (
            <section>
              <h2 className="text-white text-2xl font-bold mb-4">Playlists</h2>
              <div className="grid grid-cols-auto-fit gap-6">
                {searchResults.playlists.map((playlist) => (
                  <PlaylistCard 
                    key={playlist.id} 
                    playlist={playlist} 
                    onClick={() => setCurrentView({ type: 'playlist', data: playlist })}
                  />
                ))}
              </div>
            </section>
          )}
          
          {searchResults.tracks?.length === 0 && searchResults.playlists?.length === 0 && (
            <div className="text-center py-16">
              <p className="text-gray-400 text-lg">No results found for "{searchQuery}"</p>
              <p className="text-gray-500 text-sm mt-2">Try searching for something else</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export const PlaylistView = ({ playlist, onTrackSelect, currentTrack, isPlaying }) => {
  return (
    <div className="pb-32">
      {/* Playlist Header */}
      <div className={`bg-gradient-to-b ${playlist.color} to-gray-900 p-6 pb-8`}>
        <div className="flex items-end space-x-6">
          <img 
            src={playlist.image} 
            alt={playlist.name}
            className="w-64 h-64 object-cover shadow-2xl"
          />
          <div className="flex-1">
            <p className="text-white/80 text-sm font-medium uppercase tracking-wide mb-2">Playlist</p>
            <h1 className="text-white text-6xl font-bold mb-4">{playlist.name}</h1>
            <p className="text-white/80 text-sm mb-4">
              Made for {mockUser.name} • {playlist.tracks} songs
            </p>
          </div>
        </div>
      </div>
      
      {/* Play Button */}
      <div className="p-6">
        <button className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center hover:scale-110 transition-transform mb-6">
          <HiPlay className="text-black text-2xl ml-1" />
        </button>
        
        {/* Track List */}
        <div className="space-y-1">
          {mockTracks.map((track, index) => (
            <TrackRow 
              key={track.id} 
              track={track} 
              index={index}
              onPlay={onTrackSelect}
              isPlaying={currentTrack?.id === track.id && isPlaying}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export const LibraryView = ({ setCurrentView }) => {
  return (
    <div className="p-6 pb-32">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-white text-2xl font-bold">Your Library</h1>
        <HiPlus className="text-gray-400 text-2xl cursor-pointer hover:text-white" />
      </div>
      
      <div className="space-y-2">
        {mockPlaylists.map((playlist) => (
          <div 
            key={playlist.id}
            onClick={() => setCurrentView({ type: 'playlist', data: playlist })}
            className="flex items-center p-2 rounded-md hover:bg-gray-800 cursor-pointer transition-colors"
          >
            <img src={playlist.image} alt={playlist.name} className="w-12 h-12 rounded mr-4" />
            <div className="flex-1">
              <p className="text-white font-medium">{playlist.name}</p>
              <p className="text-gray-400 text-sm">Playlist • {playlist.tracks} songs</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};