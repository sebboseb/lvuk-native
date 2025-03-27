import { StyleSheet, FlatList, Text, TextInput, View} from 'react-native';
import React, { useEffect, useState } from 'react';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { IconSymbol } from '@/components/ui/IconSymbol';

export default function TabTwoScreen() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  });

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => {
        const filtered = data.filter((user) =>
          user.name.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredUsers(filtered);
      });
  }, [query]); 

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <IconSymbol
          size={310}
          color="#808080"
          name="brain.head.profile.fill"
          style={styles.headerImage}
        />
      }>
       <View style={styles.container}>
        <TextInput
          style={styles.input}
          value={query}
          onChangeText={setQuery}
          placeholder="Search users..."
        />
        </View>
        <FlatList
          data={filteredUsers}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => <Text style={styles.user}>{item.name}</Text>}
        />
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  container: {
    flexDirection: 'row',
    gap: 8,
  },
});
