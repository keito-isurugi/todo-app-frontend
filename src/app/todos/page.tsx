"use client"
/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';
import { JSXElementConstructor, Key, PromiseLikeOfReactNode, ReactElement, ReactNode, useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import TextField from '@mui/material/TextField';

export default function Todos() {
  const [todos, setTodos] = useState<any>([])
  const [newTodo, setNewTodo] = useState<any>("")
  const initialTodos = [
    {id: 1, title: "料理", done_flag: false},
    {id: 2, title: "運動", done_flag: false},
    {id: 3, title: "お買い物", done_flag: false},
    {id: 4, title: "お風呂", done_flag: false},
    {id: 5, title: "掃除", done_flag: false},
  ]

  useEffect(() => {
    setTodos(initialTodos)
  }, [])
  
  const handleAddTodo = (newTitle: any) => {
    const maxId = todos.length > 0 ? Math.max(...todos.map((todo: { id: any; }) => todo.id)) : 0;
    const newId = maxId + 1;
    const newTodo = { id: newId, title: newTitle };
    setTodos([...todos, newTodo])
    setNewTodo("")
  }

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
        <Typography variant="h5" style={{marginBottom: "20px"}}>
          TODO APP
        </Typography>
        <Grid css={todoWrapStyle} container alignItems='center' justifyContent='center' direction="column">
          <Box css={todoItemStyle}>
              <TextField value={newTodo} onChange={(e) => setNewTodo(e.target.value)}/>
              <Button variant="contained" onClick={() => handleAddTodo(newTodo)}>追加</Button>
          </Box>
          <Grid container alignItems='center' justifyContent='space-between'>
            <Typography variant="h6">
              Todo
            </Typography>
          </Grid>
          <List css={todoItemWrapStyle} component="ul">
            {todos.map((todo: any, i: any) => (
              !todo.done_flag ?
              <ListItem key={todo.id} css={todoItemStyle}>
                <p css={todoTitleStyle}>
                  ID.{todo.id}：{todo.title}
                </p>
                <Box>
                  <Button variant="contained" style={{ marginRight: "10px" }} color="success" onClick={() => handleUpdateTodoDoneflag(todo.id)}>完了</Button>
                  <Button variant="contained" color="error" onClick={() => handleDeleteTodo(todo.id)}>削除</Button>
                </Box>
              </ListItem>
              : <></>
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
              todo.done_flag ?
              <ListItem key={todo.id} css={doneItemStyle}>
                <p css={doneTitleStyle}>
                ID.{todo.id}：{todo.title}
                </p>
                <Box>
                  <Button variant="contained" style={{ marginRight: "10px" }} color="primary" onClick={() => handleUpdateTodoDoneflag(todo.id)}>戻す</Button>
                  <Button variant="contained" color="error" onClick={() => handleDeleteTodo(todo.id)}>削除</Button>
                </Box>
              </ListItem>
              : <></>
            ))}
          </List>
        </Grid>
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