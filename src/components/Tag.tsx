import {StyleSheet, Text, View} from 'react-native';
import React, {PropsWithChildren} from 'react';

interface IProps {
  active?: boolean;
  style?: Object;
}

const Tag = ({
  active = false,
  children,
  style = {},
}: PropsWithChildren<IProps>) => {
  return (
    <View
      style={[styles.container, active ? styles.activeContainer : {}, style]}>
      <Text style={[styles.text, active ? styles.activeText : {}]}>
        {children}
      </Text>
    </View>
  );
};

export default Tag;

const styles = StyleSheet.create({
  container: {
    height: 36,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#D8D9DB',
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 12,
  },
  activeContainer: {
    backgroundColor: '#F1F1FF',
    borderColor: '#4B7BE5',
  },
  text: {
    fontSize: 14,
    fontWeight: '500',
    color: '#556172',
  },
  activeText: {
    color: '#4B7BE5',
  },
});
