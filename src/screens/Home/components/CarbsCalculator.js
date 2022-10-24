import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
  Dimensions,
  FlatList,
  Image,
  TextInput,
} from 'react-native';
import {Searchbar, Card, Button} from 'react-native-paper';
import {useNavigation, useRoute} from '@react-navigation/native';
import MealCard from '../../DailyIntake/Ingredients/components/MealCard';
import {getData, postData} from '../../NetworkRequest/';
import {useSelector} from 'react-redux';
import ModalAuth from '../../../components/ModalAuth';
import Carbohydrate from '../../../../assets/new1/carbohy.svg';
import SugarSvg from '../../../../assets/new1/sugar.svg';
import NetCarbsSvg from '../../../../assets/new1/carbs.svg';
import FiberSvg from '../../../../assets/new1/fiber.svg';
import GradientButton from '../../../components/GradientBotton';
import CalariosSvg from '../../../../assets/MealIcons/Calories.svg';
import Carb1Svg from '../../../../assets/MealIcons/Carbs.svg';
import FatSvg from '../../../../assets/MealIcons/Fats.svg';
import ProtienSvg from '../../../../assets/MealIcons/Protein.svg';
import LinearGradient from 'react-native-linear-gradient';
import {launchImageLibrary} from 'react-native-image-picker';

const height = Dimensions.get('window').height;

