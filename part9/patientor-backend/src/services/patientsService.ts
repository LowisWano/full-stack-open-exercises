import patients from "../../data/patients";
import { v1 as uuid } from 'uuid';
import { Patient, nonSensitivePatientEntry, newPatientEntry } from "../types";

const getPatientEntries = (): Patient[] => {
  return patients;
};

const getNonSensitivePatientEntries = (): nonSensitivePatientEntry[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const findById = (id: string): nonSensitivePatientEntry | undefined => {
  return patients.find((patient) => patient.id === id);
};

const addPatient = (patient: newPatientEntry): Patient => {
  const newPatient = {
    id: uuid(),
    ...patient
  };

  patients.push(newPatient);
  return newPatient;
};

export default {
  getPatientEntries,
  getNonSensitivePatientEntries,
  findById,
  addPatient
};