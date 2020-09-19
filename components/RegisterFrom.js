import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import {AuthContext} from '../contexts/AuthContext';
import AsyncStorage from '@react-native-community/async-storage';
// import {postLogIn} from '../hooks/ApiHooks';
import FormTextInput from './FormTextInput';
import useSignUpForm from '../hooks/RegisterHooks';
import {postRegistration, postLogIn} from '../hooks/ApiHooks';
import {Button, Form, Text} from 'native-base';


const RegisterForm = ({navigation}) => {
  const {setUser, setIsLoggedIn} = useContext(AuthContext);

  const doRegister = async () => {
    try {
      const result = await postRegistration(inputs);
      console.log('new user createed:', result);
      const userData = await postLogIn(inputs);
      setIsLoggedIn(true);
      setUser(userData);
      await AsyncStorage.setItem('userToken', userData.token);
    } catch (e) {
      console.log('registeration error:', e.message);
    }
  };

  const {inputs, handleInputChange} = useSignUpForm();

  return (
    <Form>
      <FormTextInput
        autoCapitalize="none"
        placeholder="username"
        onChangeText={(txt) => handleInputChange('username', txt)}
      />
      <FormTextInput
        autoCapitalize="none"
        placeholder="password"
        onChangeText={(txt) => handleInputChange('password', txt)}
        secureTextEntry={true}
      />
      <FormTextInput
        autoCapitalize="none"
        placeholder="email"
        onChangeText={(txt) => handleInputChange('email', txt)}
      />
      <FormTextInput
        autoCapitalize="none"
        placeholder="full name"
        onChangeText={(txt) => handleInputChange('full_name', txt)}
      />
      <Button block onPress={doRegister}>
        <Text>Register</Text>
      </Button>
    </Form>
  );
};

RegisterForm.propTypes = {
  navigation: PropTypes.object,
};

export default RegisterForm;
