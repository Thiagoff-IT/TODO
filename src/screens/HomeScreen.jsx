import React from 'react';
import { View, Text, Button } from 'react-native';

function HomeScreen({navigation}) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button 
        title='Vai para TodoList' 
        onPress={() => navigation.navigate('TodoApp')}
      />

    </View>
  );
}

export default HomeScreen;