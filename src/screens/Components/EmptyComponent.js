import React from 'react';
import {View, Image, Dimensions} from 'react-native';
import {Text} from 'react-native-paper';
import styled from 'styled-components';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const {height} = Dimensions.get('window');

const Container = styled(View)`
  flex: 1;
  height: ${`${(height - 50) / 2}px`};
  align-items: center;
  justify-content: center;
  margin-top: 50px;
`;

const Message = styled(Text)`
  margin-top: 10px;
  ${'' /* font-weight: bold; */}
  font-size: 17px;
  color: grey;
  text-align: center;
  margin-bottom: 30px;
  /* line-height: 22px; */
`;
const MessageTitle = styled(Text)`
  margin-top: 10px;
  font-weight: bold;
  font-size: 22px;
  color: black;
`;

const EmptyComponent = ({message, Svg, image, messageTitle}) => {
  return (
    <Container>
      {image ? (
        <Image
          resizeMode="stretch"
          style={{width: 200, height: 200}}
          width={300}
          height={230}
          source={image}
        />
      ) : Svg ? (
        <Svg width={300} height={300} />
      ) : (
        <Icon name="file-outline" size={60} color="#81ad29" />
      )}
      <MessageTitle>{messageTitle}</MessageTitle>
      <Message>{message}</Message>
    </Container>
  );
};

export default EmptyComponent;
