import React, {useState, useEffect, Fragment} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {Searchbar, Divider, Card, Button} from 'react-native-paper';
import {getData, postData} from '../../NetworkRequest/';
import {useSelector} from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation, useRoute} from '@react-navigation/core';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MealCard from '../../DailyIntake/Ingredients/components/MealCard';

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

export default function AddMeal() {
  const {params} = useRoute();
  const token = useSelector(state => state?.auth?.token);
  const [selectedItems, setselectedItems] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [ingredient, setIngredient] = useState([]);
  const [selectedFoodItems, setselectedFoodItems] = useState([]);
  const [postLoading, setPostLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [mealName, setMealName] = useState('');
  const [foods, setFoods] = useState([]);
  const navigation = useNavigation();
  const [quantity, setQuantity] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState([]);
  const [selected, setSelected] = useState('');

  let totalCalories = 0;

  const sendMealData = async () => {
    console.log('api callling', mealName);
    if (mealName === '') {
      return;
    }

    try {
      setPostLoading(true);
      await postData(token, 'meal/', {
        meal_name: mealName,
        ingredient_list: selectedProduct.map(item => {
          return item.uuid;
        }),
        quantity: selectedFoodItems.length,
        code: selectedItems[0],
        cat_code: 'meal',
      });

      setPostLoading(false);
      setSelectedProduct([]);
      navigation?.navigate('DailyIntakeScreen');
    } catch (error) {
      console.log(error, 'error');
      setPostLoading(false);
    }
  };

  const textHandler = text => {
    console.log('rrrrrr', text);
    setMealName(text);
  };

  // const getDataFood = async () => {
  //   try {
  //     const myData = await getData(token, 'search/', {name: searchQuery});
  //     console.log('myData', myData);
  //     setIngredient([
  //       ...myData?.Ingredient,
  //       ...myData?.Product,
  //       ...myData?.Recipe,
  //     ]);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const onChangeSearch = query => setSearchQuery(query);
  const onSerach = async () => {
    if (searchQuery.length < 3) {
      setIngredient([]);
      return;
    }
    try {
      const data = await getData(token, 'search-food/', {search: searchQuery});
      setLoading(false);
      setIngredient(data);
    } catch (error) {}
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.inputContainer}>
        <View style={{marginVertical: 10}}>
          <Text style={{fontWeight: '600', marginLeft: 10, marginBottom: 10}}>
            Meal Name
          </Text>
          <Card style={styles.searchInput}>
            <TextInput
              placeholder="Name of the meal"
              onChangeText={textHandler}
              style={styles.inputTextContainer}
            />
          </Card>
        </View>
        <Card
          style={{
            borderRadius: 30,
            paddingHorizontal: 30,
            paddingVertical: 10,
            marginBottom: 10,
          }}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Button
              onPress={() => setSelected('br')}
              color="black"
              icon={selected === 'br' ? 'check-circle' : 'circle-outline'}>
              <Text>Breakfast</Text>
            </Button>
            <Button
              onPress={() => setSelected('ln')}
              color="black"
              icon={selected === 'ln' ? 'check-circle' : 'circle-outline'}>
              {' '}
              Lunch{' '}
            </Button>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Button
              onPress={() => setSelected('dn')}
              color="black"
              icon={selected === 'dn' ? 'check-circle' : 'circle-outline'}>
              <Text>Dinner</Text>
            </Button>
            <Button
              onPress={() => setSelected('sn')}
              color="black"
              icon={selected === 'sn' ? 'check-circle' : 'circle-outline'}>
              {' '}
              Snacks{' '}
            </Button>
          </View>
        </Card>
        <View>
          <Searchbar
            // icon="search"
            style={styles.searchInput}
            placeholder={'Search all for food'}
            onChangeText={onChangeSearch}
            value={searchQuery}
            onIconPress={onSerach}
            onKeyPress={onSerach}
            onTouchCancel={() => setIngredient([])}
          />
          <FlatList
            showsVerticalScrollIndicator={false}
            data={ingredient}
            keyExtractor={(_, index) => `${index}`}
            renderItem={({item}) => (
              <MealCard
                home={true}
                type={params?.type}
                key={item?.uuid}
                data={item}
                onSelected={data => {
                  setSelectedProduct([...selectedProduct, item]);
                  setIngredient([]);
                }}
              />
            )}
          />
        </View>
      </View>
      <ScrollView>
        {selectedProduct &&
          selectedProduct.map(item => {
            totalCalories = totalCalories + parseFloat(item.calories);
            return (
              <Fragment key={item?.uuid}>
                <View style={styles.productDetails}>
                  <Text style={{fontSize: 16}}>
                    {/* {foods?.filter(data => data?.uuid === item)[0]?.name} */}
                    {item.name}
                  </Text>

                  <Text>
                    {item.calories} {''}
                    Kcal
                  </Text>
                </View>
                <Divider />
              </Fragment>
            );
          })}
        {
          <View style={styles.productDetails}>
            <Text style={{fontSize: 16}}>Total Calories</Text>

            <Text>{totalCalories.toFixed(2)} Kcal </Text>
          </View>
        }
      </ScrollView>

      {/* <GradientButton
        postLoading={postLoading}
        onSubmit={sendMealData}
        height={60}
        borderRadius={35}
        title={'Save'}
      /> */}
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        style={styles.loginButton}
        colors={['#41B87F', '#86B841']}>
        <TouchableOpacity onPress={sendMealData}>
          <View style={styles.loginContainer}>
            {postLoading ? <ActivityIndicator color="white" /> : null}
            <Text style={styles.loginTouch}>Save</Text>
          </View>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  singleStyle: {
    flex: 0.3,
    opacity: 0.8,
    width: '90%',
    paddingVertical: 50,
    backgroundColor: '#F5FCFF',
    borderColor: 1,
    height: 186,
  },
  singleSelector: {
    borderRadius: 30,
    borderWidth: 0,
    height: 50,
    justifyContent: 'center',
    width: '100%',
  },
  searchInput: {
    color: '#F5F5F5',
    marginHorizontal: 5,
    borderRadius: 30,
    height: 50,
  },
  productDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 20,
  },
  loginButton: {
    borderRadius: 15,
    height: 50,

    margin: 10,
    // marginBottom: 15,
    justifyContent: 'center',
  },
  loginContainer: {flexDirection: 'row', alignSelf: 'center'},
  loginTouch: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
    marginHorizontal: 10,
  },
  MultiSelectInput: {
    marginVertical: 10,
    borderWidth: 0.5,
    borderColor: 'black',
    borderRadius: 30,
    paddingHorizontal: 20,
  },
  listingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 15,
    marginVertical: 10,
    backgroundColor: 'pink',
  },
  textListing: {fontSize: 12},

  GradientButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  textStyle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
  },

  align: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    height: 50,
    borderWidth: 0.5,
    borderRadius: 30,
    paddingHorizontal: 20,
    marginVertical: 5,
  },
  TextContainer: {
    paddingVertical: 10,
    color: 'grey',
    fontSize: 14,
  },
  inputContainer: {
    margin: 20,
  },
  inputTextContainer: {
    height: 40,
    borderWidth: 0.1,

    borderColor: 'grey',
    borderRadius: 30,
    paddingHorizontal: 10,
    marginVertical: 5,
    elevation: 5,
    backgroundColor: 'white',
  },
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'space-between',
  },
});
