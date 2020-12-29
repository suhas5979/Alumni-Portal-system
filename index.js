const express = require('express');
const mongoose = require('mongoose');
// models 
require('./model/Student');
require('./model/Alumni');
require('./model/Schollarship');
require('./model/Feedback');
// configuration
const { MONGO_URI } = require('./config/keys');
// routes  
const authRoutes = require('./routes/authRoutes');
const studentRoutes = require('./routes/studentRoutes')
const schollarshipRoutes = require('./routes/schollarshipRoutes');
const alumniRoutes = require('./routes/alumniRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes');

// mongo setup
mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});
mongoose.connection.on('connected', () => console.log('connected to mongo uri'));
mongoose.connection.on('err', (err) => console.log({ err }));

const app = express();
app.use(express.json());
// express middlewares
app.use(authRoutes);
app.use(studentRoutes)
app.use(schollarshipRoutes)
app.use(alumniRoutes)
app.use(feedbackRoutes)
// server host config
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => { console.log(`listen on port ${PORT}`) });