import React from 'react';
import {View, Text, Dimensions, StyleSheet} from 'react-native';
import {ProgressBar} from 'react-native-paper';
import styled from 'styled-components';
import WaterSvg from '../../../../assets/new/water2.svg';
import Walk from '../../../../assets/new/walk.svg';
import SleepSvg from '../../../../assets/new/sleep2.svg';

const width = Dimensions.get('screen').width;

const MyCravings = ({data, home}) => {
  return (
    <StyledCardHome color="white">
      <View style={styles.container}>
        <View style={styles.progressContainer}>
          <View style={styles.progressContainer}>
            <WaterSvg />
            <Text style={styles.text}>Water</Text>
          </View>
          <Text style={styles.text}>9/18 glasses </Text>
        </View>
        <ProgressBar progress={0.5} color="#10c6c6" />
      </View>
      <View style={styles.container}>
        <View style={styles.progressContainer}>
          <View style={styles.progressContainer}>
            <Walk />
            <Text style={styles.text}>Walk</Text>
          </View>
          <Text style={styles.text}>400/600 steps </Text>
        </View>
        <ProgressBar progress={0.7} color="#F2ad05" />
      </View>
      <View style={styles.container}>
        <View style={styles.progressContainer}>
          <View style={styles.progressContainer}>
            <SleepSvg />
            <Text style={styles.text}>Sleep</Text>
          </View>
          <Text style={styles.text}>6/8 hours </Text>
        </View>
        <ProgressBar progress={0.8} color="#4f49d3" />
      </View>
      {/* <View style={styles.container}>
        <View style={styles.progressContainer}>
          <View style={styles.progressContainer}>
            <WaterSvg />
            <Text style={styles.text}>Water</Text>
          </View>
          <Text style={styles.text}>9/16 glass </Text>
        </View>
        <ProgressBar progress={0.5} color="blue" />
      </View> */}
    </StyledCardHome>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  text: {
    fontSize: 16,
    fontWeight: '700',
    marginLeft: 10,
    alignSelf: 'center',
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
});

const StyledCardHome = styled(View)`
  background-color: ${props => props.color};
  align-self: center;

  width: ${() => `${width}px`};
  height: 230px;
  margin: 10px;
  padding: 15px;
  border-radius: 10px;
  border-color: #e9f0ea;
`;

export default MyCravings;
