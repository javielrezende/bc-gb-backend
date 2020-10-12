import { Router } from 'express';
import { uuid } from 'uuidv4';
import { startOfHour, parseISO, isEqual } from 'date-fns';

const appointmentsRouter = Router();

interface Appointment {
  id: string;
  provider: string;
  date: Date;
}

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

  const appointment: Appointment = {
    id: uuid(),
    provider,
    date: parseDate,
  };

  appointmens.push(appointment);

  return response.json(appointmens);
});

export default appointmentsRouter;
