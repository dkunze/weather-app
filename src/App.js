import React, { useState } from 'react'
import {
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  Container,
  Grid,
  Box,
} from '@mui/material'
import './App.css'

const App = () => {
  const [city, setCity] = useState('')
  const [weather, setWeather] = useState(null)
  const [history, setHistory] = useState([])

  const fetchWeather = async () => {
    const apiKey = process.env.REACT_APP_WEATHER_API_KEY
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`

    try {
      const response = await fetch(url)
      if (!response.ok) throw new Error('City not found')

      const data = await response.json()
      setWeather(data)
      setHistory((prev) => [...prev, city])
    } catch (error) {
      alert(error.message)
    }
  }

  return (
    <Container maxWidth="md" style={{ marginTop: '2rem', textAlign: 'center' }}>
      <Box
        sx={{
          bgcolor: '#1976d2',
          color: '#fff',
          padding: '1.5rem',
          borderRadius: '8px',
        }}
      >
        <Typography variant="h3" gutterBottom>
          React Weather App
        </Typography>
        <Typography variant="subtitle1">
          Get real-time weather updates for any city!
        </Typography>
      </Box>

      <Box mt={4}>
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12} sm={8}>
            <TextField
              fullWidth
              variant="outlined"
              label="Enter city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={fetchWeather}
              size="large"
            >
              Search
            </Button>
          </Grid>
        </Grid>
      </Box>

      {weather && (
        <Box mt={4}>
          <Card style={{ backgroundColor: '#e3f2fd', padding: '1rem' }}>
            <CardContent>
              <Typography variant="h4" gutterBottom>
                {weather.name}
              </Typography>
              <Grid
                container
                spacing={2}
                justifyContent="center"
                alignItems="center"
              >
                <Grid item>
                  <img
                    src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                    alt={weather.weather[0].description}
                  />
                </Grid>
                <Grid item>
                  <Typography variant="body1" gutterBottom>
                    {weather.weather[0].description}
                  </Typography>
                  <Typography variant="body1">
                    Temperature: {weather.main.temp}°C
                  </Typography>
                  <Typography variant="body1">
                    Humidity: {weather.main.humidity}%
                  </Typography>
                  <Typography variant="body1">
                    Wind Speed: {weather.wind.speed} m/s
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Box>
      )}

      <Box mt={4}>
        <Card>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Search History
            </Typography>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
              {history.map((item, index) => (
                <li
                  key={index}
                  style={{ margin: '0.5rem 0', fontSize: '1.1rem' }}
                >
                  {item}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </Box>

      <Box mt={4}>
        <Typography variant="body2" color="textSecondary">
          &copy; 2025 Weather App. All rights reserved.
        </Typography>
      </Box>
    </Container>
  )
}

export default App
