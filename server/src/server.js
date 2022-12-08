const http = require('http');
const mongoose = require('mongoose');
const app = require('./app');

const { loadPlanetsData } = require('./models/planets.model');

const PORT = process.env.PORT || 5000;
const MONGO_URL = 'mongodb+srv://nasa-api:dyhgNPpXYNhuu9Ro@cluster0.8ea0vwi.mongodb.net/nasa?retryWrites=true&w=majority'

const server = http.createServer(app);

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
})
mongoose.connection.on('error', (err) => {
  console.error(err);
})
async function startServer() {
  await mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true,
  });
  await loadPlanetsData();

  server.listen(PORT, ()=> {
    console.log(`Server listening on port ${PORT}`);
  });
}

startServer();






