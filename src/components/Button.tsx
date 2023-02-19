import {TouchableOpacity, StyleSheet, Text, View} from 'react-native';
import React from 'react';

interface IProps {
  variant?: 'outlined' | 'contained';
  onPress?: (e: any) => void;
  disabled?: boolean;
}

const Button = ({
  variant = 'contained',
  onPress,
  children,
  disabled = false,
}: React.PropsWithChildren<IProps>) => {
  return (
    <TouchableOpacity onPress={onPress} disabled={disabled}>
      <View
        style={[styles.button, disabled ? styles.disabled : styles[variant]]}>
        <Text
          style={[
            styles.textButton,
            disabled ? styles.textDisabled : styles[variant],
          ]}>
          {children}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 40,
    paddingVertical: 16,
    borderWidth: 1,
    borderColor: '#4B7BE5',
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contained: {
    backgroundColor: '#4B7BE5',
    color: '#FFF',
  },
  outlined: {
    backgroundColor: '#FFF',
    color: '#4B7BE5',
  },
  textButton: {
    fontSize: 16,
    fontWeight: '500',
  },
  disabled: {
    backgroundColor: '#C9CED0',
    borderColor: '#C9CED0',
  },
  textDisabled: {
    color: '#808C92',
  },
});
