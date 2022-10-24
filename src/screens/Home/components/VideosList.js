import React, {useState} from 'react';
import {
  View,
  Dimensions,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {getPaginationData} from '../../NetworkRequest';
import {usePaginatorParams} from '../../../custom_hooks/pagination_params_hook';
import EmptyComponent from '../../Components/EmptyComponent';
import PlaceholderImage from '../../../../assets/emptyProduct.svg';
import VideoContainer from './VideoContainer';

const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;

const VideoList = () => {
  const [isLoading, isRefreshing, videos, loadMore, refreshVideos] =
    usePaginatorParams(getPaginationData, 'video/', {
      page: 1,
    });

  return (
    <View style={styles.mainContainer}>
      <FlatList
        showsVerticalScrollIndicator={false}
        refreshing={isRefreshing}
        onRefresh={refreshVideos}
        data={videos}
        onEndReached={loadMore}
        keyExtractor={(_, index) => `${index}`}
        renderItem={({item}) => <VideoContainer key={item?.uuid} data={item} />}
        ListFooterComponent={() => (
          <FooterLoadingComponent
            loading={isLoading}
            resultLength={videos.length}
          />
        )}
        ListEmptyComponent={() =>
          isLoading ? (
            isRefreshing ? null : (
              <View style={styles.activityContainer}>
                <ActivityIndicator color="#66cc33" />
              </View>
            )
          ) : (
            <EmptyComponent
              Svg={PlaceholderImage}
              message={'No Video available yet '}
              messageTitle={'No Video'}
            />
          )
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  activityContainer: {
    flex: 1,
    height: height * 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageComponent: {
    borderRadius: 15,
    width: width - 40,
    marginRight: 20,
    marginTop: 5,
  },
  sliderContainer: {
    justifyContent: 'center',
    marginRight: 10,
    marginBottom: 30,
    borderRadius: 50,
  },
  mainContainer: {
    backgroundColor: 'white',
    paddingHorizontal: 10,
    flex: 1,
  },
  searchInput: {
    color: '#F5F5F5',
    backgroundColor: '#F5F5F5',
    marginHorizontal: 10,
    borderRadius: 20,
  },
  videoContainer: {
    marginLeft: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  videoTextContainer: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 10,
    marginHorizontal: 10,
  },
  buttonView: {
    fontSize: 22,
  },
});
const FooterLoadingComponent = ({loading, resultLength}) => {
  if (loading && resultLength > 0) {
    return (
      <View style={{paddingVertical: 20, marginBottom: 20}}>
        <ActivityIndicator color={'#66cc3'} />
      </View>
    );
  } else {
    return null;
  }
};
export default VideoList;
