const mongoose = require('mongoose');

mongoose.connect(process.env.mongo_URL, { useUnifiedTopology: true })
    .then(() => {
        console.log('MongoDB connected');
    }).catch(() => {
        console.log('MongoDB not connected');
    });