import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {Card} from 'react-native-paper';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import Garmin from '../../../../assets/garmin.svg';
import Fitbit from '../../../../assets/fitbit.svg';
import Withings from '../../../../assets/withings.svg';
import {useNavigation, useRoute} from '@react-navigation/native';
import {postData} from '../../NetworkRequest';
import {useSelector} from 'react-redux';
import {ScrollView} from 'react-native-gesture-handler';

export default function PhotoSearch() {
  const token = useSelector(state => state?.auth?.token);
  const [loading, setLoading] = useState(true);
  const {params} = useRoute();
  const [data, setData] = useState([]);
  const navigation = useNavigation();
  console.log('paramsss', 'api call');
  const sendImage = async () => {
    let formData = new FormData();

    formData.append('image', params?.file);
    // formData.append('image', {
    //   name: params?.file.fileName,
    //   type: params?.file.type,
    //   uri:
    //     Platform.OS === 'ios'
    //       ? params?.file?.uri.replace('file://', '')
    //       : params?.file?.uri,
    // });
    try {
      const {data} = await postData(token, 'calorie-mama/', formData);
      console.log(data?.results);
      setData(data?.results);
      console.log(data?.results[0].items);
      // navigation.goBack();
    } catch (error) {
      console.log('error', error);
    } finally {
      setLoading(false);
    }
  };
  // console.log(data[0].items);
  useEffect(() => {
    loading ? sendImage() : null;
  }, []);
  return loading ? (
    <View style={styles.container}>
      <ActivityIndicator color="#66cc33" size={50} />
    </View>
  ) : data === null ? (
    <View style={styles.mainContainer}>
      <Text style={styles.textStyle}> Food not found for image, </Text>
    </View>
  ) : (
    <ScrollView>
      {data?.map(item => (
        <View style={{marginHorizontal: 10}} key={item?.group}>
          <Text style={{textAlign: 'center', fontWeight: '700', fontSize: 18}}>
            {' '}
            {item?.group}
          </Text>
          {item?.items.map(dat => (
            <TouchableOpacity
              key={dat?.food_id}
              onPress={() =>
                navigation.navigate('ScannedProductDetails', {
                  dataResult: {
                    name: dat?.name,
                    image: null,
                    calories: dat?.nutrition?.calories || 0,
                    carbohydrate: dat?.nutrition?.totalCarbs || 0,
                    protein: dat?.nutrition?.protein || 0,
                    fats: dat?.nutrition?.totalFat || 0,
                    fiber: dat?.nutrition?.dietaryFiber || 0,
                    sugar: dat?.nutrition?.sugars || 0,
                  },
                })
              }
              style={{
                padding: 15,
                backgroundColor: 'white',
                borderRadius: 20,
                margin: 5,
              }}>
              <Text
                style={{
                  fontSize: 16,

                  marginBottom: 5,
                  fontWeight: '700',
                }}>
                {dat?.name}{' '}
                {/* {item?.brand_name ? (
                  <Text style={{fontSize: 12, fontWeight: '400'}}>
                    ({item?.brand_name})
                  </Text>
                ) : null} */}
              </Text>
              {/* <Divider style={{marginVertical: 10}} /> */}
              <Text>
                {/* {item?.food_description} */}{' '}
                {dat?.nutrition?.calories == null
                  ? 0
                  : parseFloat(dat?.nutrition?.calories).toFixed(2)}{' '}
                Cal,{' '}
                {dat?.nutrition?.dietaryFiber == null
                  ? 0
                  : parseFloat(dat?.nutrition?.dietaryFiber).toFixed(2)}{' '}
                Fib,{' '}
                {dat?.nutrition?.sugars == null
                  ? 0
                  : parseFloat(dat?.nutrition?.sugars).toFixed(2)}{' '}
                Sug,{' '}
                {dat?.nutrition?.totalCarbs == null
                  ? 0
                  : parseInt(dat?.nutrition?.totalCarbs).toFixed(2)}{' '}
                Carbs,{' '}
                {dat?.nutrition?.protein == null
                  ? 0
                  : (dat?.nutrition?.protein).toFixed(2)}{' '}
                Pro
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyle: {
    fontSize: 18,
    color: '#41B87F',
    fontWeight: '600',
  },
  mainContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: 'white',
  },
});
