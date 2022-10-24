import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import {Searchbar} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {useIsFocused} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import EmptyComponent from '../../Components/EmptyComponent';
import PlaceholderImage from '../../../../assets/emptyProduct.svg';
import MealCard from '../../DailyIntake/Ingredients/components/MealCardDrawer';
import {getData} from '../../NetworkRequest/';
import ModalAuth from '../../../components/ModalAuth';
import MealButton from './CustomMealButton';

const Meals = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');

  const [loading, setLoading] = useState(true);
  const token = useSelector(state => state?.auth?.token);
  const [meals, setMeals] = useState([]);
  const [meals2, setMeals2] = useState([]);
  const [authVisible, setAuthVisible] = useState(false);
  const isFocused = useIsFocused();

  const getDataFood = async param => {
    try {
      const data = await getData(token, 'meal/', param);
      setMeals(data);
      setMeals2(data);
      setLoading(false);
    } catch (error) {}
  };

  const isRefreshing = false;

  const onChangeSearch = query => setSearchQuery(query);
  const onSerach = () => {
    if (searchQuery === '') {
      setMeals(meals2);
      return;
    }
    setMeals(meals2.filter(ing => ing.name.includes(searchQuery) === true));
  };

  useEffect(() => {
    getDataFood();
  }, [isFocused]);

  return loading ? (
    <View style={styles?.loader}>
      <ActivityIndicator color="#66cc33" />
    </View>
  ) : (
    <View style={{backgroundColor: 'white', flex: 1, paddingTop: 20}}>
      {authVisible && (
        <ModalAuth
          isVisible={authVisible}
          onClose={() => setAuthVisible(false)}
        />
      )}
      <Searchbar
        style={styles.searchInput}
        placeholder="Search all items"
        onChangeText={onChangeSearch}
        value={searchQuery}
        onIconPress={onSerach}
        onKeyPress={onSerach}
      />
      <View>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <View style={styles.ButtonContainer}>
            <MealButton
              onSelect={paramss => getDataFood(paramss)}
              buttons={['All', 'Breakfast', 'Lunch', 'Dinner', 'Snack']}
            />
          </View>
        </ScrollView>
      </View>

      <FlatList
        showsVerticalScrollIndicator={false}
        data={meals}
        keyExtractor={(_, index) => `${index}`}
        renderItem={({item, index}) => <MealCard key={index} data={item} />}
        ListEmptyComponent={() =>
          loading ? (
            isRefreshing ? null : (
              <View style={styles?.loader}>
                <ActivityIndicator color="#66cc33" />
              </View>
            )
          ) : (
            <EmptyComponent
              Svg={PlaceholderImage}
              message={'No meal added yet '}
              messageTitle={'No Meal'}
            />
          )
        }
      />

      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        style={styles.plusButton}
        colors={['#41B87F', '#86B841']}>
        <TouchableOpacity onPress={() => navigation.navigate('Add Meal')}>
          <Text style={styles.plus}>+</Text>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  plusButton: {
    width: 60,
    height: 60,
    padding: 3,
    borderRadius: 30,
    position: 'absolute',
    bottom: 30,
    right: 10,
  },
  plus: {
    fontSize: 40,
    color: 'white',
    textAlign: 'center',
  },
  ButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
    height: 50,
    alignItems: 'center',
  },
  searchInput: {
    color: '#F5F5F5',
    backgroundColor: '#F5F5F5',
    marginHorizontal: 5,
    borderRadius: 20,
  },
  mainContainer: {
    paddingHorizontal: 10,
    flex: 1,
    backgroundColor: 'white',
  },

  touchButton: {
    fontSize: 20,
    fontWeight: '700',
    paddingBottom: 10,
    marginHorizontal: 10,
  },
});

export default Meals;
