import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Task = ({ task, toggleTask }) => {
  return (
    <TouchableOpacity style={styles.task} onPress={() => toggleTask(task.id)}>
      <Icon
        name={task.completed ? 'check-square-o' : 'square-o'}
        size={20}
        color={task.completed ? '#008000' : '#000'}
      />
      <Text style={[styles.taskText, task.completed && styles.completedTask]}>
        {task.title}
      </Text>
    </TouchableOpacity>
  );
};

const TaskList = ({ tasks, toggleTask }) => {
  return (
    <FlatList
      data={tasks}
      renderItem={({ item }) => <Task task={item} toggleTask={toggleTask} />}
      keyExtractor={item => item.id.toString()}
    />
  );
};

const AddTask = ({ addTask }) => {
  const [text, setText] = useState('');

  const handleTextChange = newText => setText(newText);

  const handleSubmit = () => {
    if (text.trim()) {
      addTask(text.trim());
      setText('');
    }
  };

  return (
    <View style={styles.addTask}>
      <TextInput
        style={styles.input}
        placeholder="Nova tarefa"
        value={text}
        onChangeText={handleTextChange}
        onSubmitEditing={handleSubmit}
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Icon name="plus-square-o" size={20} color="#000" />
      </TouchableOpacity>
    </View>
  );
};

const TodoApp = ({navigation}) => {
  const [tasks, setTasks] = useState([]);

  const toggleTask = id => {
    setTasks(
      tasks.map(task => {
            if (task.id === id) {
      return { ...task, completed: !task.completed };
    } else {
      return task;
    }
  })
);

};

const addTask = title => {
const newTask = {
id: Date.now(),
title,
completed: false,
};
setTasks([...tasks, newTask]);
};

return (
<View style={styles.container}>
<TaskList tasks={tasks} toggleTask={toggleTask} />
<AddTask addTask={addTask} />
</View>
);
};

const styles = StyleSheet.create({
container: {
flex: 1,
backgroundColor: '#fff',
paddingHorizontal: 20,
paddingTop: 40,
},
task: {
flexDirection: 'row',
alignItems: 'center',
paddingVertical: 10,
},
taskText: {
fontSize: 18,
marginLeft: 10,
},
completedTask: {
textDecorationLine: 'line-through',
color: '#888',
},
addTask: {
flexDirection: 'row',
alignItems: 'center',
marginVertical: 20,
},
input: {
flex: 1,
height: 40,
borderWidth: 1,
borderColor: '#ccc',
paddingHorizontal: 10,
},
button: {
marginLeft: 10,
},
});

export default TodoApp;
