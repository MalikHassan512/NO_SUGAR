import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {Card} from 'react-native-paper';
import AddButton from '../../../../assets/DailyIntake/add';
const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const CardIntakes = ({name, unit, onAdd, Svg1, Svg2, goal, done}) => {
  return (
    <Card
      style={{
        marginHorizontal: 20,
        borderRadius: 20,
        marginVertical: 10,
        padding: 15,
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 15,
        }}>
        <Text style={{fontWeight: '700', fontSize: 14, alignSelf: 'center'}}>
          {name} Challenge
        </Text>
        <TouchableOpacity onPress={onAdd}>
          <AddButton />
        </TouchableOpacity>
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text style={{fontWeight: '500', fontSize: 12, alignSelf: 'center'}}>
          Goal: {goal} {unit}
        </Text>
        <Svg1 />
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Svg2 />
        <Text style={styles.plusText}>+</Text>
        <Svg2 />
        <Text style={styles.plusText}>+</Text>
        <Svg2 />
        <Text style={styles.plusText}>+</Text>
        <Svg2 />
        <Text style={styles.plusText}>+</Text>
        <Svg2 />
        <Text style={{fontWeight: '500', fontSize: 12, alignSelf: 'flex-end'}}>
          {done} {unit}
        </Text>
      </View>
    </Card>
  );
};
const styles = StyleSheet.create({
  plusText: {
    color: 'grey',
    alignSelf: 'center',
    fontSize: 12,
  },
});
export default CardIntakes;
