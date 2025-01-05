import React, { useState } from 'react';
import { geocodeLocation, calculateDistance } from './geoapifyAPI';
import {
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  CircularProgress,
  Grid,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(4),
    padding: theme.spacing(4),
  },
  button: {
    marginTop: theme.spacing(2),
  },
  result: {
    marginTop: theme.spacing(2),
  },
  error: {
    marginTop: theme.spacing(2),
    color: theme.palette.error.main,
  },
}));

const DistanceCalculator = () => {
  const classes = useStyles();
  const [location1, setLocation1] = useState<{ name: string }>({ name: '' });
  const [location2, setLocation2] = useState<{ name: string }>({ name: '' });
  const [distance, setDistance] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const handleCalculateDistance = async () => {
    if (!location1.name || !location2.name) {
      setError(new Error("Both location fields must be filled."));
      return;
    }

    try {
      setLoading(true);
      const [lon1, lat1] = await geocodeLocation(location1.name);
      const [lon2, lat2] = await geocodeLocation(location2.name);

      const result = await calculateDistance(lat1, lon1, lat2, lon2);
      const distanceInKm = (result.features[0].properties.distance / 1000).toFixed(2);
      setDistance(distanceInKm);
      setError(null);
    } catch (err) {
      console.error('Error calculating distance:', err);
      setError(err as Error); 
      setDistance(null);
    } finally {
      setLoading(false);
    }
  };

  const handleNavigateToGoogleMaps = () => {
    if (!location1.name || !location2.name) {
      setError(new Error("Both location fields must be filled."));
      return;
    }

    const url = `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(location1.name)}&destination=${encodeURIComponent(location2.name)}`;
    window.open(url, '_blank');
  };

  return (
    <Container component={Paper} className={classes.container}>
      <Typography variant="h4" align="center" gutterBottom>
        Distance Calculator
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Location 1"
            variant="outlined"
            value={location1.name}
            onChange={(e) => setLocation1({ name: e.target.value })}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Location 2"
            variant="outlined"
            value={location2.name}
            onChange={(e) => setLocation2({ name: e.target.value })}
          />
        </Grid>
        <Grid item xs={12} style={{ textAlign: 'center' }}>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={handleCalculateDistance}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Calculate Distance'}
          </Button>
        </Grid>
        <Grid item xs={12} style={{ textAlign: 'center' }}>
          <Button
            variant="contained"
            color="secondary"
            className={classes.button}
            onClick={handleNavigateToGoogleMaps}
          >
            Navigate with Google Maps
          </Button>
        </Grid>
      </Grid>
      {distance && (
        <Typography variant="h6" className={classes.result}>
          Distance: {distance} kilometers
        </Typography>
      )}
      {error && (
        <Alert severity="error" className={classes.error}>
          Error: {error.message}
        </Alert>
      )}
    </Container>
  );
};

export default DistanceCalculator;
