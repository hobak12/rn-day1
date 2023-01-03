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
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

export default function App() {
  const [content, setContent] = useState("");
  const [todos, setTodos] = useState([]);

  const newTodo = {
    id: v4(),
    content,
    isDone: false,
  };

  const handleOnSubmitAddTodo = () => {
    setTodos([...todos, newTodo]);
    setContent("");
  };

  const handleOnPressDeleteTodo = (id) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos([...newTodos]);
  };

  const handleOnPressToggle = (id) => {
    const newTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
    );
    setTodos(newTodos);
  };
  console.log(todos);
  return (
    <View onSubmitEditing={handleOnSubmitAddTodo} style={styles.container}>
      <View style={styles.todoInputWrapper}>
        <TextInput
          style={styles.todoInput}
          onChangeText={setContent}
          value={content}
        />
      </View>
      {todos.map((todo) => {
        return (
          <View key={todo.id} style={styles.todos}>
            <Text style={todo.isDone ? styles.Done : styles.notDone}>
              {todo.content}
            </Text>
            <TouchableOpacity
              onPress={() => handleOnPressToggle(todo.id)}
              style={styles.button}
            >
              <AntDesign name="checksquare" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleOnPressDeleteTodo(todo.id)}
              style={styles.button}
            >
              <AntDesign name="delete" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <Feather name="edit" size={24} color="black" />
            </TouchableOpacity>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  todoInputWrapper: {
    width: "90%",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    marginVertical: 10,
  },
  todoInput: {
    padding: 10,
    height: 50,
    backgroundColor: "aqua",
    borderWidth: 1,
  },
  todos: {
    width: "90%",
    flexDirection: "row",
    backgroundColor: "lightgrey",
    padding: 10,
    justifyContent: "flex-end",
    marginVertical: 5,
  },
  button: {
    marginLeft: 10,
  },
  notDone: {
    maxWidth: 250,
    position: "absolute",
    left: 10,
    top: 10,
  },

  Done: {
    textDecorationLine: "line-through",
    maxWidth: 250,
    position: "absolute",
    left: 10,
    top: 10,
  },
});
