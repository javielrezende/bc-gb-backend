import { Router } from 'express';
import { uuid } from 'uuidv4';

const appointmentsRouter = Router();

const appointmens = [];

appointmentsRouter.post('/', (request, response) => {
  const { provider, date } = request.body;

  const apoointment = {
    id: uuid(),
    provider,
    date,
  };

  appointmens.push(apoointment);

  return response.json(appointmens);
});

export default appointmentsRouter;
