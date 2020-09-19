import React from 'react';
import PropTypes from 'prop-types';
import {Input, Item} from 'native-base';

const FormTextInput = ({style, ...otherProps}) => {
  return (
    <Item>
      <Input
        {...otherProps}
      />
    </Item>
  );
};

FormTextInput.propTypes = {
  style: PropTypes.object,
};

export default FormTextInput;
