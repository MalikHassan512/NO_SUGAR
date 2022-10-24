import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {Card, Chip} from 'react-native-paper';
import AddButton from '../../../../assets/DailyIntake/add';
import Tea from '../../../../assets/DailyIntake/Tea';
import Dinner from '../../../../assets/DailyIntake/Dinner';
import Lunch from '../../../../assets/DailyIntake/lunch';
import Snacks from '../../../../assets/DailyIntake/snacks.svg';
import {ProgressBar} from 'react-native-paper';
import {useNavigation} from '@react-navigation/core';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const FoodCard = ({name, data, onAdd, list, Svg}) => {
  const [open, setOpen] = useState('');
  const {br, dn, sn, ln} = data;
  const navigation = useNavigation();
  return (
    <>
      {open === 'br' ? (
        <Card onPress={() => setOpen('')} style={styles.mainCard}>
          <View style={styles.secondContainer}>
            <View style={styles.thirdContainer}>
              <Tea />
              <View style={{marginLeft: 10}}>
                <Text style={{fontWeight: 'bold'}}>Add Breakfast</Text>
                {/* <Text style={{fontSize: 10, color: '#979797'}}>Kcal left</Text> */}
              </View>
            </View>
            <TouchableOpacity
              onPress={() =>
                navigation?.navigate('Ingredients', {p_code: 'br'})
              }>
              <AddButton />
            </TouchableOpacity>
          </View>

          <Text style={styles.listing}>
            {[...br?.product__name, ...br?.recipe_name, ...br?.ingredient_name]
              .slice()
              .join(' + ')}
          </Text>

          <View style={styles.nutritionList}>
            <View style={styles.nutText}>
              <Text style={{fontSize: 19, fontWeight: 'bold'}}>
                {br?.net_carbs}
              </Text>
              <Text style={{fontSize: 14, color: '#979797'}}>Net Carbs</Text>
            </View>
            <View style={styles.nutText}>
              <Text style={{fontSize: 19, fontWeight: 'bold'}}>{br?.fats}</Text>
              <Text style={{fontSize: 14, color: '#979797'}}>Fats</Text>
            </View>
            <View style={styles.nutText}>
              <Text style={{fontSize: 19, fontWeight: 'bold'}}>
                {br?.protein}
              </Text>
              <Text style={{fontSize: 14, color: '#979797'}}>Protein</Text>
            </View>
            <View style={{alignItems: 'center'}}>
              <Text style={{fontSize: 19, fontWeight: 'bold'}}>
                {br?.sugar}
              </Text>
              <Text style={{fontSize: 14, color: '#979797'}}>Sugar</Text>
            </View>
          </View>
        </Card>
      ) : (
        <Card onPress={() => setOpen('br')} style={styles.cardContainer}>
          <View style={styles.normalContainer}>
            <Text style={{fontWeight: 'bold', fontSize: 16}}>BreakFast</Text>
            <View style={styles.normalContainer}>
              <Text style={{marginRight: 10}}>{br?.calories} Kcal</Text>
              <TouchableOpacity
                onPress={() =>
                  navigation?.navigate('Ingredients', {p_code: 'br'})
                }>
                <AddButton />
              </TouchableOpacity>
            </View>
          </View>
        </Card>
      )}
      {open === 'ln' ? (
        <Card onPress={() => setOpen('')} style={styles.mainCard}>
          <View style={styles.secondContainer}>
            <View style={styles.thirdContainer}>
              <Lunch width={40} height={40} />
              <View style={{marginLeft: 10}}>
                <Text style={{fontWeight: 'bold'}}>Add Lunch</Text>
                {/* <Text style={{fontSize: 10, color: '#979797'}}>Kcal left</Text> */}
              </View>
            </View>
            <TouchableOpacity
              onPress={() =>
                navigation?.navigate('Ingredients', {p_code: 'ln'})
              }>
              <AddButton />
            </TouchableOpacity>
          </View>

          <Text style={styles.listing}>
            {[...ln?.product__name, ...ln?.recipe_name, ...ln?.ingredient_name]
              .slice()
              .join(' + ')}
          </Text>

          <View style={styles.nutritionList}>
            <View style={styles.nutText}>
              <Text style={{fontSize: 19, fontWeight: 'bold'}}>
                {ln?.net_carbs}
              </Text>
              <Text style={{fontSize: 14, color: '#979797'}}>Net Carbs</Text>
            </View>
            <View style={styles.nutText}>
              <Text style={{fontSize: 19, fontWeight: 'bold'}}>{ln?.fats}</Text>
              <Text style={{fontSize: 14, color: '#979797'}}>Fats</Text>
            </View>
            <View style={styles.nutText}>
              <Text style={{fontSize: 19, fontWeight: 'bold'}}>
                {ln?.protein}
              </Text>
              <Text style={{fontSize: 14, color: '#979797'}}>Protein</Text>
            </View>
            <View style={{alignItems: 'center'}}>
              <Text style={{fontSize: 19, fontWeight: 'bold'}}>
                {ln?.sugar}
              </Text>
              <Text style={{fontSize: 14, color: '#979797'}}>Sugar</Text>
            </View>
          </View>
        </Card>
      ) : (
        <Card onPress={() => setOpen('ln')} style={styles.cardContainer}>
          <View style={styles.normalContainer}>
            <Text style={{fontWeight: 'bold', fontSize: 16}}>Lunch</Text>
            <View style={styles.normalContainer}>
              <Text style={{marginRight: 10}}>{ln?.calories} Kcal</Text>
              <TouchableOpacity
                onPress={() =>
                  navigation?.navigate('Ingredients', {p_code: 'ln'})
                }>
                <AddButton />
              </TouchableOpacity>
            </View>
          </View>
        </Card>
      )}
      {open === 'dn' ? (
        <Card onPress={() => setOpen('')} style={styles.mainCard}>
          <View style={styles.secondContainer}>
            <View style={styles.thirdContainer}>
              <Dinner width={40} height={40} />
              <View style={{marginLeft: 10}}>
                <Text style={{fontWeight: 'bold'}}>Add Dinner</Text>
                {/* <Text style={{fontSize: 10, color: '#979797'}}>Kcal left</Text> */}
              </View>
            </View>
            <TouchableOpacity
              onPress={() =>
                navigation?.navigate('Ingredients', {p_code: 'dn'})
              }>
              <AddButton />
            </TouchableOpacity>
          </View>

          <Text style={styles.listing}>
            {[...dn?.product__name, ...dn?.recipe_name, ...dn?.ingredient_name]
              .slice()
              .join(' + ')}
          </Text>

          <View style={styles.nutritionList}>
            <View style={styles.nutText}>
              <Text style={{fontSize: 19, fontWeight: 'bold'}}>
                {dn?.net_carbs}
              </Text>
              <Text style={{fontSize: 14, color: '#979797'}}>Net Carbs</Text>
            </View>
            <View style={styles.nutText}>
              <Text style={{fontSize: 19, fontWeight: 'bold'}}>{dn?.fats}</Text>
              <Text style={{fontSize: 14, color: '#979797'}}>Fats</Text>
            </View>
            <View style={styles.nutText}>
              <Text style={{fontSize: 19, fontWeight: 'bold'}}>
                {dn?.protein}
              </Text>
              <Text style={{fontSize: 14, color: '#979797'}}>Protein</Text>
            </View>
            <View style={{alignItems: 'center'}}>
              <Text style={{fontSize: 19, fontWeight: 'bold'}}>
                {dn?.sugar}
              </Text>
              <Text style={{fontSize: 14, color: '#979797'}}>Sugar</Text>
            </View>
          </View>
        </Card>
      ) : (
        <Card onPress={() => setOpen('dn')} style={styles.cardContainer}>
          <View style={styles.normalContainer}>
            <Text style={{fontWeight: 'bold', fontSize: 16}}>Dinner</Text>
            <View style={styles.normalContainer}>
              <Text style={{marginRight: 10}}>{dn?.calories} Kcal</Text>
              <TouchableOpacity
                onPress={() =>
                  navigation?.navigate('Ingredients', {p_code: 'dn'})
                }>
                <AddButton />
              </TouchableOpacity>
            </View>
          </View>
        </Card>
      )}
      {open === 'sn' ? (
        <Card onPress={() => setOpen('')} style={styles.mainCard}>
          <View style={styles.secondContainer}>
            <View style={styles.thirdContainer}>
              <Snacks width={40} height={40} />
              <View style={{marginLeft: 10}}>
                <Text style={{fontWeight: 'bold'}}>Add Snacks</Text>
                {/* <Text style={{fontSize: 10, color: '#979797'}}>Kcal left</Text> */}
              </View>
            </View>
            <TouchableOpacity
              onPress={() =>
                navigation?.navigate('Ingredients', {p_code: 'sn'})
              }>
              <AddButton />
            </TouchableOpacity>
          </View>
          <Text style={styles.listing}>
            {[...sn?.product__name, ...sn?.recipe_name, ...sn?.ingredient_name]
              .slice()
              .join(' + ')}
          </Text>
          <View style={styles.nutritionList}>
            <View style={styles.nutText}>
              <Text style={{fontSize: 19, fontWeight: 'bold'}}>
                {sn?.net_carbs}
              </Text>
              <Text style={{fontSize: 14, color: '#979797'}}>Net Carbs</Text>
            </View>
            <View style={styles.nutText}>
              <Text style={{fontSize: 19, fontWeight: 'bold'}}>{sn?.fats}</Text>
              <Text style={{fontSize: 14, color: '#979797'}}>Fats</Text>
            </View>
            <View style={styles.nutText}>
              <Text style={{fontSize: 19, fontWeight: 'bold'}}>
                {sn?.protein}
              </Text>
              <Text style={{fontSize: 14, color: '#979797'}}>Protein</Text>
            </View>
            <View style={{alignItems: 'center'}}>
              <Text style={{fontSize: 19, fontWeight: 'bold'}}>
                {sn?.sugar}
              </Text>
              <Text style={{fontSize: 14, color: '#979797'}}>Sugar</Text>
            </View>
          </View>
        </Card>
      ) : (
        <Card onPress={() => setOpen('sn')} style={styles.cardContainer}>
          <View style={styles.normalContainer}>
            <Text style={{fontWeight: 'bold', fontSize: 16}}>Snacks</Text>
            <View style={styles.normalContainer}>
              <Text style={{marginRight: 10}}>{sn?.calories} Kcal</Text>
              <TouchableOpacity
                onPress={() =>
                  navigation?.navigate('Ingredients', {p_code: 'sn'})
                }>
                <AddButton />
              </TouchableOpacity>
            </View>
          </View>
        </Card>
      )}
    </>
  );
};
const styles = StyleSheet.create({
  mainCard: {
    padding: 10,
    marginVertical: 10,
    borderRadius: 15,
    elevation: 5,
  },
  secondContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  thirdContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  listing: {color: '#979797', marginVertical: 10, fontSize: 12},
  nutritionList: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  nutText: {
    alignItems: 'center',
    paddingHorizontal: 5,
    borderColor: '#E3E0E0',
  },
  normalContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardContainer: {
    marginVertical: 5,
    padding: 10,
    elevation: 3,
    borderRadius: 15,
  },
});
export default FoodCard;
