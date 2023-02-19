/* eslint-disable react-native/no-inline-styles */
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  ScrollView,
  SafeAreaView,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import CardCategory from '../components/CardCategory';
import CardTask from '../components/CardTask';
import {DATA_CATEGORIES} from '../constant/Categories';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {getData, storeData} from '../utils/storage';
import FormCreateTask from '../components/FormCreateTask';
import imageNoData from '../assets/negative-case-no-data.png';
import dayjs from 'dayjs';
import DetailTask from '../components/DetailTask';

const Home = ({navigation}: {navigation: BottomTabNavigationProp<any>}) => {
  const [user, setUser] = useState<{name: string} | null>(null);
  const [tasks, setTasks] = useState<any[]>([]);
  const [selectedTask, setSelectedTask] = useState<{[key: string]: any} | null>(
    null,
  );
  const dailyTasks = tasks.filter(item => item.category === DATA_CATEGORIES[0]);
  const workTasks = tasks.filter(item => item.category === DATA_CATEGORIES[1]);
  const schoolTasks = tasks.filter(
    item => item.category === DATA_CATEGORIES[2],
  );
  const mapCategories = {
    [DATA_CATEGORIES[0]]: dailyTasks,
    [DATA_CATEGORIES[1]]: workTasks,
    [DATA_CATEGORIES[2]]: schoolTasks,
  };

  const loadUser = async () => {
    const data = await getData('user');
    setUser(data);
  };

  const getTask = async () => {
    const data = await getData('tasks');
    if (data) {
      setTasks(data);
    } else {
      setTasks([]);
    }
  };

  const onSaveTasks = async (data: any) => {
    if (data.id) {
      const indexToUpdate = tasks.findIndex(item => item.id === data.id);
      const copyOfTasks = [...tasks];
      copyOfTasks[indexToUpdate] = data;
      setTasks([...copyOfTasks]);
      storeData('tasks', [...copyOfTasks]);
    } else {
      const dataWithId = {
        ...data,
        id: tasks.length
          ? tasks.sort((a, b) => a.id - b.id)[tasks.length - 1].id + 1
          : 1,
      };
      setTasks(prev => [dataWithId, ...prev]);
      storeData('tasks', [dataWithId, ...tasks]);
    }
  };

  useEffect(() => {
    loadUser();
    getTask();
  }, []);

  return (
    <SafeAreaView style={{flexGrow: 1}}>
      <ScrollView style={{flexGrow: 1}}>
        <View style={styles.container}>
          <View style={styles.hStack}>
            <View style={styles.avatar} />
            <View>
              <Text style={styles.headline}>Hello, {user?.name}</Text>
            </View>
          </View>
          <View style={styles.section}>
            <View style={styles.sectionHead}>
              <Text style={styles.title}>Categories</Text>
              {/* <Pressable>
                <Text style={[styles.body1, styles.opacity05]}>View All</Text>
              </Pressable> */}
            </View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.hScroll}>
              <View style={[styles.hStack, {paddingHorizontal: 16}]}>
                {DATA_CATEGORIES.map((cat, index) => (
                  <CardCategory
                    index={index}
                    name={cat}
                    total={mapCategories[cat].length}
                    done={
                      mapCategories[cat].filter(
                        item => item.status !== 'On Progress',
                      ).length
                    }
                    key={cat}
                  />
                ))}
              </View>
            </ScrollView>
          </View>
          <View style={styles.section}>
            <View style={styles.sectionHead}>
              <Text style={styles.title}>My Task ({tasks.length})</Text>
              {tasks.length > 3 && (
                <Pressable onPress={() => navigation.navigate('Tasks')}>
                  <Text style={[styles.body1, styles.opacity05]}>View All</Text>
                </Pressable>
              )}
            </View>
            <View style={{gap: 16}}>
              {tasks.slice(0, 3).map(task => (
                <Pressable onPress={() => setSelectedTask(task)} key={task.id}>
                  <CardTask
                    key={task.id}
                    title={task.title}
                    category={task.category}
                    date={dayjs(task.date).format('dddd, DD MMM YYYY')}
                    startTime={dayjs(task.startTime).format('HH:mm')}
                    endTime={dayjs(task.endTime).format('HH:mm')}
                    status={task.status}
                  />
                </Pressable>
              ))}
              {!tasks.length && (
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
                    source={imageNoData}
                    alt="img-no-data"
                    style={{width: 240, height: 240, resizeMode: 'contain'}}
                  />
                  <Text style={[styles.subtitle1, {textAlign: 'center'}]}>
                    No Tasks yet!
                  </Text>
                  <Text
                    style={[
                      styles.body2,
                      {textAlign: 'center', color: '#707070'},
                    ]}>
                    Tasks that have been added will be displayed here.
                  </Text>
                </View>
              )}
            </View>
          </View>
        </View>
      </ScrollView>
      <FormCreateTask onSubmit={onSaveTasks} />
      <DetailTask
        data={selectedTask}
        open={!!selectedTask}
        onClose={() => setSelectedTask(null)}
        onUpdate={onSaveTasks}
      />
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
  section: {
    gap: 16,
  },
});
