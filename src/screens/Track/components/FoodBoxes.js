import React from 'react';
import {View, Text} from 'react-native';
import ProgressCircle from 'react-native-progress-circle';
import {useSelector} from 'react-redux';

export default function DailyIntake({data}) {
  const goalValue = useSelector(state => state?.goals?.goal);

  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
        }}>
        <View style={{margin: 10}}>
          <ProgressCircle
            percent={
              ((goalValue?.Calories?.Done || 0) /
                (goalValue?.Calories?.Target || 8)) *
              100
            }
            radius={80}
            borderWidth={12}
            color="#41B87F"
            shadowColor="#ebeced"
            bgColor="#fff">
            <Text style={{fontSize: 24, fontWeight: 'bold'}}>
              {data?.calories || 0}
            </Text>
            <Text>Completed</Text>
          </ProgressCircle>
        </View>
        <View style={{justifyContent: 'center', marginRight: 20}}>
          <Text style={{fontSize: 30, fontWeight: 'bold'}}>
            {goalValue?.Calories?.Target || 8}
          </Text>
          <Text style={{color: 'grey', marginBottom: 20}}>Kcal</Text>
          <Text style={{fontSize: 22, fontWeight: 'bold'}}>Calories</Text>
          <Text style={{color: 'grey'}}>Intakes</Text>
        </View>
      </View>
    </>
  );
}
