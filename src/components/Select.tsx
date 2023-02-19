/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, TextInput, TextInputProps, View} from 'react-native';
import React from 'react';
import SelectDropdown from 'react-native-select-dropdown';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Text from './Text';

interface IProps extends TextInputProps {
  label?: string;
  options?: string[];
  error?: string;
}

const Select = ({
  label = '',
  options = [],
  error = '',
  value,
  ...props
}: IProps) => {
  return (
    <View>
      {!!label && <Text style={styles.label}>{label}</Text>}
      <SelectDropdown
        data={options}
        defaultValue={value}
        onSelect={(selectedItem: string) => props?.onChangeText?.(selectedItem)}
        buttonTextAfterSelection={(selectedItem: string) => selectedItem}
        rowTextForSelection={(item: string) => item}
        onChangeSearchInputText={() => {}}
        buttonStyle={styles.containerInput}
        dropdownStyle={{borderRadius: 12, backgroundColor: '#FFF'}}
        rowTextStyle={styles.input}
        selectedRowStyle={{backgroundColor: '#F5F8FF'}}
        selectedRowTextStyle={{color: '#4B7BE5'}}
        renderCustomizedButtonChild={(selectedItem: string) => (
          <TextInput
            {...props}
            editable={false}
            style={[props.style, styles.input].flat()}
            value={selectedItem}
            underlineColorAndroid="transparent"
          />
        )}
        renderDropdownIcon={() => (
          <Ionicons name="chevron-down-outline" color="#556172" size={24} />
        )}
      />
      {!!error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

export default Select;

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#556172',
  },
  input: {
    fontSize: 16,
    minHeight: 24,
    color: '#707070',
    paddingVertical: 0,
  },
  containerInput: {
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 16,
    paddingRight: 16,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderRadius: 12,
    borderColor: '#D8D9DB',
    gap: 8,
    alignItems: 'center',
    width: '100%',
    height: undefined,
    backgroundColor: 'transparent',
  },
  error: {fontSize: 14, marginTop: 4, color: '#ff2131'},
});
