import React, {useContext, useEffect} from 'react';
import PropTypes from 'prop-types';
import {AuthContext} from '../contexts/AuthContext';
import AsyncStorage from '@react-native-community/async-storage';
import {checkToken} from '../hooks/ApiHooks';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterFrom';
import {Container, Content, Icon, Title} from 'native-base';

const Login = ({navigation}) => {
  const {setIsLoggedIn, setUser} = useContext(AuthContext);
  // console.log('login', isLoggedIn);

  const getToken = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
    console.log('token', userToken);
    if (userToken) {
      try {
        const userData = await checkToken(userToken);
        console.log('token valid', userData);
        setIsLoggedIn(true);
        setUser(userData);
      } catch (e) {
        console.log('token check failed', e.message);
      }
      // navigation.navigate('Home');
    }
  };
  useEffect(() => {
    getToken();
  }, []);

  return (
    <Container>
      <Content padder>
        <Title>
          <Icon name='person' style={{fontSize: 200}} />
        </Title>
        <LoginForm navigation={navigation} />
        <RegisterForm navigation={navigation} />
      </Content>
    </Container>
  );
};

Login.propTypes = {
  navigation: PropTypes.object,
};

export default Login;
