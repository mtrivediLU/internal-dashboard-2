const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

// Middleware
const corsOptions = {
  origin: 'http://localhost:3000', // React app’s URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));
app.use(express.json());

// MongoDB Connection URI
const mongoURI = 'mongodb+srv://mihir:loopx@cluster0.ns1yy.mongodb.net/loopx-vehicle-log-test?retryWrites=true&w=majority';

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log('MongoDB connection error:', err));

// Define schemas for your collections
const DeviceCycleSchema = new mongoose.Schema({
    AnomalyFlag: String,
    Device: String,
    DeviceID: String,
    LogLevel: String,
    Message: String,
    TimeDifference: Number,
    Timestamp: String,
    DeviceStatus: String
}, { collection: 'device_cycle_transformed' });  // Ensure collection name is accurate

const TimeCalculationSchema = new mongoose.Schema({
    UID: String,
    Host: String,
    MasterDuration: Number,  // Change to Number
    RosoutDuration: Number,  // Change to Number
    Timestamp: String
}, { collection: 'time_calculation_transformed' });


const DeviceCycle = mongoose.model('DeviceCycle', DeviceCycleSchema);
const TimeCalculation = mongoose.model('TimeCalculation', TimeCalculationSchema);

// API Endpoints

// Fetch device_cycle_transformed data
app.get('/api/device-cycle', async (req, res) => {
    try {
        const data = await DeviceCycle.find();
        console.log('DeviceCycle Data:', data); // Log data for debugging
        res.json(data);
    } catch (err) {
        console.log('Error fetching device cycle data:', err); // Log error
        res.status(500).send('Server error');
    }
});

// Fetch time_calculation_transformed data
app.get('/api/time-calculation', async (req, res) => {
    try {
        const data = await TimeCalculation.find();
        console.log('TimeCalculation Data:', data); // Log data for debugging
        res.json(data);
    } catch (err) {
        console.log('Error fetching time calculation data:', err); // Log error
        res.status(500).send('Server error');
    }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
