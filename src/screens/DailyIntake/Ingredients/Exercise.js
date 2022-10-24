import React, {useState, useEffect} from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
  FlatList,
} from 'react-native';
import {Searchbar} from 'react-native-paper';
import {useIsFocused, useNavigation, useRoute} from '@react-navigation/native';
import EmptyComponent from '../../Components/EmptyComponent';
import PlaceholderImage from '../../../../assets/emptyProduct.svg';
import MealCard from './components/MealCard';
import {getPaginationData, getData} from '../../NetworkRequest/';
import {usePaginatorParams} from '../../../custom_hooks/pagination_params_hook';
import {useSelector} from 'react-redux';
import ModalAuth from '../../../components/ModalAuth';

const height = Dimensions.get('window').height;

const Ingredient = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const [loading, setLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const token = useSelector(state => state?.auth?.token);
  const [ingredient, setIngredient] = useState([]);
  const [ingredient2, setIngredient2] = useState([]);
  const [authVisible, setAuthVisible] = useState(false);

  // const getCategories = async () => {
  //   try {
  //     const data = await getData(token, 'categries/', {
  //       cat_type: params?.type === 'exer' ? 'Exercise' : 'Ingredient',
  //     });
  //     setCatagories(data);
  //     setLoading(false);
  //     // console.log(data);
  //   } catch (error) {
  //     console.log(error);
  //     console.log(error);
  //   }
  // };
  // const _getFoods = async () => {
  //   try {
  //     const data = await getData(token, 'fav-food/');
  //     console.log('dataa food', data);
  //     setFoods(data);
  //   } catch (error) {}
  // };

  // const getMealFood = async param => {
  //   try {
  //     const data = await getData(token, 'meal/', param);
  //     params?.type === 'exer' ? setMeals([]) : setMeals(data);

  //     // setLoading(false);
  //   } catch (error) {}
  // };

  const getExercise = async () => {
    try {
      setIsLoading(true);
      const data = await getData(token, 'exercise/');
      setIngredient(data?.results);

      setIngredient2(data?.results);
      setIsLoading(false);
      setLoading(false);
      // console.log(data);
    } catch (error) {
      console.log(error);
      console.log(error);
    }
  };

  const isRefreshing = false;

  const onChangeSearch = query => setSearchQuery(query);

  const onSerach = () => {
    if (searchQuery === '' || searchQuery.length === 0) {
      setIngredient(ingredient2);
      return;
    }

    setIngredient(
      ingredient2.filter(ing => ing?.name?.includes(searchQuery) === true),
    );
  };

  useEffect(() => {
    getExercise();
  }, []);
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
        // icon="search"
        style={styles.searchInput}
        placeholder="Search all items"
        onSubmitEditing={onSerach}
        onChangeText={onChangeSearch}
        value={searchQuery}
        onIconPress={onSerach}
        onKeyPress={onSerach}
        // onKeyPress={() =>
        //   searchQuery.length < 1
        //     ? params?.type === 'exer'
        //       ? setIngredient(ingredient2)
        //       : getExercise()
        //     : null
        // }
      />
      <View>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          style={{backgroundColor: 'white'}}
          horizontal>
          {/* <TouchableOpacity
            style={{
              backgroundColor: 'red',
              borderBottomWidth: 3,
              color: selected === '1' ? 'black' : 'grey',
              borderColor: selected === '1' ? 'black' : 'grey',
            }}
            onPress={() => {
              // eslint-disable-next-line no-lone-blocks

              setSelected('1');

              refreshingredient();
            }}>
            <Text
              style={[
                styles.touchButton,
                {
                  color: selected === '1' ? 'black' : 'grey',
                },
              ]}>
              All
            </Text>
          </TouchableOpacity> */}
          {/* {params?.type === 'exer' ? (
            <TouchableOpacity
              style={{
                borderBottomWidth: 3,
                color: selected === '2' ? 'black' : 'grey',
                borderColor: selected === '2' ? 'black' : 'grey',
              }}
              onPress={() => {
                // eslint-disable-next-line no-lone-blocks

                setSelected('1');

                navigate('WalkIntake');
              }}>
              <Text
                style={[
                  styles.touchButton,
                  {
                    color: selected === '2' ? 'black' : 'grey',
                  },
                ]}>
                Walk
              </Text>
            </TouchableOpacity>
          ) : null}
          {catagories?.map((item, index) => {
            return (
              <TouchableOpacity
                style={{
                  borderBottomWidth: 3,
                  color: selected === item?.uuid ? 'black' : 'grey',
                  borderColor: selected === item?.uuid ? 'black' : 'grey',
                }}
                onPress={() => {
                  // eslint-disable-next-line no-lone-blocks

                  setSelected(item?.uuid);

                  refreshingredient(item?.uuid);
                }}
                key={index}>
                <Text
                  style={[
                    styles.touchButton,
                    {
                      color: selected === item?.uuid ? 'black' : 'grey',
                    },
                  ]}>
                  {item?.name}
                </Text>
              </TouchableOpacity>
            );
          })} */}
        </ScrollView>
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        // refreshing={isRefreshing}
        // onRefresh={refreshingredient}
        data={ingredient}
        // onEndReached={() => loadMore()}
        keyExtractor={(_, index) => `${index}`}
        renderItem={({item}) => (
          <MealCard type="exer" key={item?.uuid} data={item} />
        )}
        // ListFooterComponent={() => (
        //   <FooterLoadingComponent
        //     loading={isLoading}
        //     resultLength={ingredient.length}
        //     refreshing={isRefreshing}
        //   />
        // )}
        ListEmptyComponent={() =>
          isLoading ? (
            isRefreshing ? null : (
              <View style={styles?.loader}>
                <ActivityIndicator color="#66cc33" />
              </View>
            )
          ) : (
            <EmptyComponent
              Svg={PlaceholderImage}
              message={'No exercise found for this category '}
              messageTitle={'No Exercise'}
            />
          )
        }
      />

      {/* <Divider style={{height: 3, marginTop: -4}} /> */}
      {/* <MealsStat /> */}
      {/* {ingredient?.map((item, index) => (
        <MealCard key={index} />
      ))} */}
    </View>
  );
};

const FooterLoadingComponent = ({loading, resultLength, refreshing}) => {
  if ((loading && resultLength > 0) || refreshing) {
    return (
      <View style={{paddingVertical: 20, marginBottom: 20}}>
        <ActivityIndicator color={'#66cc3'} />
      </View>
    );
  } else {
    return null;
  }
};

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    height: height * 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  touchButton: {
    fontSize: 20,
    // borderBottomWidth: 4,
    // height: 40,
    fontWeight: '700',
    paddingBottom: 10,
    marginHorizontal: 10,
  },
  searchInput: {
    color: '#F5F5F5',
    backgroundColor: '#F5F5F5',
    marginHorizontal: 10,
    borderRadius: 20,
    marginBottom: 20,
  },
});

export default Ingredient;
