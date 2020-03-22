import React, { useState, useEffect } from 'react'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import CircularProgress from '@material-ui/core/CircularProgress'
import Planet from './Planet'

const Search = () => {
  const [planet, setPlanet] = useState('')
  const [planets, setPlanets] = useState([])
  const [loading, isLoading] = useState(false)

  useEffect(() => {
    if (planet) {
      isLoading(true)
      fetch(`https://swapi.co/api/planets?search=${planet}&ordering=population`)
        .then(response => {
          return response.json()
        })
        .then(data => {
          setPlanets(data.results)

          const res = data.results
            .filter(result => !isNaN(+result.population))
            .sort((a, b) => {
              if (+a.population < +b.population) {
                return -1
              } else if (+a.population > +b.population) {
                return 1
              } else {
                return 0
              }
            })
          setPlanets(res)
          isLoading(false)
        })
    }
  }, [planet])

  const onHandleChange = event => {
    const { value } = event.target
    setPlanet(value)
  }

  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            id='outlined-basic'
            label='planet'
            variant='outlined'
            value={planet}
            name='planet'
            onChange={onHandleChange}
          />
        </Grid>
        <Grid item xs={12}>
          {loading && <CircularProgress disableShrink />}
        </Grid>
        {planets.map((planet, index) => (
          <Planet key={index} planet={planet} size={index} />
        ))}
      </Grid>
    </div>
  )
}

export default Search
