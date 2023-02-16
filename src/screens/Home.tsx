/* eslint-disable react-native/no-inline-styles */
import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  Pressable,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import CardCategory from '../components/CardCategory';
import CardTask from '../components/CardTask';
import InputBase from '../components/InputBase';
import BottomSheet from '../components/BottomSheet';
import Button from '../components/Button';
import Select from '../components/Select';
import {DATA_CATEGORIES} from '../Constants/Categories';
import DatePicker from '../components/DatePicker';
import TimePicker from '../components/TimePicker';

const Home = () => {
  const [openModalTask, setOpenModalTask] = useState<boolean>(false);
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.hStack}>
            <View style={styles.avatar} />
            <View>
              <Text style={styles.headline}>Hello, [Name]</Text>
            </View>
          </View>
          <View style={{gap: 16}}>
            <View style={styles.sectionHead}>
              <Text style={styles.title}>Categories</Text>
              <Pressable>
                <Text style={[styles.body1, styles.opacity05]}>View All</Text>
              </Pressable>
            </View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.hScroll}>
              <View style={[styles.hStack, {paddingHorizontal: 16}]}>
                <CardCategory
                  index={0}
                  name="Work Assignment"
                  total={4}
                  done={3}
                />
                <CardCategory
                  index={1}
                  name="Daily Activity"
                  total={3}
                  done={3}
                />
                <CardCategory index={2} name="School Task" total={5} done={2} />
              </View>
            </ScrollView>
          </View>
          <View style={{gap: 16}}>
            <View style={styles.sectionHead}>
              <Text style={styles.title}>My Task (4)</Text>
              <Pressable onPress={() => setOpenModalTask(true)}>
                <Text style={[styles.body1, styles.opacity05]}>View All</Text>
              </Pressable>
            </View>
            <View style={{gap: 16}}>
              <CardTask
                title="Judul Aktivitas"
                category="Category"
                date="Sabtu, 22 Feb 2023"
                startTime="08:00"
                endTime="10:00"
                status="On Progress"
              />
              <CardTask
                title="Judul Aktivitas"
                category="Category"
                date="Sabtu, 22 Feb 2023"
                startTime="08:00"
                endTime="10:00"
                status="On Progress"
              />
              <CardTask
                title="Judul Aktivitas"
                category="Category"
                date="Sabtu, 22 Feb 2023"
                startTime="08:00"
                endTime="10:00"
                status="On Progress"
              />
            </View>
          </View>
          <View>
            <BottomSheet
              title="New Task"
              open={openModalTask}
              onClose={() => setOpenModalTask(false)}>
              <View style={{gap: 24}}>
                <InputBase label="Title" placeholder="Buy some stuff" />
                <DatePicker label="Date" placeholder="dddd, DD MMM YYYY" />
                <View style={{flexDirection: 'row', gap: 24}}>
                  <View style={{flex: 1}}>
                    <TimePicker label="Start" placeholder="HH:mm" />
                  </View>
                  <View style={{flex: 1}}>
                    <TimePicker label="End" placeholder="HH:mm" />
                  </View>
                </View>
                <InputBase
                  label="Description"
                  placeholder="Apple 1kg, ..."
                  multiline
                  numberOfLines={3}
                  scrollEnabled
                  style={{minHeight: 64}}
                />
                <Select
                  label="Category"
                  placeholder="Daily Activity"
                  onChangeText={console.log}
                  options={DATA_CATEGORIES}
                />
                <Button>Create a new task</Button>
              </View>
            </BottomSheet>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

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
});
