import React from 'react';
import {View, Dimensions, Image, StyleSheet} from 'react-native';
import {Card} from 'react-native-paper';
import styled from 'styled-components';
import {useNavigation} from '@react-navigation/core';
import VideoButtonSVG from '../../../../assets/videoButton.svg';

const width = Dimensions.get('screen').width;

const VideosContainer = ({data}) => {
  const navigation = useNavigation();
  return (
    <StyledCard
      onPress={() => navigation.navigate('VideoScreen', {data: data})}
      color="white">
      {/* <Video data={data?.file} /> */}
      <View style={{flexDirection: 'row'}}>
        <Image
          style={{width: width * 0.9, height: 200, borderRadius: 20}}
          // width={width * 0.78}
          height={230}
          source={
            data?.thumbnail === null
              ? require('../../../../assets/general/thumnail.png')
              : {uri: data?.thumbnail}
          }
        />
        <View
          style={{
            marginLeft: -200,
            alignSelf: 'center',
          }}>
          <VideoButtonSVG />
        </View>
      </View>
      {/* </ImageBackground> */}

      {/* <View style={styles.quotesContainer}>
        <IconButton
          size={60}
          color="white"
          style={styles.buttonContainer}
          icon="format-quote-open"
        />
        <Text style={styles.textContainer}>{quote}</Text>
      </View> */}
      {/* <View style={{marginHorizontal: 20, marginVertical: 10}}>
        <Text style={{fontWeight: 'bold', fontSize: 18}}>{data?.title}</Text> */}
      {/* <Text style={{color: 'gray'}}>10 min</Text> */}
      {/* </View> */}
    </StyledCard>
  );
};

const styles = StyleSheet.create({
  quotesContainer: {
    // marginHorizontal: 10,
    // justifyContent: 'flex-start',
    alignItems: 'flex-start',
    maxWidth: '80%',
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  buttonContainer: {
    // height: 60,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    height: 50,
  },
  textContainer: {
    marginHorizontal: 15,
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
});
const StyledCard = styled(Card)`
  background-color: ${props => props.color};
  width: ${() => `${width * 0.89}px`};
  height: 230px;
  margin: 10px;
  border-radius: 20px;
  border-color: #e9f0ea;
  border-width: 1px;
`;

export default VideosContainer;
