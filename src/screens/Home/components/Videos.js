import React, {useState, useRef} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Video from 'react-native-video';
import MediaControls, {PLAYER_STATES} from 'react-native-media-controls';
import {useRoute} from '@react-navigation/core';

const Videos = props => {
  const {params} = useRoute();
  const videoPlayer = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [paused, setPaused] = useState(false);
  const [playerState, setPlayerState] = useState(PLAYER_STATES.PLAYING);
  const [screenType, setScreenType] = useState('contain');

  const data = params?.data?.file;

  const onSeek = seek => {
    videoPlayer.current.seek(seek);
  };

  const onPaused = playerState => {
    setPaused(!paused);
    setPlayerState(playerState);
  };

  const onReplay = () => {
    setPlayerState(PLAYER_STATES.PLAYING);
    videoPlayer.current.seek(0);
  };

  const onProgress = data => {
    if (!isLoading && playerState !== PLAYER_STATES.ENDED) {
      setCurrentTime(data.currentTime);
    }
  };

  const onLoad = data => {
    setDuration(data.duration);
    setIsLoading(false);
  };

  const onLoadStart = data => setIsLoading(true);

  const onEnd = () => setPlayerState(PLAYER_STATES.ENDED);

  const exitFullScreen = () => {
    alert('Exit full screen');
  };

  const enterFullScreen = () => {};

  const onFullScreen = () => {
    setIsFullScreen(isFullScreen);
    if (screenType === 'contain') {
      setScreenType('cover');
    } else {
      setScreenType('contain');
    }
  };

  const renderToolbar = () => (
    <View>
      <Text style={styles.toolbar}> toolbar </Text>
    </View>
  );

  const onSeeking = currentTime => setCurrentTime(currentTime);

  return (
    <View style={{flex: 1}}>
      <Video
        onEnd={onEnd}
        onLoad={onLoad}
        onLoadStart={onLoadStart}
        onProgress={onProgress}
        paused={paused}
        ref={videoPlayer}
        resizeMode={screenType}
        onFullScreen={onFullScreen}
        source={
          data === null || data === undefined
            ? {
                uri: 'https://assets.mixkit.co/videos/download/mixkit-countryside-meadow-4075.mp4',
              }
            : {
                uri: data,
              }
        }
        style={styles.mediaPlayer}
        volume={10}
      />
      <MediaControls
        duration={duration}
        isLoading={isLoading}
        thumbnail={{
          uri: params?.data?.thumbnail,
        }}
        mainColor="#333"
        onFullScreen={onFullScreen}
        onPaused={onPaused}
        onReplay={onReplay}
        onSeek={onSeek}
        onSeeking={onSeeking}
        playerState={playerState}
        progress={currentTime}
        toolbar={renderToolbar()}
      />
    </View>
  );
};

export default Videos;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  toolbar: {
    marginTop: 30,
    backgroundColor: 'gray',
    padding: 10,
    borderRadius: 5,
  },
  mediaPlayer: {
    position: 'absolute',
    top: 5,
    left: 5,
    bottom: 5,
    right: 5,
    // width: 400,
    backgroundColor: 'white',
    // borderRadius: 20,
    justifyContent: 'center',
  },
});
