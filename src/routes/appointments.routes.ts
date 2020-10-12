import { Router } from 'express';
import { startOfHour, parseISO } from 'date-fns';

import AppointmentsRepository from '../repositories/AppointmentsRepository';

const appointmentsRouter = Router();

const appointmentsRepository = new AppointmentsRepository();

appointmentsRouter.post('/', (request, response) => {
  const { provider, date } = request.body;

  const parseDate = startOfHour(parseISO(date));

  const findAppointmentInsameDate = appointmentsRepository.findByDate(
    parseDate,
  );

  if (findAppointmentInsameDate) {
    return response
      .status(400)
      .json({ message: 'This appointment is alread booked' });
  }

  const appointment = appointmentsRepository.create(provider, parseDate);

  return response.json(appointment);
});

export default appointmentsRouter;
