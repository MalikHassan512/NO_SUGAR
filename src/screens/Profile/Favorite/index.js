import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import {Card} from 'react-native-paper';
import {getData} from '../../NetworkRequest';

import {useSelector} from 'react-redux';

const Favorite = ({}) => {
  const [foods, setFoods] = useState([]);

  const token = useSelector(state => state?.auth?.token);
  const _getFoods = async () => {
    try {
      const data = await getData(token, 'fav-food/');
      console.log('dataa food', data);
      setFoods(data);
    } catch (error) {}
  };
  useEffect(() => {
    _getFoods();
  }, []);
  return (
    <>
      {foods?.map(item => (
        <Card key={item?.uuid} style={styles.viewContainer}>
          <View style={styles.viewContainer}>
            <Image
              style={styles.imageContainer}
              width={60}
              height={60}
              source={
                item?.image
                  ? {uri: item?.image}
                  : require('../../../../assets/general/item_placeholder.png')
              }
            />
            <View style={{alignSelf: 'center', width: '90%'}}>
              <Text style={styles.nameText}>{item?.name}</Text>

              <Text style={{color: 'grey', fontSize: 10, marginVertical: 10}}>
                {item?.net_carbs} Net Carbs, {item?.fiber} Fiber, {item?.sugar}{' '}
                Sugar, {item?.carbohydrate} Carbs
              </Text>
            </View>
            {/* <IconButton
            onPress={() => (guest ? setAuthVisible(true) : setIsVisible(true))}
            style={{
              backgroundColor: '#e3f1dc',
              alignSelf: 'center',
            }}
            color="#72B852"
            icon="plus"
          /> */}
          </View>
        </Card>
      ))}
    </>
  );
};
const styles = StyleSheet.create({
  nameText: {fontSize: 16, fontWeight: '700'},
  imageContainer: {
    width: 60,
    height: 60,
    marginRight: 20,

    borderRadius: 20,
  },
  viewContainer: {
    flexDirection: 'row',
    marginHorizontal: 10,
    // marginVertical: 5,
    marginTop: 15,
    borderRadius: 20,
  },
});

export default Favorite;
