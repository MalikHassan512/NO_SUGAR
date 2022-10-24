import React from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import {Card, IconButton} from 'react-native-paper';
import PlanModal from './PlanModal';
import {useSelector} from 'react-redux';
import ModalAuth from '../../../../components/ModalAuth';

const MealCard = ({data}) => {
  return (
    <Card
      key={data?.uuid}
      // onPress={() => (guest ? setAuthVisible(true) : setIsVisible(true))}
      style={styles.viewContainer}>
      <View style={styles.viewContainer}>
        <Image
          style={styles.imageContainer}
          width={90}
          height={100}
          source={
            data?.image
              ? {uri: data?.image}
              : require('../../../../../assets/general/item_placeholder.png')
          }
        />
        <View style={{width: '70%', justifyContent: 'space-evenly'}}>
          <View style={styles.align}>
            <Text style={{fontSize: 16, fontWeight: '700'}}>
              {data?.name}{' '}
              <Text style={{fontSize: 10, fontWeight: '400'}}>
                ({items.filter(it => it?.id === data?.code)[0]?.name || 'Snack'}
                )
              </Text>
            </Text>
          </View>

          <Text numberOfLines={2} style={styles.nameText}>
            {data?.meal.map((item, index) => (
              <Text key={index}>
                {item?.ingredient
                  ? item?.ingredient?.ingredient_name + ', '
                  : null}
              </Text>
            ))}
          </Text>

          <Text style={{fontSize: 10, marginTop: 7}}>
            {' '}
            {data?.calories == null ? 0 : data?.calories} Cal,{' '}
            {data?.fiber == null ? 0 : data?.fiber} Fib,{' '}
            {data?.sugar == null ? 0 : data?.sugar} Sug,{' '}
            {data?.net_carbs == null ? 0 : data?.net_carbs} Carbs,{' '}
            {data?.protien == null ? 0 : data?.protien} Pro
          </Text>
        </View>
      </View>
    </Card>
  );
};

const items = [
  {
    id: 'br',
    name: 'Breakfast',
  },
  {
    id: 'ln',
    name: 'Lunch',
  },
  {
    id: 'dn',
    name: 'Dinner',
  },
  {
    id: 'sn',
    name: 'Snack',
  },
];
const styles = StyleSheet.create({
  nameText: {fontSize: 12, fontWeight: '400'},
  imageContainer: {
    width: 60,
    height: 60,
    marginRight: 20,

    borderRadius: 20,
  },
  viewContainer: {
    flexDirection: 'row',
    marginHorizontal: 10,
    // marginVertical: 5,
    marginTop: 15,
    borderRadius: 20,
  },
});

export default MealCard;