const Ingredient = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const {params} = useRoute();
  const [selectedProduct, setSelectedProduct] = useState({
    protein: 0,
    net_carbs: 0,
    sugar: 0,
    fiber: 0,
    carbohydrate: 0,
    calories: 0,
    fats: 0,
  });
  const [loading, setIsLoading] = useState(false);
  const token = useSelector(state => state?.auth?.token);
  const [ingredient, setIngredient] = useState([]);
  const [authVisible, setAuthVisible] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const activityValue = useSelector(state => state?.activityValue?.activity);
  const [isCustomVisible, setCustomVisible] = useState(true);
  const [isFirstRender, setIsFirstRender] = useState(false);
  const [fiber, setFiber] = useState(0);
  const [protien, setProtien] = useState(0);
  const [calories, setCalories] = useState(0);
  const [fats, setFats] = useState(0);
  const [sugar, setSugar] = useState(0);
  const [image, setImage] = useState(null);
  const [carbohydrate, setCarbohydrate] = useState(0);
  const [foodName, setFoodName] = useState('');
  const [isLoading, setLoading] = useState(0);
  const navigation = useNavigation();
  const [selected, setSelected] = useState('br');
  const minHandler = () => {
    quantity > 1 ? setQuantity(quantity - 1) : 5;
  };
  // console.log('max hanflerrr', );
  const maxhandler = () => {
    setQuantity(quantity + 1);
  };

  const getDataFood = async () => {
    setIsLoading(true);
    try {
      const myData = await getData(token, 'search-food/', {
        search: searchQuery,
      });
      console.log('myData', myData);
      setIngredient(myData);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  const addImage = () => {
    launchImageLibrary(
      {
        // maxHeight: 200,
        // maxWidth: 200,
        mediaType: 'photo',
        // includeBase64: true,
      },
      response => {
        if (!response.didCancel) {
          setImage(response?.assets[0]);
        }
      },
    );
  };
  const postFood = async () => {
    setLoading(true);
    let formData = new FormData();

    formData.append('image', {
      name: image?.fileName,
      type: image?.type,
      uri:
        Platform.OS === 'ios' ? image?.uri.replace('file://', '') : image?.uri,
    });
    formData.append('name', foodName);
    formData.append('fiber', fiber);
    formData.append('sugar', sugar);
    formData.append('carbohydrate', carbohydrate);
    formData.append('protein', protien);
    formData.append('weight', '0');
    formData.append('cat_code', 'ff');
    formData.append('calories', calories);
    formData.append('fats', fats);
    formData.append('quantity', 1);
    // formData.append('calories', '0');
    formData.append('p_code', selected);
    try {
      await postData(token, 'fav-food/', formData);

      setLoading(false);
      navigation.goBack();
    } catch (error) {
      console.log(error);
    }
  };
  const addFav = async f_uuid => {
    try {
      await postData(token, 'add-fav/', {uuid: f_uuid});

      setLoading(false);
      navigation.goBack();
    } catch (error) {
      console.log(error);
    }
  };
  const onChangeSearch = query => setSearchQuery(query);
  const onSerach = () => {
    if (searchQuery.length < 3) {
      setIngredient([]);
      return;
    }

    getDataFood();
  };

  return false ? (
    <View style={styles?.loader}>
      <ActivityIndicator color="#66cc33" />
    </View>
  ) : (
    <FlatList
      data={[1]}
      renderItem={() => (
        <View style={{backgroundColor: 'white', flex: 1, paddingTop: 20}}>
          {authVisible && (
            <ModalAuth
              isVisible={authVisible}
              onClose={() => setAuthVisible(false)}
            />
          )}
          <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
            <TouchableOpacity
              onPress={() => {
                setCustomVisible(true);
                setIsFirstRender(true);
              }}>
              <Text style={styles.topTitle}>Select Food </Text>
            </TouchableOpacity>
            <Text style={[styles?.topTitle, {color: 'grey'}]}>|</Text>
            <TouchableOpacity onPress={() => setCustomVisible(false)}>
              <Text style={styles.topTitle}>Add Manually</Text>
            </TouchableOpacity>
          </View>
          {isCustomVisible && isFirstRender && (
            <Searchbar
              // icon="search"
              style={styles.searchInput}
              placeholder="Search all items"
              onChangeText={onChangeSearch}
              value={searchQuery}
              onIconPress={onSerach}
              // onKeyPress={onSerach}
              onSubmitEditing={onSerach}
              onTouchCancel={() => setIngredient([])}
            />
          )}
          {loading ? <ActivityIndicator style={{marginTop: 10}} /> : null}
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
                  setSelectedProduct(data);
                  setIngredient([]);
                  setSearchQuery('');
                  setQuantity(1);
                }}
              />
            )}
          />
          <Card style={styles.cardContainer}>
            {!isCustomVisible && (
              <TouchableOpacity
                onPress={addImage}
                style={{
                  alignSelf: 'center',
                  justifyContent: 'center',
                  height: 100,
                  borderRadius: 10,
                  borderColor: 'grey',
                  borderWidth: 1,
                  paddingHorizontal: image === null ? 20 : 0,
                  // width: 150,
                }}>
                {image === null ? (
                  <Text>Add Food Item Image</Text>
                ) : (
                  <Image
                    height={100}
                    width={100}
                    style={{
                      width: 150,
                      height: 100,
                    }}
                    // resizeMode="center"
                    source={{
                      uri:
                        Platform.OS === 'ios'
                          ? image?.uri.replace('file://', '')
                          : image?.uri,
                    }}
                  />
                )}
              </TouchableOpacity>
            )}
            <View style={styles.ProductContainer}>
              <Text style={styles.Title}>Name of Product:</Text>
              {isCustomVisible ? (
                <Text numberOfLines={2} style={styles.ProductName}>
                  {selectedProduct?.name || ''}
                </Text>
              ) : (
                <TextInput
                  // keyboardType="numeric"
                  placeholder="Name of product"
                  style={styles.inputName}
                  returnKeyType="next"
                  // value={(carbohydrate * quantity).toFixed(2)}
                  onChangeText={text => {
                    setFoodName(text);
                  }}
                />
              )}
            </View>

            <View style={styles.ProductContainer}>
              <View>
                <View style={styles.IconWithText}>
                  <Carbohydrate
                    height={20}
                    width={20}
                    style={{marginRight: 10}}
                  />
                  <Text style={styles.Title}>Carbohydrate</Text>
                </View>

                <View style={styles.IconWithText}>
                  <SugarSvg height={20} width={20} style={{marginRight: 10}} />
                  <Text style={styles.Title}>Sugar</Text>
                </View>

                <View style={styles.IconWithText}>
                  <FiberSvg height={20} width={20} style={{marginRight: 10}} />
                  <Text style={styles.Title}>Fiber</Text>
                </View>
                {/* <View style={styles.IconWithText}>
                  <ProtienSvg
                    height={20}
                    width={20}
                    style={{marginRight: 10}}
                  />
                  <Text style={styles.Title}>Protein</Text>
                </View>
                <View style={styles.IconWithText}>
                  <CalariosSvg
                    height={20}
                    width={20}
                    style={{marginRight: 10}}
                  />
                  <Text style={styles.Title}>Calories</Text>
                </View>
                <View style={styles.IconWithText}>
                  <FatSvg height={20} width={20} style={{marginRight: 10}} />
                  <Text style={styles.Title}>Fats</Text>
                </View> */}
                <View style={styles.IconWithText}>
                  <NetCarbsSvg
                    height={20}
                    width={20}
                    style={{marginRight: 10}}
                  />
                  <Text style={styles.Title}>Net Carbs</Text>
                </View>
              </View>

              <View>
                {isCustomVisible ? (
                  <>
                    <Text style={styles.ItemDetail}>
                      {selectedProduct?.carbohydrate == null
                        ? 0
                        : (selectedProduct?.carbohydrate * quantity).toFixed(2)}
                    </Text>
                    <Text style={styles.ItemDetail}>
                      {selectedProduct?.sugar == null
                        ? 0
                        : (selectedProduct?.sugar * quantity).toFixed(2)}
                    </Text>
                    <Text style={styles.ItemDetail}>
                      {selectedProduct?.fiber == null
                        ? 0
                        : (selectedProduct?.fiber * quantity).toFixed(2)}
                    </Text>
                    {/* <Text style={styles.ItemDetail}>
                      {selectedProduct?.protein == null
                        ? 0
                        : (selectedProduct?.protein * quantity).toFixed(2)}
                    </Text>
                    <Text style={styles.ItemDetail}>
                      {selectedProduct?.calories == null
                        ? 0
                        : (selectedProduct?.calories * quantity).toFixed(2)}
                    </Text>
                    <Text style={styles.ItemDetail}>
                      {selectedProduct?.fats == null
                        ? 0
                        : (selectedProduct?.fats * quantity).toFixed(2)}
                    </Text> */}
                    <Text style={styles.ItemDetail}>
                      {selectedProduct?.net_carbs == null
                        ? 0
                        : (selectedProduct?.net_carbs * quantity).toFixed(2)}
                    </Text>
                  </>
                ) : (
                  <>
                    <TextInput
                      keyboardType="numeric"
                      style={styles.inputText}
                      returnKeyType="next"
                      // value={(carbohydrate * quantity).toFixed(2)}
                      placeholder="0.00"
                      onChangeText={text => {
                        setCarbohydrate(text);
                      }}
                    />
                    <TextInput
                      keyboardType="numeric"
                      style={styles.inputText}
                      returnKeyType="next"
                      placeholder="0.00"
                      onChangeText={text => {
                        setSugar(text);
                      }}
                    />
                    <TextInput
                      keyboardType="numeric"
                      style={styles.inputText}
                      returnKeyType="next"
                      // value={fiber || 0}
                      placeholder="0.00"
                      onChangeText={text => {
                        console.log('text', text);
                        text ? setFiber(text) : setFiber(0);
                      }}
                    />

                    {/* <TextInput
                      keyboardType="numeric"
                      style={styles.inputText}
                      returnKeyType="next"
                      placeholder="0.00"
                      onChangeText={text => {
                        setProtien(text);
                      }}
                    />
                    <TextInput
                      keyboardType="numeric"
                      style={styles.inputText}
                      returnKeyType="next"
                      placeholder="0.00"
                      onChangeText={text => {
                        setCalories(text);
                      }}
                    />
                    <TextInput
                      keyboardType="numeric"
                      style={styles.inputText}
                      returnKeyType="next"
                      placeholder="0.00"
                      onChangeText={text => {
                        setFats(text);
                      }}
                    /> */}
                    <Text
                      style={[
                        styles.ItemDetail,
                        {fontSize: 18, fontWeight: 'bold'},
                      ]}>
                      {(carbohydrate - fiber - sugar).toFixed(2)}
                    </Text>
                  </>
                )}
              </View>
            </View>

            {isCustomVisible ? (
              <View style={styles.buttonContainer}>
                <GradientButton
                  onSubmit={minHandler}
                  borderRadius={5}
                  title="-"
                />
                <Text style={styles.counterText}>{quantity}</Text>
                <GradientButton
                  onSubmit={maxhandler}
                  borderRadius={5}
                  title="+"
                />
              </View>
            ) : (
              <>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Button
                    onPress={() => setSelected('br')}
                    color="black"
                    icon={
                      selected === 'br' ? 'check-circle' : 'circle-outline'
                    }>
                    <Text>Breakfast</Text>
                  </Button>
                  <Button
                    onPress={() => setSelected('dn')}
                    color="black"
                    icon={
                      selected === 'dn' ? 'check-circle' : 'circle-outline'
                    }>
                    {' '}
                    <Text> Dinner</Text>
                  </Button>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Button
                    onPress={() => setSelected('ln')}
                    color="black"
                    icon={
                      selected === 'ln' ? 'check-circle' : 'circle-outline'
                    }>
                    Lunch{' '}
                  </Button>

                  <Button
                    onPress={() => setSelected('sn')}
                    color="black"
                    icon={
                      selected === 'sn' ? 'check-circle' : 'circle-outline'
                    }>
                    {' '}
                    Snacks
                  </Button>
                </View>
              </>
            )}
          </Card>
          {isCustomVisible ? (
            selectedProduct?.uuid ? (
              <LinearGradient
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                style={styles.loginButton}
                colors={['#41B87F', '#86B841']}>
                <TouchableOpacity
                  onPress={() => {
                    selectedProduct?.uuid
                      ? addFav(selectedProduct?.uuid)
                      : null;
                  }}>
                  <View style={styles.loginContainer}>
                    {isLoading ? <ActivityIndicator color="white" /> : null}
                    <Text style={styles.loginTouch}>Add to Favorite</Text>
                  </View>
                </TouchableOpacity>
              </LinearGradient>
            ) : null
          ) : (
            <LinearGradient
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              style={styles.loginButton}
              colors={['#41B87F', '#86B841']}>
              <TouchableOpacity
                onPress={() => {
                  foodName === '' || image === null ? null : postFood();
                }}>
                <View style={styles.loginContainer}>
                  {isLoading ? <ActivityIndicator color="white" /> : null}
                  <Text style={styles.loginTouch}>Log Food</Text>
                </View>
              </TouchableOpacity>
            </LinearGradient>
          )}
          <Card style={styles.cardContainer}>
            <Text style={styles.Summary}>Today's Forecast</Text>
            <View style={styles.ProductContainer}>
              <View>
                <View style={styles.IconWithText}>
                  <Carbohydrate
                    height={20}
                    width={20}
                    style={{marginRight: 10}}
                  />
                  <Text style={styles.Title}>Carbohydrate</Text>
                </View>

                <View style={styles.IconWithText}>
                  <SugarSvg height={20} width={20} style={{marginRight: 10}} />
                  <Text style={styles.Title}>Sugar</Text>
                </View>

                <View style={styles.IconWithText}>
                  <FiberSvg height={20} width={20} style={{marginRight: 10}} />
                  <Text style={styles.Title}>Fiber</Text>
                </View>
                <View style={styles.IconWithText}>
                  <NetCarbsSvg
                    height={20}
                    width={20}
                    style={{marginRight: 10}}
                  />
                  <Text style={styles.Title}>Net Carb</Text>
                </View>
              </View>

              <View>
                {isCustomVisible ? (
                  <>
                    <Text style={styles.ItemDetail}>
                      {/* {selectedProduct?.net_carbs == null ? 0 : (selectedProduct?.net_carbs * quantity*1.5).toFixed(2)} */}
                      {(
                        activityValue?.Food?.carbohydrate +
                        selectedProduct?.carbohydrate * quantity
                      ).toFixed(2)}
                    </Text>
                    <Text style={styles.ItemDetail}>
                      {/* {selectedProduct?.calories == null ? 0 : (selectedProduct?.calories * quantity*1.5).toFixed(2)} */}
                      {(
                        activityValue?.Food?.fiber +
                        selectedProduct?.fiber * quantity
                      ).toFixed(2)}
                    </Text>
                    <Text style={styles.ItemDetail}>
                      {/* {selectedProduct?.calories == null ? 0 : (selectedProduct?.calories * quantity*1.5).toFixed(2)} */}
                      {(
                        activityValue?.Food?.sugar +
                        selectedProduct?.sugar * quantity
                      ).toFixed(2)}
                    </Text>
                    <Text style={styles.ItemDetail}>
                      {/* {selectedProduct?.calories == null ? 0 : (selectedProduct?.calories * quantity*).toFixed(2)} */}
                      {(
                        activityValue?.Food?.net_carbs +
                        selectedProduct?.net_carbs * quantity
                      ).toFixed(2)}
                    </Text>
                  </>
                ) : (
                  <>
                    <Text style={styles.ItemDetail}>
                      {/* {selectedProduct?.net_carbs == null ? 0 : (selectedProduct?.net_carbs *1.5)} */}
                      {parseInt(
                        activityValue?.Food?.carbohydrate + carbohydrate,
                        10,
                      )}
                    </Text>
                    <Text style={styles.ItemDetail}>
                      {/* {selectedProduct?.calories == null ? 0 : (selectedProduct?.calories *1.5)} */}
                      {parseInt(activityValue?.Food?.fiber + fiber, 10)}
                    </Text>
                    <Text style={styles.ItemDetail}>
                      {/* {selectedProduct?.calories == null ? 0 : (selectedProduct?.calories *1.5)} */}
                      {parseInt(activityValue?.Food?.sugar + sugar, 10)}
                    </Text>
                    <Text style={styles.ItemDetail}>
                      {/* {selectedProduct?.calories == null ? 0 : (selectedProduct?.calories *1.5)} */}
                      {parseInt(
                        activityValue.Food?.net_carbs +
                          (carbohydrate - fiber - sugar),
                        10,
                      )}
                    </Text>
                  </>
                )}
              </View>
            </View>
          </Card>
        </View>
      )}
    />
  );
};

