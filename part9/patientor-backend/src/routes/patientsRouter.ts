import express from "express";
import patientsService from "../services/patientsService";
import { toNewPatientEntry } from "../utils/toNewPatientEntry";

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
    const entry = toNewPatientEntry(req.body);
    const patient = patientsService.addPatient(entry);
    res.json(patient);
  }catch(error){
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;