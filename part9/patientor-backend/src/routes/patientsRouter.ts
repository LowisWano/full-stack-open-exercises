import express from "express";
import { z } from "zod";
import patientsService from "../services/patientsService";
import { newPatientEntrySchema } from "../utils/validators";

const router = express.Router();

router.get('/', (_req, res) => {
  const patients = patientsService.getNonSensitivePatientEntries();
  res.json(patients);
});

router.get('/:id', (req, res) => {
  const patient = patientsService.findById(req.params.id);

  if(!patient){
    return res.status(404).end();
  }

  return res.json(patient);
});

router.post('/', (req, res) => {
  try{
    const entry = newPatientEntrySchema.parse(req.body);
    const patient = patientsService.addPatient(entry);
    res.json(patient);
  }catch(error: unknown){
    if (error instanceof z.ZodError) {
      res.status(400).send({ error: error.issues });
    } else {
      res.status(400).send({ error: 'unknown error' });
    }
  }
});

export default router;