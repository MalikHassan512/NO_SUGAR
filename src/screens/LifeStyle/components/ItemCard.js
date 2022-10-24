import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Card, Avatar} from 'react-native-paper';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';

const ItemCard = () => {
  const navigation = useNavigation();
  return (
    <View>
      <Card
        onPress={() => navigation.navigate('Recipes')}
        style={styles.cardContainer}>
        <Text style={styles.nameText}>Recipes</Text>
        <View style={styles.bottomView}>
          <View style={styles.imageContainer}>
            <Avatar.Image
              size={24}
              source={require('../../../../assets/general/profile.png')}
            />
            <Text style={styles.personName}>Mrs Cendralla</Text>
          </View>
          <View style={styles.imageContainer}>
            <Icons name="calendar" color="#86B841" size={24} />
            <Text style={styles.personName}>15/7/2021</Text>
            <Text style={styles.arrow}>
              <Icons size={24} name="chevron-right" />
            </Text>
          </View>
        </View>
      </Card>
    </View>
  );
};
const styles = StyleSheet.create({
  arrow: {
    marginTop: -25,
    fontSize: 20,
    fontWeight: '800',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    borderBottomColor: '#F2F3F4',
    backgroundColor: '#F2F3F4',
    borderWidth: 0,
    width: 24,
    height: 24,
  },
  imageContainer: {
    flexDirection: 'row',
  },
  personName: {
    color: 'gray',
    marginHorizontal: 10,
    marginTop: 3,
  },
  cardContainer: {
    // width: width - 30,
    borderRadius: 15,
    marginHorizontal: 10,
    height: 120,
    marginVertical: 10,
    padding: 20,
  },
  nameText: {
    fontSize: 20,
    fontWeight: '700',
  },
  bottomView: {
    flexDirection: 'row',
    marginTop: 15,
    justifyContent: 'space-between',
  },
});
export default ItemCard;
