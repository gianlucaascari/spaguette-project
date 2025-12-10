import React, { useContext, useEffect } from "react";
import { Box } from "@/components/ui/box";
import { useDataService } from "@/services/data/data-service";
import { DataContext } from "@/services/data/DataContext";
import ListItem from "@/components/plan/show-list/ListItem";
import { Heading } from "@/components/ui/heading";
import { ScrollView } from "react-native";

const list = () => {
  const { state } = useContext(DataContext);
  const { getMyList } = useDataService();

  useEffect(() => {
    getMyList();
  }, []);

  return (
    <Box className="bg-background-0 flex-1 items-center p-4">
      <ScrollView className="w-full max-w-xl">
        <Heading size="xl">List</Heading>
        {state.list.items.map((item) => (
          <ListItem item={item} />
        ))}
      </ScrollView>
    </Box>
  );
};

export default list;
