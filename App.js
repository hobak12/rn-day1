import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { useState, useRef, useEffect } from "react";
import { v4 } from "uuid";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
  const [content, setContent] = useState("");
  const [todos, setTodos] = useState([]);
  const [category, setCategory] = useState("");
  const [editContent, setEditContent] = useState("");

  const newTodo = {
    id: v4(),
    content,
    isDone: false,
    isEdit: false,
    category,
  };

  const AddTodo = () => {
    setTodos([...todos, newTodo]);
    setContent("");
  };

  const deleteTodo = (id) => {
    Alert.alert(
      "삭제",
      "정말로 삭제하시겠습니까?",
      [
        { text: "취소", onPress: () => {} },
        {
          text: "삭제",
          onPress: () => {
            const newTodos = todos.filter((todo) => todo.id !== id);
            setTodos([...newTodos]);
          },
        },
      ],
      {
        cancelable: true,
        onDismiss: () => {},
      }
    );
  };

  const toggleIsDone = (id) => {
    const newTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
    );
    setTodos(newTodos);
  };

  const editTodo = (id) => {
    const newTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, content: editContent, isEdit: false } : todo
    );

    setTodos(newTodos);
    setEditContent("");
  };

  const toggleIsEdit = (id) => {
    const newTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, isEdit: !todo.isEdit } : todo
    );
    setTodos(newTodos);
  };

  const saveCat = async (cat) => {
    setCategory(cat);
    await AsyncStorage.setItem("category", cat);
  };

  // 처음 렌더링 되자마자는 실행이 안되게 하기
  // todos.length 0 일 때 === 빈 배열일 때 실행 안되게 조건 넣기
  // 튜터님은 조건문 하고 중괄호 없이 바로 실행할 내용 넣음
  useEffect(() => {
    //현재의 최신  todos를 AsyncStorage에 저장
    const saveTodos = async () => {
      await AsyncStorage.setItem("todos", JSON.stringify(todos));
      //자바스크립트 값을 JSON 문자열로 변환히고 배열을 저장
    };

    if (todos.length > 0) saveTodos();
  }, [todos]);

  useEffect(() => {
    const getData = async () => {
      const resp_todos = await AsyncStorage.getItem("todos"); // todos 배열
      const resp_cat = await AsyncStorage.getItem("category");
      setTodos(JSON.parse(resp_todos));
      setCategory(resp_cat);
    };
    getData();
  }, []);

  return (
    <View style={styles.container}>
      <View
        style={{
          width: "90%",
          justifyContent: "space-between",
          flexDirection: "row",
        }}
      >
        <TouchableOpacity
          onPress={() => {
            saveCat("JS");
          }}
          style={{
            ...styles.categoryButton,
            backgroundColor: category === "JS" ? "lightblue" : "lightgrey",
          }}
        >
          <Text>Javascript</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            saveCat("RT");
          }}
          style={{
            ...styles.categoryButton,
            backgroundColor: category === "RT" ? "lightblue" : "lightgrey",
          }}
        >
          <Text>React</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            saveCat("CT");
          }}
          style={{
            ...styles.categoryButton,
            backgroundColor: category === "CT" ? "lightblue" : "lightgrey",
          }}
        >
          <Text>Coding Test</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.todoInputWrapper}>
        <TextInput
          onSubmitEditing={AddTodo}
          placeholder="Enter your task"
          style={styles.todoInput}
          onChangeText={setContent}
          value={content}
        />
      </View>

      <ScrollView>
        {todos
          .filter((todo) => todo.category === category)
          .map((todo) => {
            return (
              <View key={todo.id} style={styles.todos}>
                {todo.isEdit ? (
                  <TextInput
                    onSubmitEditing={() => editTodo(todo.id)}
                    style={styles.todoEditInput}
                    onChangeText={setEditContent}
                    value={editContent}
                  />
                ) : (
                  <Text style={todo.isDone ? styles.Done : styles.notDone}>
                    {todo.content}
                  </Text>
                )}

                <TouchableOpacity
                  onPress={() => toggleIsDone(todo.id)}
                  style={styles.button}
                >
                  <AntDesign name="checksquare" size={24} color="black" />
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => toggleIsEdit(todo.id)}
                  style={styles.button}
                >
                  <Feather name="edit" size={24} color="black" />
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => deleteTodo(todo.id)}
                  style={styles.button}
                >
                  <AntDesign name="delete" size={24} color="black" />
                </TouchableOpacity>
              </View>
            );
          })}
      </ScrollView>
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
    borderWidth: 1,
  },
  todos: {
    width: 375,
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

  categoryButton: {
    width: 110,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },

  todoEditInput: {
    minWidth: 250,
    position: "absolute",
    left: 10,
    top: 10,
    backgroundColor: "white",
  },
});
