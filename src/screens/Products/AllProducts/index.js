import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {Searchbar} from 'react-native-paper';
import Products from '../components/AllProduct';
import {useNavigation, useRoute} from '@react-navigation/core';
import {useProductsPagination} from '../../../custom_hooks/shopify_pagination';
import EmptyComponent from '../../Components/EmptyComponent';
import PlaceholderImage from '../../../../assets/emptyProduct.svg';
import {useSelector} from 'react-redux';

const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;

const AllProducts = () => {
  const country = useSelector(state => state?.country?.country);

  const {params} = useRoute();
  const [searchQuery, setSearchQuery] = useState(
    params?.query ? params?.query : '',
  );
  const onChangeSearch = query => setSearchQuery(query);
  // const [isLoading, isRefreshing, products, loadMore, refreshProducts] =
  //   usePaginatorParams(getPaginationData, 'product/', {
  //     page: 1,
  //     cat_uuid: params?.uuid === undefined ? null : params?.uuid,
  //     country: country === '' ? null : country,
  //   });
  // const {products, fetchProducts} = useShopify();
  const [
    isLoading,
    isRefreshing,
    products,
    loadMore,
    refreshProducts,
    fetchData,
  ] = useProductsPagination(
    params?.productType === 'All' ? undefined : params?.productType,
  );
  // const getProducts = async () => {
  //   try {
  //     const data = await getData('product/');
  //     setProducts(data);
  //     console.log(data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // console.log('20Productss20', products[20]);

  useEffect(() => {
    // getProducts();
    // fetchProducts();
  }, []);
  return (
    <View style={styles.mainContainer}>
      <View>
        <Text style={styles.videoTextContainer}>{params?.name}</Text>
      </View>
      <Searchbar
        // icon="search"
        autoFocus
        style={styles.searchInput}
        placeholder="Search Products"
        onChangeText={onChangeSearch}
        value={searchQuery}
        onIconPress={() =>
          searchQuery === '' ? fetchData() : refreshProducts(searchQuery)
        }
        onKeyPress={() =>
          searchQuery === '' ? fetchData() : refreshProducts(searchQuery)
        }
      />

      {/* <Button  color="#66cc33" style={styles.buttonView} uppercase={false}>
            View all
          </Button> */}

      {/* <View
         > */}
      <FlatList
        showsVerticalScrollIndicator={false}
        refreshing={isRefreshing}
        // onRefresh={refreshProducts}
        data={products}
        onEndReached={() => loadMore()}
        keyExtractor={(_, index) => `${index}`}
        renderItem={({item}) => <Products key={item?.id} data={item} />}
        ListFooterComponent={() => (
          <FooterLoadingComponent
            loading={isLoading}
            resultLength={products.length}
          />
        )}
        ListEmptyComponent={() =>
          isLoading ? (
            isRefreshing ? null : (
              <View style={styles.activityContainer}>
                <ActivityIndicator color="#66cc33" />
              </View>
            )
          ) : (
            <EmptyComponent
              Svg={PlaceholderImage}
              message={'No product found for this category '}
              messageTitle={'No Product'}
            />
          )
        }
      />

      {/* {example.map(item => (
            <Products key={Math.random() * 100000} />
          ))} */}
      {/* </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  activityContainer: {
    flex: 1,
    height: height * 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageComponent: {
    borderRadius: 15,
    width: width - 40,
    marginRight: 20,

    marginTop: 5,
  },
  sliderContainer: {
    justifyContent: 'center',
    marginRight: 10,
    marginBottom: 30,
    borderRadius: 50,
  },
  mainContainer: {
    backgroundColor: 'white',
    padding: 10,
    flex: 1,
  },
  searchInput: {
    color: '#F5F5F5',
    backgroundColor: '#F5F5F5',
    marginHorizontal: 10,
    borderRadius: 20,
  },
  videoContainer: {
    marginLeft: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  videoTextContainer: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 10,
    marginHorizontal: 10,
  },
  buttonView: {
    fontSize: 22,
  },
});
const FooterLoadingComponent = ({loading, resultLength}) => {
  if (loading && resultLength > 0) {
    return (
      <View style={{paddingVertical: 20, marginBottom: 20}}>
        <ActivityIndicator color={'#66cc3'} />
      </View>
    );
  } else {
    return null;
  }
};
export default AllProducts;
