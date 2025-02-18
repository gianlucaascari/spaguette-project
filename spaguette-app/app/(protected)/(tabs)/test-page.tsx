import { View, Text } from "react-native";
import React from "react";
import Button from "@/components/general/Button";
import { database } from "@/services/local-storage/database";
import Post from "@/services/local-storage/model/Post";

const TestPage = () => {
  const onWrite = async () => {
    try {
      await database.write(async () => {
        await database.get<Post>("posts").create((post: Post) => {
          post.name = "Lore puzza";
        });
      });
      alert("Post created");
    } catch (error) {
      console.log(error);
      alert("Errore: " + error);
    }
  };

  const onRead = async () => {
    try {
        const posts = await database.get<Post>("posts").query().fetch();
        const postsData = posts.map(post => post._raw);
        alert(JSON.stringify(postsData, null, 2));
    } catch (error) {
        alert("Errore: " + error);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Button text="write" style="primary" onPress={onWrite} />
      <Text></Text>
      <Button text="read" style="primary" onPress={onRead} />
    </View>
  );
};

export default TestPage;
