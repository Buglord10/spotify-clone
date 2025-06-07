import React, { useState } from 'react';
import './App.css';
import { 
  Sidebar, 
  TopBar, 
  HomeView, 
  SearchView, 
  PlaylistView, 
  LibraryView, 
  Player 
} from './components';

function App() {
  const [currentView, setCurrentView] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(75);

  const handleTrackSelect = (track) => {
    setCurrentTrack(track);
    setIsPlaying(true);
  };

  const renderMainContent = () => {
    if (typeof currentView === 'object') {
      switch (currentView.type) {
        case 'playlist':
          return (
            <>
              <TopBar title={currentView.data.name} />
              <PlaylistView 
                playlist={currentView.data} 
                onTrackSelect={handleTrackSelect}
                currentTrack={currentTrack}
                isPlaying={isPlaying}
              />
            </>
          );
        case 'artist':
          return (
            <>
              <TopBar title={currentView.data.name} />
              <PlaylistView 
                playlist={{
                  ...currentView.data,
                  tracks: 42,
                  color: "from-red-900 to-black"
                }} 
                onTrackSelect={handleTrackSelect}
                currentTrack={currentTrack}
                isPlaying={isPlaying}
              />
            </>
          );
        default:
          return (
            <>
              <TopBar />
              <HomeView setCurrentView={setCurrentView} onTrackSelect={handleTrackSelect} />
            </>
          );
      }
    }

    switch (currentView) {
      case 'search':
        return (
          <>
            <TopBar 
              title="Search" 
              showSearch={true} 
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
            <SearchView 
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              setCurrentView={setCurrentView}
              onTrackSelect={handleTrackSelect}
            />
          </>
        );
      case 'library':
        return (
          <>
            <TopBar title="Your Library" />
            <LibraryView setCurrentView={setCurrentView} />
          </>
        );
      default:
        return (
          <>
            <TopBar />
            <HomeView setCurrentView={setCurrentView} onTrackSelect={handleTrackSelect} />
          </>
        );
    }
  };

  return (
    <div className="App bg-gray-900 text-white min-h-screen flex flex-col">
      <div className="flex flex-1 overflow-hidden">
        <Sidebar 
          currentView={currentView} 
          setCurrentView={setCurrentView}
        />
        <main className="flex-1 overflow-y-auto bg-gradient-to-b from-gray-800 to-gray-900">
          {renderMainContent()}
        </main>
      </div>
      <Player 
        currentTrack={currentTrack}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        volume={volume}
        setVolume={setVolume}
      />
    </div>
  );
}

export default App;