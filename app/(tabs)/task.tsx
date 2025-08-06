import { StyleSheet, FlatList, Text, TextInput, View } from "react-native";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { useDebounced } from "@/hooks/useDebounce";

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
}

export default function TabTwoScreen() {
  const [users, setUsers] = useState<User[]>([]);
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounced(query, 200);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = useCallback(() => {
    let cancelled = false;
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data: User[]) => {
        if (!cancelled) setUsers(data);
      })
      .catch((e) => {
        if (!cancelled)
          setError(e instanceof Error ? e.message : "Failed to fetch users");
      });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const cleanup = fetchUsers();
    return cleanup;
  }, [fetchUsers]);

  const filtered = useMemo(() => {
    const q = debouncedQuery.trim().toLowerCase();
    if (!q) return users;
    return users.filter((u) => u.name.toLowerCase().includes(q));
  }, [users, debouncedQuery]);

  const hasResults = error === null && filtered.length > 0;

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
      headerImage={
        <IconSymbol
          size={310}
          color="#808080"
          name="brain.head.profile.fill"
          style={styles.headerImage}
        />
      }
    >
      <View>
        <TextInput
          style={styles.input}
          value={query}
          onChangeText={setQuery}
          placeholder="Search users..."
          placeholderTextColor="#999"
          clearButtonMode="while-editing"
          autoCapitalize="none"
          autoCorrect={false}
        />
      </View>

      {error && (
        <View style={styles.stateContainer}>
          <Text style={styles.errorText}>
            Error: Unable to load users.{"\n"}Please try again.
          </Text>
        </View>
      )}

      {!error && !hasResults && (
        <View style={styles.stateContainer}>
          <Text style={styles.stateText}>
            {debouncedQuery
              ? `No users found for "${debouncedQuery}".`
              : "No users available."}
          </Text>
        </View>
      )}

      {hasResults && (
        <>
          <View style={styles.resultsHeader}>
            <Text style={styles.resultsCount}>
              Showing {filtered.length} user
              {filtered.length !== 1 ? "s" : ""}
              {debouncedQuery ? ` for "${debouncedQuery}"` : ""}
            </Text>
          </View>
          <View style={styles.listContent}>
            {filtered.map((item) => (
              <View style={styles.userCard} key={item.id}>
                <Text style={styles.userName}>{item.name}</Text>
                <Text style={styles.userEmail}>{item.email}</Text>
                <Text style={styles.userUsername}>@{item.username}</Text>
              </View>
            ))}
          </View>
        </>
      )}
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  container: {
    flexDirection: "row",
    gap: 8,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 25,
    paddingHorizontal: 20,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  resultsHeader: {
    paddingTop: 8,
  },
  resultsCount: {
    fontSize: 14,
    color: "#666",
    fontWeight: "500",
  },
  listContent: {
    paddingBottom: 24,
  },
  stateContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  stateText: {
    marginTop: 12,
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },
  errorText: {
    marginTop: 12,
    fontSize: 16,
    color: "#FF3B30",
    textAlign: "center",
    fontWeight: "600",
  },
  userCard: {
    backgroundColor: "#FFFFFF",
    padding: 18,
    marginVertical: 6,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  userName: { fontSize: 18, fontWeight: "700", color: "#333", marginBottom: 4 },
  userEmail: { fontSize: 14, color: "#555", marginBottom: 2 },
  userUsername: {
    fontSize: 14,
    color: "#007AFF",
    fontStyle: "italic",
    marginTop: 4,
  },
});
