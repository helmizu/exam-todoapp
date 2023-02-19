/* eslint-disable react-native/no-inline-styles */
import {SafeAreaView, Text, View} from 'react-native';
import React from 'react';
import InputBase from '../components/InputBase';
import {storeData} from '../utils/storage';
import Button from '../components/Button';

const InitializeScreen = ({navigation}: {navigation: any}) => {
  const [name, setName] = React.useState<string>('');
  const onSubmit = () => {
    storeData('user', {name});
    navigation.replace('Home');
  };
  return (
    <SafeAreaView
      style={{flexGrow: 1, justifyContent: 'center', alignItems: 'center'}}>
      <View
        style={{
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 16,
          padding: 16,
        }}>
        <Text
          style={{
            fontSize: 24,
            fontWeight: '600',
            color: '#363942',
          }}>
          Welcome, Tell us ur name!
        </Text>
        <InputBase placeholder="John Doe" autoFocus onChangeText={setName} />
        <Button onPress={onSubmit}>Lets start the app!</Button>
      </View>
    </SafeAreaView>
  );
};

export default InitializeScreen;
