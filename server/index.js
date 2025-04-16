import express from 'express';
import cors from 'cors';
import chatRoutes from './api/routes/chat.route.js'; // Import chat routes with .js extension
import {PORT} from './config.js';

const app = express();
const port = PORT;

// Middleware
app.use(express.json());

// Uncomment and change frontend url for deployment
const corsOptions = {
    origin: ['https://manobal.vercel.app', 'http://localhost:5173']
};

app.use(cors(corsOptions));

// Uncomment for localhost
// app.use(cors());

// Use chat routes
app.use('/api/chat', chatRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server live`);
});

app.get('/', (req, res) => {
    res.json("server live");
})