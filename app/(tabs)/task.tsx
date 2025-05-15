import React, { useEffect, useState, useCallback } from 'react';
import {
  StyleSheet,
  FlatList,
  Text,
  TextInput,
  Image,
  View,
  ListRenderItem,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUsers } from '../../store/reducers/userSlice';
import { RootState, AppDispatch } from '../../store';
import { User } from '../../constants/Types';

export default function TabTwoScreen() {
  const dispatch = useDispatch<AppDispatch>();
  const { users, status } = useSelector((state: RootState) => state.users);
  const [query, setQuery] = useState<string>('');

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchUsers());
    }
  }, [dispatch, status]);

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(query.toLowerCase())
  );

  const renderItem: ListRenderItem<User> = useCallback(({ item }) => (
    <Text style={styles.user}>{item.name}</Text>
  ), []);

  const keyExtractor = useCallback((item: User) => item.id.toString(), []);

  return (
    <FlatList
      data={filteredUsers}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      initialNumToRender={10}
      maxToRenderPerBatch={10}
      windowSize={5}
      removeClippedSubviews={true}
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={styles.listContent}
      ListHeaderComponent={
        <>
          <View style={styles.headerImageWrapper}>
            <Image
              source={require('@/assets/images/lv-logo.png')}
              style={styles.reactLogo}
            />
          </View>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              value={query}
              onChangeText={setQuery}
              placeholder="Search users..."
            />
          </View>
        </>
      }
    />
  );
}

const styles = StyleSheet.create({
  listContent: {
    paddingBottom: 20,
  },
  headerImageWrapper: {
    alignItems: 'center',
    paddingVertical: 20,
    height: 180
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
    resizeMode: 'contain'
  },
  inputWrapper: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
  },
  user: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
    fontSize: 16,
  },
});
