import { View } from "react-native";
import React, { useContext } from "react";
import Button from "@/components/general/Button";
import { localStoragePlanService } from "@/services/local-storage/local-storage-plan-service";
import localStorageCatalogueService from "@/services/local-storage/local-storage-catalogue-service";
import { DataContext } from "@/services/data/DataContext";

const TestPage = () => {

  const { state } = useContext(DataContext);

  const onRead = async () => {
    try {
      // const list = await localStoragePlanService.getMyList();
      const list = await localStoragePlanService.getMyList();
      console.log(JSON.stringify(list, null, 2));
    } catch (error) {
        alert("Errore: " + error);
    }
  };

  const onWrite = async () => {
    try {
      await localStorageCatalogueService.addIngredient(state.ingredients[0])
      alert("Ingredient added");
    } catch (error) {
        alert("Errore: " + error);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Button text="write" style="primary" onPress={onWrite} />
      <Button text="read" style="primary" onPress={onRead} />
    </View>
  );
};

export default TestPage;