// const FooterLoadingComponent = ({loading, resultLength, refreshing}) => {
//   if ((loading && resultLength > 0) || refreshing) {
//     return (
//       <View style={{paddingVertical: 20, marginBottom: 20}}>
//         <ActivityIndicator color={'#66cc3'} />
//       </View>
//     );
//   } else {
//     return null;
//   }
// };

const styles = StyleSheet.create({
  loginContainer: {flexDirection: 'row', alignSelf: 'center'},
  loginTouch: {
    color: 'white',
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
    marginHorizontal: 10,
    // width: '50%',
  },
  loginButton: {
    marginVertical: 10,
    borderRadius: 25,
    marginHorizontal: 10,
    height: 50,
    justifyContent: 'center',
  },
  inputName: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#e5e5e5',
    color: 'gray',
    // paddingHorizontal: 15,
    minWidth: 150,
    paddingTop: 2,
    paddingBottom: 2,
    paddingHorizontal: 10,
    // paddingLeft: 5,
    fontSize: 14,
    fontWeight: '600',
    height: 30,
  },
  inputText: {
    marginVertical: 4,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#e5e5e5',
    color: 'gray',
    minWidth: 150,

    paddingTop: 2,
    paddingBottom: 2,
    paddingHorizontal: 10,
    // paddingLeft: 5,
    fontSize: 16,
    fontWeight: '600',
    height: 30,
  },
  counterText: {
    fontSize: 20,
    alignSelf: 'center',
    fontWeight: '600',
  },
  buttonContainer: {
    flexDirection: 'row',
    // marginTop: -10,
    // marginHorizontal: 50,
    justifyContent: 'space-evenly',
  },
  IconWithText: {
    flexDirection: 'row',
    alignItems: 'center',
    // marginVertical: 2,
  },
  Summary: {
    marginTop: 15,
    textAlign: 'center',
    color: '#41B87F',
    fontWeight: 'bold',
    fontSize: 18,
  },
  ProductName: {
    color: '#66cc33',
    marginVertical: 5,
    width: '36.9%',
    // backgroundColor: 'coral',
    textAlign: 'center',
  },
  ItemDetail: {
    color: 'grey',
    marginVertical: 9,
  },
  Title: {
    fontSize: 16,
    fontWeight: '700',
    marginVertical: 8,
  },
  topTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#41B87F',
    borderRadius: 10,
    marginBottom: 15,
    // borderWidth: 1,
    // padding: 5,
  },
  ProductContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
    alignItems: 'center',
  },
  cardContainer: {
    //  height: Dimensions.get('screen').height-640,
    marginVertical: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    elevation: 5,
    marginHorizontal: 10,
    borderRadius: 20,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainContainer: {
    backgroundColor: 'white',
    padding: 10,
  },
  searchInput: {
    color: '#F5F5F5',
    backgroundColor: '#F5F5F5',
    marginHorizontal: 5,
    borderRadius: 20,
  },
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
});

export default Ingredient;
