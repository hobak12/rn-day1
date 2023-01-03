import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";
import { v4 } from "uuid";

export default function App() {
  const [content, setContent] = useState("");
  const [todos, setTodos] = useState([]);

  const newTodo = {
    id: v4(),
    content,
  };

  console.log(todos);
  const handleOnSubmitAddTodo = () => {
    setTodos([...todos, newTodo]);
  };

  return (
    <View onSubmitEditing={handleOnSubmitAddTodo} style={styles.container}>
      <TextInput
        style={styles.todoInput}
        onChangeText={setContent}
        value={content}
      />
      {todos.map((todo) => {
        return (
          <View key={todo.id}>
            <Text>{todo.content}</Text>
            <Button title="삭제" />
            <TouchableOpacity style={styles.todoEditButton}>
              <Text>수정</Text>
            </TouchableOpacity>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  todoInput: {
    marginTop: 50,
    width: "90%",
    height: 50,
    backgroundColor: "aqua",
  },
  todoEditButton: {
    backgroundColor: "aqua",
  },
});
