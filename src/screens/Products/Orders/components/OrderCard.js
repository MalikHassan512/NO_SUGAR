import React from 'react';
import {
  Text,
  StyleSheet,
  Image,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import OutlineStar from '../../../../../assets/outlinestar.svg';
import FilledStar from '../../../../../assets/fillstar.svg';

export default function OrderDetailsCard() {
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View style={styles.container}>
        <View style={styles.img}>
          <View style={styles.imgInner}>
            <Image
              source={require('../../../../../assets/Keto-Krax.jpg')}
              style={{height: 55, width: 55}}
            />
          </View>
        </View>
        <View style={styles.content}>
          <View style={styles.Title}>
            <Text style={styles.text}>No Sugar Keto Bar Birthday</Text>
            <Text style={styles.text1}>$22.40</Text>
          </View>
          <View style={{flex: 0.5}}>
            <Text style={styles.smallText}>Qty 02</Text>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.smallText}>Review </Text>
              <OutlineStar style={{marginRight: 5}} height={18} width={18} />
              <OutlineStar style={{marginRight: 5}} height={18} width={18} />
              <OutlineStar style={{marginRight: 5}} height={18} width={18} />
              <OutlineStar style={{marginRight: 5}} height={18} width={18} />
              <OutlineStar style={{marginRight: 5}} height={18} width={18} />
            </View>
          </View>
        </View>
      </View>
      {/* __________________________ */}

      <View style={styles.container}>
        <View style={styles.img}>
          <View style={styles.imgInner}>
            <Image
              source={require('../../../../../assets/Keto-Cup.jpg')}
              style={{height: 55, width: 55}}
            />
          </View>
        </View>
        <View style={styles.content}>
          <View style={styles.Title}>
            <Text style={styles.text}>No Sugar Keto Bar Lemon</Text>
            <Text style={styles.text1}>$35.40</Text>
          </View>
          <View style={{flex: 0.5}}>
            <Text style={styles.smallText}>Qty 03</Text>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.smallText}>Review </Text>
              <FilledStar style={{marginRight: 5}} height={18} width={18} />
              <FilledStar style={{marginRight: 5}} height={18} width={18} />
              <OutlineStar style={{marginRight: 5}} height={18} width={18} />
              <OutlineStar style={{marginRight: 5}} height={18} width={18} />
              <OutlineStar style={{marginRight: 5}} height={18} width={18} />
            </View>
          </View>
        </View>
      </View>

      {/* ___________________________________ */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 100,
    // backgroundColor: 'coral',
  },
  img: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 0.25,
    // backgroundColor: 'blue',
  },
  imgInner: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    height: 65,
    width: 65,
    elevation: 15,
  },
  content: {
    // backgroundColor: 'yellow',
    flex: 0.75,
  },
  Title: {
    // backgroundColor: 'coral',
    flex: 0.3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 20,
    paddingTop: 20,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  smallText: {
    color: 'gray',
  },
  text1: {
    fontWeight: 'bold',
    fontSize: 18,
  },
});
