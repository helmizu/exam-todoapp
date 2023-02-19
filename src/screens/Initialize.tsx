/* eslint-disable react-native/no-inline-styles */
import {SafeAreaView, View} from 'react-native';
import React from 'react';
import InputBase from '../components/InputBase';
import {storeData} from '../utils/storage';
import Button from '../components/Button';
import Text from '../components/Text';

const InitializeScreen = ({navigation}: {navigation: any}) => {
  const [name, setName] = React.useState<string>('');
  const onSubmit = () => {
    storeData('user', {name});
    navigation.replace('HomeStack');
  };
  return (
    <SafeAreaView
      style={{flexGrow: 1, justifyContent: 'center', alignItems: 'center'}}>
      <View
        style={{
          width: '100%',
          gap: 16,
          paddingHorizontal: 16,
          paddingBottom: 32,
        }}>
        <Text
          style={{
            fontSize: 24,
            fontWeight: '600',
            color: '#363942',
            textAlign: 'center',
            lineHeight: 32,
            verticalAlign: 'middle',
          }}>
          Welcome,{'\n'}Tell us ur name!
        </Text>
        <InputBase placeholder="John Doe" autoFocus onChangeText={setName} />
        <Button onPress={onSubmit}>Lets start the app!</Button>
      </View>
    </SafeAreaView>
  );
};

export default InitializeScreen;
