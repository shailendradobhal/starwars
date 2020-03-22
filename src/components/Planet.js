import React from 'react'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import { makeStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'

const useStyles = makeStyles({
  size: {
    fontSize: props => props + 18
  },
  decoration: {
    textDecoration: 'none'
  }
})

const Planet = ({ planet, size }) => {
  const classes = useStyles(size)

  const link = `/search/planet/${planet.name}`

  return (
    <Grid item xs={3}>
      <Card className={classes.size}>
        <Link to={link} className={classes.decoration}>
          <CardContent>
            <p>Name: {planet.name}</p>
            <p>{planet.population}</p>
          </CardContent>
        </Link>
      </Card>
    </Grid>
  )
}

export default Planet
