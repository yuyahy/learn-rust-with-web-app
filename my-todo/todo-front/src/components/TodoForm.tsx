import { FC, useState } from 'react'
import type { NewTodoPayload } from '../types/todo'
import { Box, Button, TextField, Paper, Grid } from '@mui/material'

type Props = {
  onSubmit: (newTodo: NewTodoPayload) => void
}

const TodoForm: FC<Props> = ({ onSubmit }) => {
  const [text, setText] = useState('')

  const addTodoHandler = () => {
    if (!text) return
    onSubmit({ text })
    setText('')
  }

  return (
    <Paper elevation={2}>
      <Box sx={{ p: 2 }}>
        <Grid container rowSpacing={2} columnSpacing={5}>
          <Grid size={12}>
            <TextField
              label="new todo text"
              variant="filled"
              fullWidth
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </Grid>
          <Grid size={9} />
          <Grid size={3}>
            <Button onClick={addTodoHandler} fullWidth>
              add todo
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  )
}

export default TodoForm
