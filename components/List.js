/* eslint-disable max-len */
import React from 'react';
import {FlatList} from 'react-native';
import Listitem from './Listitem';
import PropTypes from 'prop-types';
import {useLoadMedia} from '../hooks/ApiHooks';


const List = ({navigation}) => {
  const mediaArray = useLoadMedia();

  return (
    <FlatList
      data={mediaArray}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({item}) =>
        <Listitem singleMedia={item} navigation={navigation} />}
    />
  );
};

List.propTypes = {
  navigation: PropTypes.object,
};

export default List;
