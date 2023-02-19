/* eslint-disable react-native/no-inline-styles */
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  ScrollView,
  SafeAreaView,
  Image,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import CardTask from '../components/CardTask';
import {DATA_CATEGORIES} from '../constants/Categories';
import {getData, storeData} from '../utils/storage';
import FormCreateTask from '../components/FormCreateTask';
import imageNoData from '../assets/negative-case-no-data.png';
import imageNotFound from '../assets/negative-case-data-not-found.png';
import dayjs from 'dayjs';
import InputBase from '../components/InputBase';
import Tag from '../components/Tag';
import DetailTask from '../components/DetailTask';

const Tasks = () => {
  const [tasks, setTasks] = useState<any[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('');
  const [search, setSearch] = useState<string>('');
  const [selectedTask, setSelectedTask] = useState<{[key: string]: any} | null>(
    null,
  );

  const taksFilterred = activeCategory
    ? tasks.filter(item => item.category === activeCategory)
    : tasks;
  const tasksToRender = taksFilterred.filter(item =>
    search.trim()
      ? item?.title?.toLowerCase()?.includes(search?.toLowerCase()?.trim())
      : true,
  );

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
    getTask();
  }, []);

  return (
    <SafeAreaView style={{flexGrow: 1}}>
      <View
        style={{
          padding: 16,
          borderBottomWidth: StyleSheet.hairlineWidth,
          borderBottomColor: '#D8D9DB',
        }}>
        <InputBase
          autoCapitalize="none"
          iconStart="search-outline"
          placeholder="Search your task"
          onChangeText={setSearch}
        />
      </View>
      <View style={{paddingHorizontal: 16, marginTop: 16}}>
        <ScrollView
          horizontal
          style={{gap: 8}}
          showsHorizontalScrollIndicator={false}>
          <View style={{gap: 8, flexDirection: 'row'}}>
            {['', ...DATA_CATEGORIES].map((cat, index) => (
              <Pressable
                key={cat + index}
                onPress={() => setActiveCategory(cat)}>
                <Tag active={cat === activeCategory}>{cat || 'All'}</Tag>
              </Pressable>
            ))}
          </View>
        </ScrollView>
      </View>
      {!!search && (
        <View style={{paddingHorizontal: 16, marginTop: 16}}>
          <Text style={{fontSize: 16, fontWeight: '400', color: '#363942'}}>
            Search result of{' '}
            <Text style={{fontStyle: 'italic'}}>“{search}”</Text>
          </Text>
        </View>
      )}
      <FlatList
        style={{backgroundColor: 'transparent', flexGrow: 1, padding: 16}}
        data={tasksToRender}
        renderItem={({item: task}) => (
          <Pressable
            onPress={() => setSelectedTask(task)}
            style={{paddingVertical: 8}}>
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
        )}
        ListEmptyComponent={
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
              source={search ? imageNotFound : imageNoData}
              alt="img-no-data"
              style={{width: 240, height: 240, resizeMode: 'contain'}}
            />
            <Text style={[styles.subtitle1, {textAlign: 'center'}]}>
              {search
                ? `Search ${
                    activeCategory ? activeCategory : 'Tasks'
                  } not Found!`
                : `No ${activeCategory ? activeCategory : 'Tasks'} yet!`}
            </Text>
            <Text
              style={[styles.body2, {textAlign: 'center', color: '#707070'}]}>
              {search
                ? 'The tasks found will be displayed here. Try to change the search keyword!'
                : 'Tasks that have been added will be displayed here.'}
            </Text>
          </View>
        }
        keyExtractor={task => task.id}
      />
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

export default Tasks;

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
