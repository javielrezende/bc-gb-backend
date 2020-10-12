import { Router } from 'express';
import { startOfHour, parseISO, isEqual } from 'date-fns';

import Appointment from '../models/appointments';

const appointmentsRouter = Router();

const appointmens: Appointment[] = [];

appointmentsRouter.post('/', (request, response) => {
  const { provider, date } = request.body;

  const parseDate = startOfHour(parseISO(date));
  const findAppointmentInsameDate = appointmens.find(appointment =>
    isEqual(parseDate, appointment.date),
  );

  if (findAppointmentInsameDate) {
    return response
      .status(400)
      .json({ message: 'This appointment is alread booked' });
  }

  const appointment: Appointment = new Appointment(provider, parseDate);

  appointmens.push(appointment);

  return response.json(appointmens);
});

export default appointmentsRouter;
