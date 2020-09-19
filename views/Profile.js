import React, {useContext, useEffect, useState} from 'react';
import {Image} from 'react-native';
import {AuthContext} from '../contexts/AuthContext';
import PropTypes from 'prop-types';
import AsyncStorage from '@react-native-community/async-storage';
import {getAvatar} from '../hooks/ApiHooks';
import {
  Body,
  Button,
  Card,
  CardItem,
  Container,
  Content,
  Icon,
  Text,
} from 'native-base';

/*
Mahollisesti joku bugi profiilin avauksen kanssa
*/

const mediaUrl = 'http://media.mw.metropolia.fi/wbma/uploads/';

const Profile = ({navigation}) => {
  const {setIsLoggedIn, user} = useContext(AuthContext);
  const [avatar, setAvatar] = useState([{filename: ''}]);

  const fetchAvatar = async () => {
    setAvatar(await getAvatar());
  };

  useEffect(() => {
    fetchAvatar();
  }, []);

  console.log('Profile.js', avatar[0].filename);

  console.log('logged in userdata: ', user);
  const logout = async () => {
    setIsLoggedIn(false);
    await AsyncStorage.clear();
    navigation.navigate('Login');
  };
  return (
    <Container>
      <Content padder>
        {user &&
          <Card style={{height: 600}}>
            <CardItem header bordered>
              <Icon name='person' />
              <Text> {user.username}</Text>
            </CardItem>
            <CardItem cardBody>
              <Image source={{uri: mediaUrl + avatar[0].filename}}
                style={{height: 400, width: null, flex: 1}}
              />
            </CardItem>
            <CardItem>
              <Body>
                <Text>Koko nimi: {user.full_name}</Text>
                <Text>Email: {user.email}</Text>
              </Body>
            </CardItem>
            <CardItem>
              <Body>
                <Button block onPress={logout}>
                  <Text>Log out!</Text>
                </Button>
              </Body>
            </CardItem>
          </Card>
        }
      </Content>
    </Container>
  );
};


Profile.propTypes = {
  navigation: PropTypes.object,
};

export default Profile;
