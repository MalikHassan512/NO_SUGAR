import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import Coffee from '../../../../assets/general/cofee.svg';

const Catagories = ({comp, data}) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('AllProducts', {
          name: data?.name,
          productType: data?.name,
          uuid: data?.uuid,
        })
      }>
      <View style={styles.catContainer}>
        <Image
          width={75}
          height={75}
          style={styles.imageContainer}
          source={
            data?.image === null
              ? require('../../../../assets/general/item_placeholder.png')
              : {uri: data?.image}
          }
        />
        <Text style={styles.textContainer}>{data?.name}</Text>
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  imageContainer: {
    height: 85,
    width: 85,
    borderRadius: 38,
    // backgroundColor: 'red',
  },
  catContainer: {
    margin: 15,
    justifyContent: 'center',
    width: 80,
  },
  textContainer: {
    textAlign: 'center',
    // backgroundColor: 'red',
    marginVertical: 5,
    color: 'gray',
    width: 100,
  },
});
export default Catagories;
