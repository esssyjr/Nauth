// src/server.ts
import express, { Request, Response, Router } from 'express';
import uploadRouter, { storage } from './routes/uploadRoute';

const app = express();
const port = 3000;

// Middleware to parse application/json
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Hello from Nauth');
});



// Use the router
app.use('/api/v1', uploadRouter);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
