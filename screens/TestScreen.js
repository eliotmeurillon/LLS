import React, { useState, useEffect } from "react";
import { View, Text, FlatList, Box, Image, Button } from "native-base";
import { ActivityIndicator, RefreshControl, SafeAreaView } from "react-native";

function TestScreen({ navigation }) {
  const [refreshing, setRefreshing] = useState(true);
  const [userData, setUserData] = useState([]);
  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = () => {
    fetch("http://82.66.75.161/")
      .then((response) => response.json())
      .then((json) => {
        setRefreshing(false);
        setUserData(json.rss.channel.item);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const ItemView = ({ item }) => {
    return (
      <Text>
        {typeof item.title === "object" ? item.title["#text"] : item.title}
      </Text>
    );
  };

  async function handleItemClick(item) {
    const response = await fetch(`/lois/${item["dc:identifier"]}`);
    const data = await response.json();
    navigation.navigate("Article", {
      itemId: item["dc:identifier"],
      summary: data.summary,
    });
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {refreshing ? <ActivityIndicator /> : null}
      <FlatList
        data={userData}
        renderItem={({ item }) => (
          <View>
            <Box bg="gray.300" rounded="lg" my={1}>
              <Image
                source={{
                  uri: "https://picsum.photos/200/300?random=1",
                }}
                alt="Alternate Text"
                size="xl"
              />
              <Text fontSize="xs">{item["dc:subject"]}</Text>
              <Text>
                {typeof item.title === "object"
                  ? item.title["#text"]
                  : item.title}
              </Text>
              <Text fontSize="md">{item["dc:description"]}</Text>
              {/* make a button to open ArticleScreen.js with the item["dc:identifier"] as the itemId */}
              <Button
                onPress={() => {
                  fetch(`http://82.66.75.161/lois/${item["dc:identifier"]}`)
                    .then((response) => response.json())
                    .then((data) => {
                      console.log(data);
                      navigation.navigate("Article", {
                        itemId: item["dc:identifier"],
                        resume: data,
                      });
                    })
                    .catch((error) => console.error(error));
                }}
              >
                Voir le text complet
              </Button>
            </Box>
          </View>
        )}
        keyExtractor={(item) => item["dc:identifier"]}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={loadUserData} />
        }
      />
    </SafeAreaView>
  );
}

export default TestScreen;
