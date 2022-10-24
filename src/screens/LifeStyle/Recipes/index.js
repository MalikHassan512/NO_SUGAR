import React, {useState, useEffect} from 'react';
import {
  View,
  ScrollView,
  Image,
  Text,
  StyleSheet,
  Dimensions,
  useWindowDimensions,
  ActivityIndicator,
} from 'react-native';
import RenderHTML from 'react-native-render-html';
import {Card, Chip, Divider, TouchableOpacity} from 'react-native-paper';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import Comments from './components/Comments';
import {getData} from '../../NetworkRequest';
import {useNavigation, useRoute} from '@react-navigation/core';
import {useSelector} from 'react-redux';
import MaterialIcon from 'react-native-vector-icons/Entypo';

const widthScreen = Dimensions.get('screen').width;

const Recipes = () => {
  const [detail, setDetails] = useState([]);
  const {params} = useRoute();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const {width} = useWindowDimensions();
  const token = useSelector(state => state?.auth?.token);
  const [recommended, setRecommended] = useState([]);

  const getDetails = async par => {
    setLoading(true);
    try {
      const data = await getData(token, 'recipe-detail/', {
        recipe_uuid: par,
      });
      // console.log(params?.uuid)
      setDetails(data[0]);
      const rec = await getData(token, 'recipe-recommend/', {
        search: data[0]?.name,
      });
      console.log('recooooo', recommended);
      setRecommended(rec);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDetails(params?.uuid);
  }, []);

  // console.log(recipe_uuid)

  return loading ? (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <ActivityIndicator color="#66cc33" />
    </View>
  ) : (
    <ScrollView>
      
      <Image
        // resizeMode="cover"
        height={400}
        width={width}
        style={{width: width, height: 400}}
        source={
          detail?.image === null
            ? require('../../../../assets/general/recipes.png')
            : {uri: detail?.image}
        }
      />
      <Card style={styles.cardContainer}>
        <Text style={styles.recipeName}>{detail?.name}</Text>
        <View style={styles.tagContainer}>
          <Chip style={styles.chipContainer}>
            <Text style={{color: 'white'}}> Super food diet</Text>
          </Chip>

          <View style={styles.iconContainers}>
            <Icons size={30} name="eye-outline" />
            <Text style={styles.numberofLikes}>{detail?.viewer_count}</Text>
            <Icons size={30} name="bookmark-outline" />
          </View>
        </View>
        <Divider />
        {/* <Text style={styles.descTag}>
          Tags: Apple, Banana, Winter lack, Eggs
        </Text> */}
        <Text style={{color: 'gray'}}>
          <RenderHTML
            contentWidth={width - 50}
            tagsStyles={tagsStyles}
            source={{html: detail?.description}}
          />
        </Text>
        <Divider style={styles.dividerStyle} />
        <Comments uuid={params?.uuid} data={detail} />
        <Text style={{fontWeight: 'bold', fontSize: 18, marginVertical: 5}}>
          Recommended Recipes
        </Text>
        <View style={{height: 140}}>
          <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
            {recommended?.map(item => (
              <Card
                key={item?.uuid}
                onPress={() => getDetails(item?.uuid)}
                style={styles.cardStyle}>
                <View style={styles.imageContainer}>
                  <Image
                    width={30}
                    height={30}
                    resizeMode="contain"
                    style={styles.image}
                    source={
                      item?.image === null
                        ? require('../../../../assets/general/recipes.png')
                        : {uri: item?.image}
                    }
                  />
                  <Text
                    numberOfLines={2}
                    style={{
                      fontSize: 12,
                      padding: 10,
                      textAlign: 'center',
                    }}>
                    {item?.name || ' Product name'}
                  </Text>
                </View>
                {/* <View
                  style={{
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    paddingHorizontal: 10,
                  }}>
                  <Text style={{fontSize: 8, color: '#41B87F'}}>$25</Text>
                  <View style={styles.chipsContainer}>
                    <MaterialIcon size={9} color="#F2AD05" name="star" />
                    <Text style={styles.ratingNumber}> 5.0</Text>
                  </View>
                </View> */}
              </Card>
            ))}
          </ScrollView>
        </View>
      </Card>
    </ScrollView>
  );
};
const tagsStyles = {
  p: {
    maxWidth: widthScreen - 40,
  },
};
const styles = StyleSheet.create({
  image: {
    width: 80,
    height: 80,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
  },
  cardStyle: {
    borderRadius: 10,
    height: 130,
    width: 130,
    margin: 5,
  },
  ratingNumber: {
    fontSize: 8,
    color: '#F2AD05',
  },
  chipsContainer: {
    backgroundColor: '#fcefcd',
    color: '#F2AD05',
    borderRadius: 15,
    alignItems: 'center',
    width: 30,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  dividerStyle: {
    marginVertical: 20,
  },

  descTag: {fontWeight: 'bold', marginVertical: 10},
  chipContainer: {
    color: 'white',
    marginVertical: 30,
    backgroundColor: 'black',
    width: 150,
  },

  numberofLikes: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 3,
  },

  recipeName: {
    fontSize: 24,
    fontWeight: '600',
  },
  tagContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  iconContainers: {
    flexDirection: 'row',
    marginVertical: 30,
    justifyContent: 'space-between',
    width: widthScreen * 0.3,
  },
  cardContainer: {
    height: '100%',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    width: widthScreen - 5,
    marginTop: -40,
    paddingHorizontal: 20,
    paddingVertical: 35,
    // marginHorizontal: 5,
  },
});

export default Recipes;
