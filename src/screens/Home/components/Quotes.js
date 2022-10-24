import React from 'react';
import {View, Text, Dimensions, Image, StyleSheet} from 'react-native';
import {Card} from 'react-native-paper';
import styled from 'styled-components';

const width = Dimensions.get('screen').width;

const Quotes = ({color, quote}) => {
  return (
    <StyledCard key={color} color={color}>
      <View style={styles.quotesContainer}>
        <Image
          source={require('../../../../assets/quotes.png')}
          style={styles.buttonContainer}
        />
        <Text style={styles.textContainer}>{quote}</Text>
      </View>
    </StyledCard>
  );
};

const styles = StyleSheet.create({
  quotesContainer: {
    // marginHorizontal: 10,
    // justifyContent: 'flex-start',
    alignItems: 'flex-start',
    // maxWidth: '80%',
  },
  buttonContainer: {
    // height: 60,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    margin: 20,
  },
  textContainer: {
    marginHorizontal: 15,
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
});
const StyledCard = styled(Card)`
  background-color: ${props => props.color};
  align-self: center;

  width: ${() => `${width * 0.75}px`};
  height: 150px;
  margin: 10px;

  border-radius: 20px;
  border-color: #e9f0ea;
  border-width: 1px;
`;

export default Quotes;
