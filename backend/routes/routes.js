const express = require('express');
const RoutesPath = require('../model/routes'); // Corrected model import (capitalize 'RoutesPath')
const apiKeyAuth = require('../middleware/apiKeyAuth');
const router = express.Router();

// Add Route
router.post('/add_routes',  async (req, res) => {
    const { start_point, end_point } = req.body;
    console.log(req.body);
    try {
        // Check if the route already exists
        // const existingRoute = await RoutesPath.findOne({ starting_point, end_point });
        // if (existingRoute) {
        //     return res.status(400).json({ message: 'Route already registered', status: 2 });
        // }
        // Create new route
        const routesPath = new RoutesPath({ start_point, end_point });
        await routesPath.save();
        res.status(201).json({ message: 'Route added successfully', status: 1 });
    } catch (error) {
        res.status(500).json({ message: 'Server error', status: 0, error });
    }
});

// Get All Routes
router.get('/', apiKeyAuth, async (req, res) => {
    try {
        const routes = await RoutesPath.find(); // Fetch all routes
        res.status(200).json(routes);
    } catch (error) {
        res.status(500).json({ message: 'Server error', status: 0, error });
    }
});

// Get Route by ID
router.get('/:id', apiKeyAuth, async (req, res) => {
    const { id } = req.params;

    try {
        const route = await RoutesPath.findById(id); // Find route by ID
        if (!route) {
            return res.status(404).json({ message: 'Route not found' });
        }

        res.status(200).json(route);
    } catch (error) {
        res.status(500).json({ message: 'Server error', status: 0, error });
    }
});

module.exports = router;
