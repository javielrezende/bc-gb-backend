import express, { json } from 'express';
import routes from './routes';

const port = 3333;

const app = express();
app.use(express.json());

app.post('/user', (request, response) => {
  const { name, email } = request.body;

  const user = { name, email };

  return response.json(user);
});

app.listen(port, () => {
  console.log(`🚀 Server started on port ${port}`);
});
