import patients from "../../data/patients-full";
import { v1 as uuid } from 'uuid';
import { Patient, nonSensitivePatientEntry, newPatientEntry, Entry } from "../types";

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

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

const getPatient = (id: string): nonSensitivePatientEntry | undefined => {
  return patients.find((patient) => patient.id === id);
};

const addPatient = (patient: newPatientEntry): Patient => {
  const newPatient = {
    id: uuid(),
    ...patient,
    entries: []
  };

  patients.push(newPatient);
  return newPatient;
};

const createEntry = (entry: Entry): Entry => {
  switch(entry.type){
    case "Hospital":
      return {
        ...entry,
        discharge: entry.discharge
      };
    case "OccupationalHealthcare":
      return {
        ...entry,
        employerName: entry.employerName,
        sickLeave: entry.sickLeave
      };
    case "HealthCheck":
      return {
        ...entry,
        healthCheckRating: entry.healthCheckRating
      };
    default:
      assertNever(entry);
  }
};



export default {
  getPatientEntries,
  getNonSensitivePatientEntries,
  getPatient,
  addPatient
};