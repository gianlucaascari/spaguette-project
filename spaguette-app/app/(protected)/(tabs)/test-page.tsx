import { View } from "react-native";
import React from "react";
import Button from "@/components/general/Button";
import { localStoragePlanService } from "@/services/local-storage/local-storage-plan-service";

const TestPage = () => {

  const onRead = async () => {
    try {
      const list = await localStoragePlanService.getMyList();
      console.log(JSON.stringify(list, null, 2));
    } catch (error) {
        alert("Errore: " + error);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Button text="read" style="primary" onPress={onRead} />
    </View>
  );
};

export default TestPage;
