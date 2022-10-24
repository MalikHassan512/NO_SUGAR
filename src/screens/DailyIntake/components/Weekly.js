import React from 'react';
import {View, Text, Dimensions, StyleSheet} from 'react-native';
import {Card, ProgressBar} from 'react-native-paper';
import styled from 'styled-components';
import ProgressCircle from 'react-native-progress-circle';

const width = Dimensions.get('window').width;

const Weekly = () => {
  return (
    <View
      style={{
        paddingHorizontal: 15,
      }}>
      <StyledView>
        <StyledCard color="#FFEEEE">
          <StyledText>Meals</StyledText>

          <ProgressCircle
            percent={80}
            radius={60}
            borderWidth={8}
            color="#ff3a3a"
            outerCircleStyle={{marginVertical: 20}}
            shadowColor="white"
            bgColor="#FFEEEE">
            <StyledText>10010</StyledText>
            <SmallText>kcal left</SmallText>
          </ProgressCircle>
          <StyledView>
            <SmallText>Eaten</SmallText>
            <SmallText>1000 kcal</SmallText>
          </StyledView>
        </StyledCard>
        <StyledCard color="#E4F7FF">
          <StyledText>Water</StyledText>
          <ProgressCircle
            percent={50}
            radius={60}
            borderWidth={8}
            color="#3db7eb"
            outerCircleStyle={{marginVertical: 20}}
            shadowColor="white"
            bgColor="#E4F7FF">
            <StyledText>50%</StyledText>
            <SmallText>50 cups</SmallText>
          </ProgressCircle>
          <StyledView>
            <SmallText>Goal</SmallText>
            <SmallText>100 cups</SmallText>
          </StyledView>
        </StyledCard>
      </StyledView>
      <StyledView>
        <StyledCard color="#FFF1E9">
          <StyledText>Training</StyledText>
          {/* <ProgressCircle
            percent={75}
            radius={0}
            borderWidth={8}
            color="#ff8c4b"
            outerCircleStyle={{width: 50, marginVertical: 20}}
            shadowColor="white"
            bgColor="#FFF1E9"> */}
          <StyledText style={{marginTop: 55, textAlign: 'center'}}>
            {4 * 7}/{12 * 7}km
          </StyledText>
          <ProgressBar
            style={styles.progressBar}
            progress={0.3}
            color="#ff8c4b"
          />

          {/* </ProgressCircle> */}
          <StyledView>
            <SmallText>Goal</SmallText>
            <SmallText>{80 * 7}km</SmallText>
          </StyledView>
        </StyledCard>
        <StyledCard color="#E8FCDE">
          <StyledText>Walk</StyledText>
          <ProgressCircle
            percent={70}
            radius={60}
            borderWidth={8}
            color="#72b852"
            outerCircleStyle={{marginVertical: 20}}
            shadowColor="white"
            bgColor="#E8FCDE">
            <StyledText>60000</StyledText>
            <SmallText>Steps</SmallText>
          </ProgressCircle>
          <StyledView>
            <SmallText>Goal</SmallText>
            <SmallText>80000</SmallText>
          </StyledView>
        </StyledCard>
      </StyledView>
    </View>
  );
};

const styles = StyleSheet.create({
  progressBar: {
    height: 8,
    backgroundColor: 'white',
    marginTop: 10,
    borderRadius: 10,
    marginBottom: 50,
  },
});
const SmallText = styled(Text)`
  font-size: 14px;
  font-weight: 600;
  color: grey;
`;
const StyledText = styled(Text)`
  font-size: 24px;
  font-weight: 600;
`;
const StyledView = styled(View)`
  flex-direction: row;
  justify-content: space-between;
`;
const StyledCard = styled(Card)`
  background-color: ${props => props.color};
  align-self: center;

  width: ${() => `${width * 0.42}px`};
  height: 250px;
  padding: 20px;
  border-radius: 30px;
  border-color: #e9f0ea;
  border-width: 1px;
  margin-bottom: 40px;
`;
export default Weekly;
