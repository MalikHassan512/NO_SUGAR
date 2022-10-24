import React from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';
import BriefCase from '../../../../assets/briefcase.svg';
import EmptyBox from '../../../../assets/emptybox.svg';
import Location from '../../../../assets/location.svg';
import CheckTick from '../../../../assets/checktick.svg';
import DefaultTag from '../../../../assets/default.svg';

export default function ManageAddress() {
  // console.log(circleColor.backgroundColor.one[0])
  return (
    <ScrollView>
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <View style={styles.container}>
          <View style={styles.circleContainer}>
            <View style={styles.circle}>
              <BriefCase height={30} width={30} />
            </View>
          </View>
          <View style={styles.content}>
            <View style={styles.check}>
              <EmptyBox height={28} width={28} />
            </View>
            <View>
              <Text style={styles.title}>Work</Text>
            </View>
            <View>
              <Text style={styles.address} numberOfLines={3}>
                B 303, Shapath - IV, 1-5, University Area, Ahmedabad, Gujarat -
                380052, India
              </Text>
            </View>
          </View>
        </View>

        {/* _______________________________________ */}

        <View style={{...styles.container, ...styles.borderCol}}>
          <View
            style={{
              ...styles.circleContainer,
              ...styles.circleContainerSetting,
            }}>
            <View style={{height: 90, width: 120}}>
              <DefaultTag height={85} width={90} />
            </View>

            <View
              style={{
                ...styles.circle,
                ...styles.circleSetting,
                ...styles.circleColor,
              }}>
              <Location height={30} width={30} />
            </View>
          </View>
          <View style={styles.content}>
            <View style={styles.check}>
              <CheckTick height={28} width={28} />
            </View>
            <View>
              <Text style={styles.title}>Other</Text>
            </View>
            <View>
              <Text style={styles.address}>
                B 303, Shapath - IV, 1-5, University Area, Ahmedabad, Gujarat -
                380052, India
              </Text>
            </View>
          </View>
        </View>

        {/* ______________________________________ */}

        <View style={styles.container}>
          <View style={styles.circleContainer}>
            <View style={{...styles.circle, ...styles.circleColor}}>
              <Location height={30} width={30} />
            </View>
          </View>
          <View style={styles.content}>
            <View style={styles.check}>
              <EmptyBox height={28} width={28} />
            </View>
            <View>
              <Text style={styles.title}>Other</Text>
            </View>
            <View>
              <Text style={styles.address} numberOfLines={3}>
                B 303, Shapath - IV, 1-5, University Area, Ahmedabad, Gujarat -
                380052, India
              </Text>
            </View>
          </View>
        </View>

        {/* ______________________________ */}

        <View style={styles.container}>
          <View style={styles.circleContainer}>
            <View style={{...styles.circle, ...styles.circleColor}}>
              <Location height={30} width={30} />
            </View>
          </View>
          <View style={styles.content}>
            <View style={styles.check}>
              <EmptyBox height={28} width={28} />
            </View>
            <View>
              <Text style={styles.title}>Other</Text>
            </View>
            <View>
              <Text style={styles.address} numberOfLines={3}>
                B 303, Shapath - IV, 1-5, University Area, Ahmedabad, Gujarat -
                380052, India
              </Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  address: {
    marginRight: 5,
    lineHeight: 25,
    marginVertical: 10,
    fontSize: 16,
    color: 'grey',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  circle: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F2AD05',
    borderRadius: 50,
    height: 75,
    width: 75,
  },
  circleColor: {
    backgroundColor: '#66CC33',
  },
  circleSetting: {
    marginTop: -30,
  },
  container: {
    backgroundColor: 'white',
    height: 180,
    width: 'auto',
    marginHorizontal: 20,
    borderRadius: 20,
    marginVertical: 10,
    elevation: 5,
    flexDirection: 'row',
  },
  borderCol: {
    borderColor: '#66CC33',
    borderWidth: 2,
  },
  circleContainer: {
    // backgroundColor: 'red',
    height: 180,
    width: 120,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleContainerSetting: {
    height: 120,
  },
  content: {
    // backgroundColor: 'blue',
    height: 180,
    width: 240,
  },
  check: {
    // backgroundColor: 'yellow',
    flexDirection: 'row-reverse',
    paddingLeft: 20,
    paddingTop: 10,
  },
});
