import express, { Request, Response } from "express";
import patientsService from "../services/patientsService";
import { patientEntryParser, errorMiddleware } from "../utils/middlewares";
import { Patient, newPatientEntry } from "../types";

const router = express.Router();

router.get('/', (_req, res) => {
  const patients = patientsService.getNonSensitivePatientEntries();
  res.json(patients);
});

router.get('/:id', (req, res) => {
  const patient = patientsService.getPatient(req.params.id);

  if(!patient){
    return res.status(404).end();
  }

  return res.json(patient);
});

router.post('/', patientEntryParser,(req: Request<unknown, unknown, newPatientEntry>, res: Response<Patient>) => {
  const patient = patientsService.addPatient(req.body);
  res.json(patient);
});

router.use(errorMiddleware);

export default router;