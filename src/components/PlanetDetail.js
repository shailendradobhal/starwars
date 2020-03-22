import React, { useState, useEffect } from 'react'
import Grid from '@material-ui/core/Grid'
import { useParams } from 'react-router-dom'
import Backdrop from '@material-ui/core/Backdrop'
import CircularProgress from '@material-ui/core/CircularProgress'

const PlanetDetail = () => {
  const { name } = useParams()

  const [planet, setPlanet] = useState({})
  const [open, setOpen] = useState(false)

  useEffect(() => {
    setOpen(true)
    fetch(`https://swapi.co/api/planets?search=${name}`)
      .then(response => {
        return response.json()
      })
      .then(data => {
        setPlanet(data.results[0])
        setOpen(false)
      })
  }, [])

  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <h2>Planet Detail</h2>
        </Grid>
        <Grid item xs={12}>
          <strong>Name:</strong> {planet.name}
        </Grid>
        <Grid item xs={12}>
          <strong>Climate:</strong> {planet.climate}
        </Grid>
        <Grid item xs={12}>
          <strong>Population:</strong> {planet.population}
        </Grid>
        <Grid item xs={12}>
          <strong>Rotation period:</strong> {planet.rotation_period}
        </Grid>
        <Grid item xs={12}>
          <strong>Terrain:</strong> {planet.terrain}
        </Grid>
        <Grid item xs={12}>
          <strong>URL:</strong> {planet.url}
        </Grid>
      </Grid>
      <Backdrop open={open}>
        <CircularProgress color='inherit' />
      </Backdrop>
    </div>
  )
}

export default PlanetDetail
