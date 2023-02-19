import {Text as RNText, TextProps} from 'react-native';
import React from 'react';

// set text custom and variant there
const Text = (props: TextProps) => {
  return <RNText {...props} />;
};

export default Text;
