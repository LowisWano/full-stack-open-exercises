import express from "express";
import patientsService from "../services/patientsService";

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

export default router;