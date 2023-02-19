import {StyleSheet, TextInput, TextInputProps, View} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Text from './Text';

interface IProps extends TextInputProps {
  label?: string;
  iconEnd?: string;
  iconStart?: string;
  error?: string;
}

const InputBase = ({
  label = '',
  iconEnd = '',
  iconStart = '',
  error = '',
  ...props
}: IProps) => {
  return (
    <View style={styles.container}>
      {!!label && <Text style={styles.label}>{label}</Text>}
      <View style={styles.containerInput}>
        {!!iconStart && <Ionicons name={iconStart} color="#556172" size={24} />}
        <TextInput
          {...props}
          style={[
            props.style,
            styles.input,
            props.multiline ? styles.inputMultiline : {},
          ].flat()}
          underlineColorAndroid="transparent"
          placeholderTextColor="#B1B6BD"
          autoCorrect={false}
        />
        {!!iconEnd && <Ionicons name={iconEnd} color="#556172" size={24} />}
      </View>
      {!!error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

export default InputBase;

const styles = StyleSheet.create({
  container: {width: '100%'},
  label: {fontSize: 16, marginBottom: 8, color: '#556172'},
  input: {
    fontSize: 16,
    minHeight: 24,
    color: '#707070',
    flex: 1,
    paddingVertical: 0,
  },
  containerInput: {
    padding: 16,
    borderWidth: 1,
    borderRadius: 12,
    borderColor: '#D8D9DB',
    gap: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  error: {fontSize: 14, marginTop: 4, color: '#ff2131'},
  inputMultiline: {textAlignVertical: 'top'},
});
