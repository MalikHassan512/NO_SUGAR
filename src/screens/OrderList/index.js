import React from 'react';
import TimeSVG from '../../../assets/time.svg';
import RepeatSVG from '../../../assets/repeat.svg';
import {
  Text,
  StyleSheet,
  Image,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

export default function OrderList() {
  const navigation = useNavigation();
  return (
    <ScrollView>
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <TouchableOpacity onPress={() => navigation.navigate('Order Details')}>
          <View style={styles.container}>
            <View style={styles.upper}>
              <View style={styles.imageContainer}>
                <Image
                  source={require('../../../assets/Keto-Cup.jpg')}
                  style={styles.image}
                />
              </View>
              <View style={styles.text}>
                <Text style={styles.title}>No Sugar Keto Cup Dark</Text>
                <Text>14 Feb 2021 at 3:45 PM</Text>
                <Text style={styles.value}>$29.99</Text>
              </View>
            </View>

            <View style={styles.lower}>
              <View
                style={{justifyContent: 'space-between', flexDirection: 'row'}}>
                <View style={styles.pending}>
                  <TimeSVG
                    height={17}
                    width={17}
                    style={{marginHorizontal: 5, marginTop: 1}}
                  />
                  <Text style={{color: 'grey'}}>Pending</Text>
                </View>
              </View>
              <Text style={styles.product}>+3 Products</Text>
              <View style={styles.Reportbutton}>
                <RepeatSVG height={11} width={11} />
                <Text style={{color: 'white', fontSize: 14}}>Repeat</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    height: 160,
    backgroundColor: 'white',
    marginHorizontal: 20,
    borderRadius: 15,
    marginVertical: 10,
    elevation: 8,
  },

  upper: {
    marginHorizontal: 8,
    marginVertical: 5,
    paddingBottom: 4,
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
    flex: 0.7,
  },

  image: {
    width: 65,
    height: 65,
    borderRadius: 10,
    flex: 0.9,
  },

  lower: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingTop: 20,
    paddingHorizontal: 20,
    flex: 0.35,
    borderBottomEndRadius: 20,
    borderBottomStartRadius: 20,
  },

  imageContainer: {
    paddingVertical: 5,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 0.3,
  },

  text: {
    paddingTop: 10,
    flex: 0.7,
  },

  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },

  value: {
    fontSize: 18,
    color: '#37cc12',
  },

  Reportbutton: {
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#37cc12',
    width: 100,
    borderRadius: 20,
    height: 30,
    marginTop: -5,
  },

  product: {
    color: 'grey',
  },

  pending: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
});
