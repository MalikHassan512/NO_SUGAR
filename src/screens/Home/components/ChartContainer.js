import React, {useEffect, useState} from 'react';
import {View, Text, Dimensions, StyleSheet} from 'react-native';
import {Button, Card} from 'react-native-paper';
import WeekGraph from './WeekGraph';
import MonthGraph from './MonthGraph';
import DayGraph from './DayGraph';
import {useSelector} from 'react-redux';
import {getData} from '../../NetworkRequest';
import moment from 'moment';
import styled from 'styled-components';

const width = Dimensions.get('screen').width;

const MyCravings = ({name, color, code}) => {
  const [graph, setGraph] = useState('week');
  const token = useSelector(state => state?.auth?.token);
  const [graphData, setGraphData] = useState([0, 0, 0, 0, 0, 0, 0]);
  const [monthData, setMonthData] = useState([
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ]);

  var startOfWeek = moment().startOf('week').toDate();
  var endOfWeek = moment().endOf('week').toDate();
  console.log(
    'startOfWeek',
    moment(startOfWeek).format('YYYY-MM-DD'),
    'endOfWeek',
    moment(endOfWeek).format('YYYY-MM-DD'),
  );
  const getGraphData = async () => {
    try {
      const data = await getData(token, 'graph/', {
        s_date: moment(startOfWeek).format('YYYY-MM-DD'),
        e_date: moment(endOfWeek).format('YYYY-MM-DD'),

        code: code,
      });
      console.log(data);
      data.forEach(element => {
        graphData[moment(element?.created_at).isoWeekday() - 1] =
          code === 'Water' || code === 'Sleep'
            ? element?.quantity
            : element?.calories;
      });
      setGraphData(graphData);
    } catch (error) {
      console.log(error);
    }
  };
  const getMonthGraph = async () => {
    try {
      const data = await getData(token, 'month-graph/', {
        s_date: '2021-01-01',
        e_date: '2021-12-30',

        code: code,
      });
      console.log('graph month', data);
      data.forEach(element => {
        monthData[element?.created_at__month] =
          code === 'Water' || code === 'Sleep'
            ? element?.quantity
            : element?.calories;
      });
      setMonthData(monthData);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(
    'graph data',

    monthData,
  );

  useEffect(() => {
    getGraphData();
    getMonthGraph();
  }, []);
  return (
    <StyledCard color="white">
      <View style={styles.titleContainer}>
        <Text style={styles.crushText}>{name}</Text>

        {/* <Button
          onPress={() => setGraph('day')}
          uppercase={false}
          color={graph === 'day' ? 'green' : 'gray'}>
          Day
        </Button> */}

        <Button
          onPress={() => setGraph('week')}
          uppercase={false}
          color={graph === 'week' ? 'green' : 'gray'}>
          Week
        </Button>

        <Button
          onPress={() => setGraph('month')}
          uppercase={false}
          color={graph === 'month' ? 'green' : 'gray'}>
          Month
        </Button>
      </View>
      {/* <WeekGraph code={code} color={color} /> */}
      {graph === 'day' ? (
        <DayGraph value={graph} code={code} color={color} />
      ) : graph === 'week' ? (
        <WeekGraph
          value={graph}
          graphData={graphData}
          code={code}
          color={color}
        />
      ) : (
        <MonthGraph
          graphData={monthData}
          value={graph}
          code={code}
          color={color}
        />
      )}
    </StyledCard>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    // height: 60,
    marginHorizontal: 10,
    marginVertical: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  crushText: {
    fontWeight: 'bold',
    fontSize: 22,
  },
  infoText: {
    fontWeight: 'bold',
    fontSize: 22,
    textAlign: 'center',
  },
});
const StyledCard = styled(Card)`
  background-color: ${props => props.color};
  align-self: center;

  width: ${() => `${width}px`};
  height: 300px;
  margin: 10px;

  border-radius: 30px;
  border-color: #e9f0ea;
  border-width: 1px;
  margin-bottom: 40px;
`;

export default MyCravings;
