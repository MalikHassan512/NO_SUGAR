import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {IconButton} from 'react-native-paper';
import PlanModal from './PlanModal';

const MealStat = () => {
  const [isVisible, setIsVisible] = useState(false);
  return (
    <View style={{backgroundColor: 'white', padding: 10}}>
      {isVisible && (
        <PlanModal
          modalVisible={isVisible}
          onCloseModal={() => setIsVisible(false)}
        />
      )}
      <View style={styles.viewContainer}>
        <View style={styles.viewContainer}>
          <IconButton color="#FF8C4B" icon="fire" />
          <Text style={{alignSelf: 'center'}}>120 kcl / 400kcl</Text>
        </View>
        <IconButton
          onPress={() => setIsVisible(true)}
          style={{backgroundColor: '#e3f1dc'}}
          color="#72B852"
          icon="plus"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  viewContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default MealStat;
