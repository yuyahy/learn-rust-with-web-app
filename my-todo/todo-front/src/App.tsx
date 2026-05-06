import {useEffect, useState, FC } from "react";
import "modern-css-reset";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Box, Stack, Typography } from "@mui/material";
import type { NewTodoPayload, Todo } from "./types/todo";
import TodoList from "./components/TodoList";
import TodoForm from "./components/TodoForm";
import { addTodoItem, getTodoItems } from "./lib/api/todo";

const TodoApp: FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  // point1
  const onSubmit = async (payload: NewTodoPayload) => {
    if (!payload.text) return;

    // Todoをバックエンドに送信
    await addTodoItem(payload)
    // UIの状態をバックエンドの最新の状態と同期させるため、
    // APIより再度Todo配列を取得
    const todos = await getTodoItems()
    setTodos(todos)
  };

  const onUpdate = (updateTodo: Todo) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === updateTodo.id) {
          return {
            ...todo,
            ...updateTodo, // 必要な部分だけoverwride
          };
        }
        return todo;
      }),
    );
  };

  // コンポーネントがマウントされたタイミング(e.g. 画面を新規に開いた、リロードした)で、最新のTodoをバックエンドから取得し、
  // 画面に反映するuseEffect()
  useEffect(() => {
    ;(async () => {
      const todos = await getTodoItems()
      setTodos(todos)
    })()
  }, [])

  return (
    <>
      <Box
        sx={{
          backgroundColor: "white",
          borderBottom: "1px solid gray",
          display: "flex",
          alignItems: "center",
          position: "fixed",
          top: 0,
          p: 2,
          width: "100%",
          height: 80,
          zIndex: 3,
        }}
      >
        <Typography variant="h1">Todo App</Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          p: 5,
          mt: 10,
        }}
      >
        <Box sx={{ maxWidth: 700, width: "100%" }}>
          <Stack spacing={5}>
            <TodoForm onSubmit={onSubmit} />
            <TodoList todos={todos} onUpdate={onUpdate} />
          </Stack>
        </Box>
      </Box>
    </>
  );
};

const theme = createTheme({
  typography: {
    h1: {
      fontSize: 30,
    },
    h2: {
      fontSize: 20,
    },
  },
});

const App: FC = () => {
  // point2
  return (
    <ThemeProvider theme={theme}>
      <TodoApp />
    </ThemeProvider>
  );
};

export default App;
