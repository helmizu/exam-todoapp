/* eslint-disable react-native/no-inline-styles */
import {View, Text, SafeAreaView, Image, StyleSheet} from 'react-native';
import React from 'react';
import imageUnderMaintenance from '../assets/negative-case-under-maintenance.png';

const ProfileScreen = () => {
  return (
    <SafeAreaView
      style={{flexGrow: 1, alignContent: 'center', alignItems: 'center'}}>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          width: 300,
          alignSelf: 'center',
          padding: 16,
          gap: 8,
        }}>
        <Image
          source={imageUnderMaintenance}
          alt="img-under-maintenance"
          style={{width: 240, height: 240, resizeMode: 'contain'}}
        />
        <Text style={[styles.subtitle1, {textAlign: 'center'}]}>
          Feature in Development!
        </Text>
        <Text style={[styles.body2, {textAlign: 'center', color: '#707070'}]}>
          We are preparing this feature for you.
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingVertical: 32,
    paddingHorizontal: 16,
    gap: 32,
  },
  hStack: {
    flexDirection: 'row',
    gap: 16,
    alignItems: 'center',
  },
  hScroll: {
    marginHorizontal: -16,
  },
  sectionHead: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  avatar: {
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: '#8E96A1',
  },
  headline: {
    fontSize: 24,
    fontWeight: '600',
    color: '#363942',
  },
  title: {
    fontSize: 18,
    fontWeight: '500',
    color: '#363942',
  },
  subtitle1: {
    fontSize: 16,
    fontWeight: '500',
    color: '#363942',
  },
  subtitle2: {
    fontSize: 14,
    fontWeight: '500',
    color: '#363942',
  },
  body1: {
    fontSize: 16,
    color: '#363942',
  },
  body2: {
    fontSize: 14,
    color: '#363942',
  },
  opacity05: {
    opacity: 0.5,
  },
  section: {
    gap: 16,
  },
});
