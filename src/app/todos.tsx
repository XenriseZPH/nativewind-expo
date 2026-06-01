/* eslint-disable no-underscore-dangle */
import { useMutation, useQuery } from "convex/react";
import { Stack } from "expo-router";
import { Check, Circle, Plus, Trash2 } from "lucide-react-native";
import * as React from "react";
import { FlatList, View } from "react-native";

import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Input } from "@/components/ui/input";
import { Text } from "@/components/ui/text";

import { api } from "../../convex/_generated/api";

export default function Todos() {
  const todos = useQuery(api.todos.queries.list);
  const create = useMutation(api.todos.mutations.create);
  const toggle = useMutation(api.todos.mutations.toggle);
  const remove = useMutation(api.todos.mutations.remove);
  const [text, setText] = React.useState("");
  const [adding, setAdding] = React.useState(false);

  const handleAdd = async () => {
    if (!text.trim()) return;
    setAdding(true);
    await create({ text: text.trim() });
    setText("");
    setAdding(false);
  };

  return (
    <>
      <Stack.Screen options={{ title: "Todos" }} />
      <View className="flex-1 bg-background p-6">
        <View className="mb-6 flex-row items-center gap-3">
          <Input
            placeholder="Add a todo..."
            value={text}
            onChangeText={setText}
            onSubmitEditing={handleAdd}
            className="flex-1"
          />
          <Button onPress={handleAdd} disabled={adding || !text.trim()} size="icon">
            <Icon as={Plus} className="size-4" color="white" />
          </Button>
        </View>
        <FlatList
          data={todos}
          keyExtractor={(item) => item._id}
          contentContainerClassName="gap-3"
          ListEmptyComponent={
            <Text variant="muted" className="pt-8 text-center">
              No todos yet. Add one above!
            </Text>
          }
          renderItem={({ item }) => (
            <View className="flex-row items-center gap-3 rounded-xl border border-border bg-card p-4">
              <Button variant="ghost" size="icon" onPress={() => toggle({ id: item._id })}>
                <Icon
                  as={item.completed ? Check : Circle}
                  className={item.completed ? "text-green-500" : "text-muted-foreground"}
                  size={20}
                />
              </Button>
              <Text
                className={`flex-1 ${item.completed ? "text-muted-foreground line-through" : ""}`}
              >
                {item.text}
              </Text>
              <Button variant="ghost" size="icon" onPress={() => remove({ id: item._id })}>
                <Icon as={Trash2} className="text-destructive" size={18} />
              </Button>
            </View>
          )}
        />
      </View>
    </>
  );
}
