import React, {useEffect, useState} from 'react';
import {ImageBackground, View, Text, StyleSheet, FlatList} from 'react-native';
import {useSelector} from 'react-redux';
import {getData} from '../NetworkRequest';
import RewardsCards from './Card';

export default function Rewards() {
  const [rewardPoints, setRewardsPoints] = useState(null);

  const token = useSelector(state => state?.auth?.token);

  const getDetails = async () => {
    try {
      const data = await getData(token, 'activity_reward_detail/');

      setRewardsPoints(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    // getRewards();
    getDetails();
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.container2}>
        <View>
          <ImageBackground
            source={require('../../../assets/firework.png')}
            style={styles.backgroundImage}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-around'}}>
              <View>
                <Text style={styles.balance}> Balance</Text>
                <Text style={styles.amount}>
                  $ {rewardPoints?.balance || 0.0}
                </Text>
              </View>
              <View style={{marginLeft: -20}}>
                <Text style={styles.balance}> Points</Text>
                <Text style={styles.amount}>{rewardPoints?.points || 0.0}</Text>
              </View>
            </View>
          </ImageBackground>
        </View>
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        // refreshing={isRefreshing}
        // onRefresh={refreshProducts}
        data={rewardPoints?.reward}
        // onEndReached={() => loadMore()}
        keyExtractor={(_, index) => `${index}`}
        renderItem={({item}) => <RewardsCards key={item?.uuid} data={item} />}
        // ListFooterComponent={() => (
        //   <FooterLoadingComponent
        //     loading={isLoading}
        //     resultLength={products.length}
        //   />
        // )}
        // ListEmptyComponent={() =>
        //   isLoading ? (
        //     isRefreshing ? null : (
        //       <View
        //         style={{
        //           flex: 1,
        //           height: height * 0.5,
        //           alignItems: 'center',
        //           justifyContent: 'center',
        //         }}>
        //         <ActivityIndicator color="#66cc33" />
        //       </View>
        //     )
        //   ) : (
        //     <EmptyComponent
        //       Svg={PlaceholderImage}
        //       message={'No product found for this category '}
        //       messageTitle={'No Product'}
        //     />
        //   )
        // }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    flex: 1,
  },
  backgroundImage: {
    width: 340,
    height: 230,
  },
  container2: {
    height: 230,
    alignItems: 'center',
    paddingVertical: 2,
  },
  balance: {
    paddingTop: 70,
    color: 'green',
    textAlign: 'center',
    fontSize: 17,
    fontWeight: 'bold',
  },
  amount: {
    color: '#006400',
    textAlign: 'center',
    fontSize: 36,
    fontWeight: 'bold',
  },
});
