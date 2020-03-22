import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import Alert from '@material-ui/lab/Alert'
import { useHistory } from 'react-router-dom'
import Backdrop from '@material-ui/core/Backdrop'
import CircularProgress from '@material-ui/core/CircularProgress'

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1)
    }
  },
  backdrop: {
    zIndex: 100
  }
}))

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [open, setOpen] = useState(false)
  const history = useHistory()

  const classes = useStyles()

  const onHandleChangeUserName = event => {
    const username = event.target.value
    setUsername(username)
  }

  const onHandleChangePassword = event => {
    const password = event.target.value
    setPassword(password)
  }

  const onHandleSubmit = event => {
    event.preventDefault()
    if (username.trim() === '' && password.trim() === '') {
      setError('Please enter username and password')
    } else {
      setOpen(true)
      fetch(`https://swapi.co/api/people?search=${username}`)
        .then(response => {
          return response.json()
        })
        .then(person => {
          const errorMessage = 'Invalid username and password'

          if (person.count === 0) {
            setError(errorMessage)
            setOpen(false)
          } else if (person.results[0]['birth_year'] !== password) {
            setError(errorMessage)
            setOpen(false)
          } else {
            history.push('/search')
          }
        })
        .catch(error => {
          setError(error.message)
          setOpen(true)
        })
    }
  }

  return (
    <Grid
      container
      spacing={3}
      justify='center'
      alignItems='center'
      className={classes.root}
    >
      <Grid item xs={12}>
        {error && <Alert severity='error'>{error}</Alert>}
      </Grid>
      <form noValidate autoComplete='off' onSubmit={onHandleSubmit}>
        <Grid item xs={12}>
          <TextField
            id='outlined-basic'
            label='username'
            variant='outlined'
            value={username}
            name='username'
            onChange={onHandleChangeUserName}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id='outlined-basic'
            label='password'
            variant='outlined'
            value={password}
            name='password'
            onChange={onHandleChangePassword}
            type='password'
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            variant='contained'
            color='primary'
            size='large'
            type='submit'
          >
            Login
          </Button>
        </Grid>
      </form>
      <Backdrop className={classes.backdrop} open={open}>
        <CircularProgress color='inherit' />
      </Backdrop>
    </Grid>
  )
}

export default Login
