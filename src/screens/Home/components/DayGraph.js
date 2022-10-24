import React from 'react';
import {Dimensions} from 'react-native';
import {LineChart} from 'react-native-chart-kit';

const DayGraph = ({color}) => {
  return (
    <>
      <LineChart
        data={{
          labels: ['12AM', '3AM', '6AM', '9AM', '12PM', '3PM', '6PM', '9PM'],
          datasets: [
            {
              data: [
                Math.random() * 300,
                0,
                0,
                400,
                Math.random() * 300,
                Math.random() * 300,
              ],
            },
          ],
        }}
        width={Dimensions.get('window').width - 16}
        height={220}
        chartConfig={{
          backgroundColor: '#E3A50D',
          backgroundGradientFrom: 'white',
          backgroundGradientTo: 'white',
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(${color}, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(128, 128, 128, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: '6',
            strokeWidth: '2',
            // stroke: '#ffa726',
          },
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
    </>
  );
};

export default DayGraph;
