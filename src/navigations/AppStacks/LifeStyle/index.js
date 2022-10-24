import React, {useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  View,
  Modal,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  Pressable,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import LifeStyle from '../../../screens/LifeStyle';
import Recipes from '../../../screens/LifeStyle/Recipes';
import AllCommentShown from '../../../screens/LifeStyle/Recipes/components/AllComments';
import Filter from '../../../../assets/Filter';
import FilterModal from '../../../screens/LifeStyle/Recipes/components/FilterModal';
import ProgressModal from '../../../screens/Home/components/ProgressModal';

const Stack = createNativeStackNavigator();
const width = Dimensions.get('window').width;
const LifestyleScreen = () => {
  const {navigate} = useNavigation();

  const [showModal, setShowModal] = useState(false);
  console.log(showModal, 'hhh575889');

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="LifeStyle"
        component={LifeStyle}
        options={{
          title: '',
          //   headerShown: false,
          headerLeft: () => {
            return (
              <View
                style={{
                  marginLeft: width * 0.33,
                }}>
                <TouchableOpacity onPress={() => navigate('Home')}>
                  <Image
                    height={40}
                    width={60}
                    style={{height: 35, width: 100, marginBottom: 0}}
                    source={require('../../../../assets/nosugarTextGreen.png')}
                  />
                </TouchableOpacity>
              </View>
            );
          },
          // headerRight() {

          //   return (
          //     <View>
          //       <TouchableOpacity onPress={()=>setShowModal(true)}>
          //         <Filter />
          //       </TouchableOpacity>
          //       {showModal && (
          //         <FilterModal
          //           isVisible={showModal}
          //           onClose={() => setShowModal(false)}
          //         />
          //       )}
          //     </View>
          //   );
          // },
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="Recipes"
        component={Recipes}
        options={{
          title: 'Recipe',
          // headerShown: false,

          headerTitleAlign: 'center',
        }}
      />
      {/* <Stack.Screen
        name="Single Comment"
        component={SingleComment}
        options={{
          title: 'All Comments',
          // headerShown: false,

          headerTitleAlign: 'center',
        }}
      /> */}
      <Stack.Screen
        name="All Comments"
        component={AllCommentShown}
        options={{
          title: 'All Comments',
          // headerShown: false,

          headerTitleAlign: 'center',
        }}
      />
    </Stack.Navigator>
  );
};

export default LifestyleScreen;
