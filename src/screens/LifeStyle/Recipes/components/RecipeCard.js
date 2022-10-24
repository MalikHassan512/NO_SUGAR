import React from 'react';
import {View, Text, Dimensions, Image, StyleSheet} from 'react-native';
import {Card, Divider, Avatar} from 'react-native-paper';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import styled from 'styled-components';
import {useNavigation} from '@react-navigation/core';
import VideoButtonSVG from '../../../../../assets/videoButton.svg';

const width = Dimensions.get('screen').width;

const RecipeCard = ({data, home}) => {
  const navigation = useNavigation();

  return home ? (
    <StyledCardHome
      onPress={() =>
        data?.file === null
          ? navigation.navigate('LifeStyleScreen', {
              screen: 'Recipes',
              initial: false,
              params: {uuid: data?.uuid},
            })
          : navigation.navigate('VideoScreen', {data: {file: data?.file}})
      }
      color="white">
      {/* <Video /> */}

      <Image
        style={{width: width * 0.4, height: width * 0.3, borderRadius: 20}}
        width={width * 0.4}
        //   resizeMode="contain"
        height={width * 0.3}
        source={
          data?.image === null || data?.image === undefined
            ? require('../../../../../assets/general/recipes.png')
            : {uri: data?.image}
        }
      />

      <View style={{marginHorizontal: 5, marginVertical: 10}}>
        <Text numberOfLines={1} style={{fontWeight: 'bold', fontSize: 14}}>
          {data?.name || 'No Suguar Recipe'}
        </Text>
      </View>
      <Divider />
      <View style={styles.commentContainerHome}>
        <Avatar.Image
          size={18}
          source={require('../../../../../assets/general/profile.png')}
        />
        <View style={styles.likesContainerHome}>
          <Icons size={18} name="eye-outline" />
          <Text style={[styles.numberofLikesHome, {marginRight: 10}]}>10K</Text>
          <Icons size={18} name="comment-outline" />
          <Text style={styles.numberofLikesHome}>27</Text>
        </View>
      </View>
    </StyledCardHome>
  ) : (
    <StyledCard
      onPress={() =>
        data?.file === null
          ? navigation.navigate('Recipes', {uuid: data?.uuid})
          : navigation.navigate('VideoScreen', {data: {file: data?.file}})
      }
      color="white">
      {/* <Video /> */}
      <View style={{flexDirection: 'row'}}>
        <Image
          style={{width: width - 20, height: 200, borderRadius: 20}}
          width={width - 20}
          //   resizeMode="contain"
          height={200}
          source={
            data?.image === null || data?.image === undefined
              ? require('../../../../../assets/general/recipes.png')
              : {uri: data?.image}
          }
        />
        {data?.file && (
          <View
            style={{
              marginLeft: -200,
              alignSelf: 'center',
            }}>
            <VideoButtonSVG />
          </View>
        )}
      </View>
      <View style={{marginHorizontal: 20, marginVertical: 10}}>
        <Text numberOfLines={1} style={{fontWeight: 'bold', fontSize: 18}}>
          {data?.name || 'No Sugar Recipe'}
        </Text>
      </View>
      <Divider />
      <View style={styles.commentContainer}>
        <Avatar.Image
          size={24}
          source={require('../../../../../assets/general/profile.png')}
        />
        <View style={styles.likesContainer}>
          <Icons size={20} name="eye-outline" />
          <Text style={styles.numberofLikes}>{data?.viewer_count}</Text>
          <Icons size={20} name="comment-outline" />
          <Text style={styles.numberofLikes}>{data?.total_comments}</Text>
        </View>
      </View>
    </StyledCard>
  );
};

const styles = StyleSheet.create({
  numberofLikes: {
    fontSize: 16,
  },
  numberofLikesHome: {
    fontSize: 14,
  },
  likesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '35%',
    marginTop: 3,
  },
  likesContainerHome: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // width: '35%',
  },
  commentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginVertical: 10,
  },
  commentContainerHome: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 5,
    marginVertical: 5,
  },
  quotesContainer: {
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
  align-self: center;

  width: ${() => `${width - 20}px`};
  height: 290px;
  margin: 10px;
  border-radius: 20px;

  border-color: #e9f0ea;
  border-width: 1px;
`;
const StyledCardHome = styled(Card)`
  background-color: ${props => props.color};
  align-self: center;

  width: ${() => `${width * 0.4}px`};
  height: ${() => `${width * 0.5}px`};
  margin: 10px;
  border-radius: 20px;

  border-color: #e9f0ea;
  border-width: 1px;
`;

export default RecipeCard;
