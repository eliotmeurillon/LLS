import React, { useState, useEffect } from "react";
import { View, Text, FlatList, Box, Image, Button } from "native-base";

function ArticleScreen({ navigation, route }) {
  const { itemId, resume } = route.params;
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Details Screen</Text>
      <Text>itemId: {JSON.stringify(itemId)}</Text>
      <Text>resume: {JSON.stringify(resume)}</Text>
    </View>
  );
}

export default ArticleScreen;
