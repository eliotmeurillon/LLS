import { MaterialCommunityIcons } from "@expo/vector-icons";
import { CheckIcon } from "native-base";
import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  Text,
  View,
  RefreshControl,
} from "react-native";

const NotificationsScreen = () => {
  const [refreshing, setRefreshing] = useState(true);
  const [titles, setTitles] = useState([]);

  useEffect(() => {
    loadTitles();
  }, []);

  const loadTitles = () => {
    fetch("http://82.66.75.161/")
      .then((response) => response.text())
      .then((responseText) => {
        const titleRegex = /<title>(.*?)<\/title>/gi;
        const matches = responseText.match(titleRegex);
        const titleList = matches.map((match) =>
          match.replace(/<\/?title>/g, "")
        );
        setRefreshing(false);
        setTitles(titleList);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const ItemView = ({ item }) => {
    return (
      <Text
        style={{
          fontSize: 20,
          padding: 10,
        }}
      >
        {item}
      </Text>
    );
  };

  const ItemSeparatorView = () => {
    return (
      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: "#C8C8C8",
        }}
      />
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, marginTop: 20 }}>
      {refreshing ? <ActivityIndicator /> : null}
      <FlatList
        data={titles}
        keyExtractor={(item, index) => index.toString()}
        ItemSeparatorComponent={ItemSeparatorView}
        enableEmptySections={true}
        renderItem={ItemView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={loadTitles} />
        }
      />
    </SafeAreaView>
  );
};

export default NotificationsScreen;
