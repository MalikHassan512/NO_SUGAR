import React from 'react';
import {View, Text, Dimensions} from 'react-native';
import {Card, ProgressBar} from 'react-native-paper';
import styled from 'styled-components';
import ProgressCircle from 'react-native-progress-circle';

const width = Dimensions.get('window').width;

const DailyIntake = () => {
  return (
    <View
      style={{
        paddingHorizontal: 15,
      }}>
      <StyledView>
        <StyledCard color="#FFEEEE">
          <StyledText>Meals</StyledText>

          <ProgressCircle
            percent={60}
            radius={60}
            borderWidth={8}
            color="#ff3a3a"
            outerCircleStyle={{marginVertical: 20}}
            shadowColor="white"
            bgColor="#FFEEEE">
            <StyledText>1010</StyledText>
            <SmallText>kcal left</SmallText>
          </ProgressCircle>
          <StyledView>
            <SmallText>Eaten</SmallText>
            <SmallText>400 kcal</SmallText>
          </StyledView>
        </StyledCard>
        <StyledCard color="#E4F7FF">
          <StyledText>Water</StyledText>
          <ProgressCircle
            percent={25}
            radius={60}
            borderWidth={8}
            color="#3db7eb"
            outerCircleStyle={{marginVertical: 20}}
            shadowColor="white"
            bgColor="#E4F7FF">
            <StyledText>25%</StyledText>
            <SmallText>3 cups</SmallText>
          </ProgressCircle>
          <StyledView>
            <SmallText>Goal</SmallText>
            <SmallText>18 cups</SmallText>
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
            4/12km
          </StyledText>
          <ProgressBar
            style={{
              height: 8,
              backgroundColor: 'white',
              marginTop: 10,
              borderRadius: 10,
              marginBottom: 50,
            }}
            progress={0.3}
            color="#ff8c4b"
          />

          {/* </ProgressCircle> */}
          <StyledView>
            <SmallText>Goal</SmallText>
            <SmallText>12km</SmallText>
          </StyledView>
        </StyledCard>
        <StyledCard color="#E8FCDE">
          <StyledText>Walk</StyledText>
          <ProgressCircle
            percent={50}
            radius={60}
            borderWidth={8}
            color="#72b852"
            outerCircleStyle={{marginVertical: 20}}
            shadowColor="white"
            bgColor="#E8FCDE">
            <StyledText>4000</StyledText>
            <SmallText>Steps</SmallText>
          </ProgressCircle>
          <StyledView>
            <SmallText>Goal</SmallText>
            <SmallText>8000</SmallText>
          </StyledView>
        </StyledCard>
      </StyledView>
    </View>
  );
};

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
  height: 280px;
  padding: 20px;
  border-radius: 30px;
  border-color: #e9f0ea;
  border-width: 1px;
  margin-bottom: 20px;
`;
export default DailyIntake;
