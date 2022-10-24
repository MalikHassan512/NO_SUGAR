import React, {useState, useEffect} from 'react';
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import {Searchbar, Badge, IconButton} from 'react-native-paper';
import {getPaginationData} from '../NetworkRequest';
import {usePaginatorParams} from '../../custom_hooks/pagination_params_hook';
import RecipeCard from './Recipes/components/RecipeCard';
import Catagories from '../Products/components/Catagories';
import RecipeCate from './components/RecipeCategories';
import {getData} from '../NetworkRequest';
import EmptyComponent from '../Components/EmptyComponent';
import PlaceholderImage from '../../../assets/emptyProduct.svg';
import {useIsFocused} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {set} from 'react-native-reanimated';

const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;

const LifeStyle = () => {
  // const [isLoading, isRefreshing, recipes, loadMore, refreshRecipes] =
  //   usePaginatorParams(getPaginationData, 'recipe/', {});
  const [search, setSearch] = useState(false);
  const [tags, setTags] = useState([]);
  const token = useSelector(state => state?.auth?.token);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [recipes, setRecipes] = useState([]);
  const [recipes2, setRecipes2] = useState([]);
  const [recipes3, setRecipes3] = useState([]);
  const [selectedCat, setSelectedCat] = useState('All');
  const [selectedType, setSelectedType] = useState(',');
  const [isFilter, setIsFilter] = useState(false);
  const [hasBadge, setHasBadge] = useState(false);
  const isFocused = useIsFocused();
  // const [catTag,setCat]
  const onChangeSearch = query => setSearchQuery(query);
  // console.log(recipes[0]);
  const getRecipeData = async param => {
    try {
      const data = await getData(token, 'recipe/');
      setRecipes(data?.results);
      setRecipes2(data?.results);
      setLoading(false);
      console.log(data?.results);
    } catch (error) {}
  };
  const onSearch = () => {
    if (searchQuery === '') {
      setSearch(false);
      return;
    }
    setSearch(true);
    setRecipes(recipes2.filter(ing => ing.name.includes(searchQuery) === true));
  };

  useEffect(() => {
    getRecipeData();
  }, []);

  const areEqual = (first, second) => {
    if (first.length !== second.length) {
      return false;
    }
    for (let i = 0; i < first.length; i++) {
      if (!second.includes(first[i])) {
        return false;
      }
    }
    return true;
  };

  const handleFilter = selectedTags => {
    console.log(selectedTags);
    let filtered = recipes.filter(Recipes => {
      if (selectedTags.length === 1) {
        return Recipes.tags === selectedTags[0];
      } else if (selectedTags.length >= 2) {
        let RecipesTags = Recipes.tags;
        console.log(RecipesTags.split(' , '));
        let status = areEqual(RecipesTags.split(' , '), selectedTags);
        console.log(status);
        if (status === true) {
          return Recipes;
        }
      }
    });
    console.log(selectedTags);
  };

  const handleTagSelect = selectedTag => {
    console.log(selectedTag);
    setTags([...tags, selectedTag]);
    handleFilter([...tags, selectedTag]);
  };
  const onFilter = item => {
    setSelectedType('');
    if (item === 'All') {
      setHasBadge(false);
      setRecipes(recipes2);
      setRecipes3(recipes2);
      return;
    }
    setRecipes(
      recipes2.filter(ing =>
        ing.tags === null ? false : ing.tags.includes(item) === true,
      ),
    );
    setHasBadge(true);
    setRecipes3(
      recipes2.filter(ing =>
        ing.tags === null ? false : ing.tags.includes(item) === true,
      ),
    );
  };
  return (
    <View style={{backgroundColor: 'white', minHeight: '100%'}}>
      <View
        style={{
          margin: 5,
          flexDirection: 'row',
          alignSelf: 'center',
          width: width - 20,
        }}>
        <Searchbar
          placeholder="Search recipe"
          onChangeText={onChangeSearch}
          onIconPress={onSearch}
          onKeyPress={onSearch}
          value={searchQuery}
          autoFocus={false}
          style={styles.searchInput}
        />
        <View
          style={{
            position: 'absolute',
            right: 0,
            bottom: 0,
            // zIndex: 101,
            // marginLeft: -30,
          }}>
          <IconButton
            onPress={() => setIsFilter(isFilters => !isFilters)}
            color="#66cc33"
            style={{}}
            icon="filter"
          />
          <View style={{position: 'absolute', right: 8, top: 8}}>
            {hasBadge ? <Badge size={10} /> : null}
          </View>
        </View>
      </View>
      {isFilter && (
        <>
          <View>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}>
              <View style={styles.ButtonContainer}>
                {[
                  'All',
                  'Keto',
                  'Vegetarian',
                  'Gluten Free',
                  'Plant Based',
                  'Atkins',
                  'Low Fat',
                  'Low Carb',
                  'Paleo',
                ].map((item, index) => (
                  <TouchableOpacity
                    key={item + index}
                    onPress={() => {
                      setSelectedCat(item);
                      onFilter(item);
                    }}
                    style={
                      selectedCat === item ? styles.buttonActive : styles.button
                    }>
                    <Text
                      style={[
                        selectedCat === item ? styles.textActive : styles.text,
                      ]}>
                      {item}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>

          <View>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}>
              <View style={styles.ButtonContainer}>
                {/* <RecipeCate
              onSelect={paramss => getRecipeData(paramss)}
              buttons={}
            /> */}
                {['Breakfast', 'Lunch', 'Dinner', 'Appetizer', 'Desert'].map(
                  (item, index) => (
                    <TouchableOpacity
                      key={item + index}
                      onPress={() => {
                        setSelectedType(item);
                        setSearch(true);
                        setHasBadge(true);
                        setRecipes(
                          recipes3.filter(ing =>
                            ing.tags === null
                              ? false
                              : ing.tags.includes(item) === true,
                          ),
                        );
                      }}
                      style={
                        selectedType === item
                          ? styles.buttonActive
                          : styles.button
                      }>
                      <Text
                        style={[
                          selectedCat === item
                            ? styles.textActive
                            : styles.text,
                        ]}>
                        {item}
                      </Text>
                    </TouchableOpacity>
                  ),
                )}
              </View>
            </ScrollView>
          </View>
        </>
      )}
      <FlatList
        // refreshing={isRefreshing}
        // onRefresh={refreshRecipes}
        data={recipes}
        // onEndReached={loadMore}
        renderItem={({item}) => <RecipeCard key={item?.uuid} data={item} />}
        // ListFooterComponent={() => (
        //   <FooterLoadingComponent
        //     loading={isLoading}
        //     resultLength={recipes.length}
        //   />
        // )}
        ListEmptyComponent={() =>
          loading ? (
            <View
              style={{
                flex: 1,
                height: height * 0.5,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <ActivityIndicator color="#66cc33" />
            </View>
          ) : (
            <EmptyComponent
              Svg={PlaceholderImage}
              message={'No recipe available yet'}
              messageTitle={'No Recipe'}
            />
          )
        }
      />
    </View>
  );
};

const FooterLoadingComponent = ({loading, resultLength}) => {
  if (loading && resultLength > 0) {
    return (
      <View style={{paddingVertical: 20}}>
        <ActivityIndicator color={'#66cc3'} />
      </View>
    );
  } else {
    return null;
  }
};

export default LifeStyle;

const styles = StyleSheet.create({
  searchInput: {
    // marginTop: 10,
    // alignSelf: 'center',
    width: width - 20,
    borderColor: '#F5F5F5',
    // backgroundColor: 'white',
    // marginHorizontal: 0,
    // borderRadius: 20,
    borderRadius: 50,
    borderWidth: 1.5,
    elevation: 0,
    height: 48,
  },
  ButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 5,
    // height: 50,
    // alignItems: 'center',
  },
  button: {
    marginRight: 5,
    elevation: 5,
    backgroundColor: 'white',
    // width: 90,
    padding: 15,
    // height: 30,
    alignItems: 'center',
    borderRadius: 20,
    justifyContent: 'center',
    marginHorizontal: 5,
  },
  buttonActive: {
    elevation: 5,
    marginHorizontal: 5,
    // width: 90,
    padding: 10,
    // height: 30,
    alignItems: 'center',
    justifyContent: 'center',

    backgroundColor: '#E8FFE0',
    borderRadius: 20,
    // borderColor: '#72B852',
  },
  text: {
    color: 'black',
    fontSize: 14,
  },
  textActive: {
    color: '#72B852',
    paddingHorizontal: 10,
    fontSize: 16,
  },
});
