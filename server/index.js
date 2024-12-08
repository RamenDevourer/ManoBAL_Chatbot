import express from 'express';
import cors from 'cors';
import chatRoutes from './api/routes/chat.route.js'; // Import chat routes with .js extension
import {PORT} from './config.js';

const app = express();
const port = PORT;

// Middleware
app.use(express.json());
app.use(cors());

// Use chat routes
app.use('/api/chat', chatRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
