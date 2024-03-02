"use client"
/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';
import Link from 'next/link'
import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import TextField from '@mui/material/TextField';
import axios from 'axios';

export default function Todos() {
  const [todos, setTodos] = useState<any>([])
  const [title, setTitle] = useState<any>("")

  const getTodos = () => {
    axios.get('http://localhost:8080/todos')
      .then((response: { data: any; }) => {
        setTodos(response.data);
      });
  }

  const registerTodo = () => {
    axios.post('http://localhost:8080/todos', { title })
      .then((response: { data: any; }) => {
        setTitle("")
        getTodos()
      });
  }

  useEffect(() => {
    getTodos()
  }, [])
  
  const handleUpdateTodoDoneflag = (id: any) => {
    const updatedTodos = todos.map((todo: { id: any; done_flag: any; }) => {
      if (todo.id === id) return { ...todo, done_flag: !todo.done_flag };
      return todo;
    });
    setTodos(updatedTodos);
  }

  const handleDeleteTodo = (id: any) => setTodos(todos.filter((todo: { id: any; }) => todo.id !== id));

  return (
    <>
       <Grid container alignItems='center' justifyContent='center' direction="column">
        <Typography variant="h5" style={{ marginBottom: "20px" }}>
          TODO APP
        </Typography>
        <Grid css={todoWrapStyle} container alignItems='center' justifyContent='center' direction="column">
          <Box css={todoItemStyle}>
              <TextField value={title} onChange={(e) => setTitle(e.target.value)} style={{ marginRight: "40px" }}/>
              <Button variant="contained" onClick={() => registerTodo()}>追加</Button>
          </Box>
          <Grid container alignItems='center' justifyContent='space-between'>
            <Typography variant="h6">
              Todo
            </Typography>
          </Grid>
          <List css={todoItemWrapStyle} component="ul">
            {todos.map((todo: any, i: any) => (
              !todo.done_flag &&
              <ListItem key={todo.id} css={todoItemStyle}>
                <p css={todoTitleStyle}>
                  ID.{todo.id}：{todo.title}
                </p>
                <Box>
                  <Button variant="contained" style={{ marginRight: "10px" }} color="success" onClick={() => handleUpdateTodoDoneflag(todo.id)}>完了</Button>
                  <Button variant="contained" color="error" onClick={() => handleDeleteTodo(todo.id)}>削除</Button>
                </Box>
              </ListItem>
            ))}
          </List>
        </Grid>

        <Grid css={todoWrapStyle} container alignItems='center' justifyContent='center' direction="column">
          <Grid container alignItems='center' justifyContent='space-between'>
            <Typography variant="h6">
              完了
            </Typography>
          </Grid>
          <List css={todoItemWrapStyle} component="ul">
            {todos.map((todo: any, i: any) => (
              todo.done_flag &&
              <ListItem key={todo.id} css={doneItemStyle}>
                <p css={doneTitleStyle}>
                ID.{todo.id}：{todo.title}
                </p>
                <Box>
                  <Button variant="contained" style={{ marginRight: "10px" }} color="primary" onClick={() => handleUpdateTodoDoneflag(todo.id)}>戻す</Button>
                  <Button variant="contained" color="error" onClick={() => handleDeleteTodo(todo.id)}>削除</Button>
                </Box>
              </ListItem>
            ))}
          </List>
        </Grid>
        <Link style={{ fontSize: "14px" }} href="/">トップページへ</Link>
      </Grid>
    </>
  )
}

const todoWrapStyle = css`
  width: 60%;
  margin-bottom: 30px;
`
const todoItemWrapStyle = css`
  width: 100%;
`
const todoItemStyle = css`
  border: 1px solid black;
  margin: 0px 0px 5px;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
  padding: 5px;
`
const todoTitleStyle = css`
  margin: 0;
`
const doneItemStyle = css`
  border: 1px solid black;
  background: #c2c0c0;
  margin: 0px 0px 5px;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
  padding: 5px;
`
const doneTitleStyle = css`
  text-decoration: line-through;
  margin: 0;
`