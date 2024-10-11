// src/server.ts
import express, { Request, Response, Router } from 'express';
import uploadRouter, { storage } from './routes/uploadRoute';
import cors, { CorsOptions } from 'cors';
const app = express();
const port = 3000;


const allowedOrigins: string[] = ['http://127.0.0.1:5500'];

const corsOptions: CorsOptions = {
  origin: (
    origin: string | undefined,
    callback: (err: Error | null, allow?: boolean) => void
  ) => {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true); // Allow access
    } else {
      callback(new Error('Not allowed by CORS')); // Reject access
    }
  },
};

app.use(cors(corsOptions));

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


