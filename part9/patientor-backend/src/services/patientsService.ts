import patients from "../../data/patients-full";
import { v1 as uuid } from 'uuid';
import { Patient, nonSensitivePatientEntry, newPatientEntry, Entry, NewEntry } from "../types";

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

const createEntry = (entry: NewEntry, patientId: string): Entry => {
  switch(entry.type){
    case "Hospital":{
      const newEntry = {
        ...entry,
        discharge: entry.discharge,
        id: uuid()
      };
      const patientToUpdate = patients.findIndex((patient) => patient.id === patientId);
      patients[patientToUpdate].entries.push(newEntry);
      console.log(patients[patientToUpdate].entries);
      return newEntry;
    }
    case "OccupationalHealthcare":{
      const newEntry = {
        ...entry,
        employerName: entry.employerName,
        sickLeave: entry.sickLeave,
        id: uuid()
      };
      const patientToUpdate = patients.findIndex((patient) => patient.id === patientId);
      patients[patientToUpdate].entries.push(newEntry);
      return newEntry;
    }
    case "HealthCheck":{
      const newEntry = {
        ...entry,
        healthCheckRating: entry.healthCheckRating,
        id: uuid()
      };
      const patientToUpdate = patients.findIndex((patient) => patient.id === patientId);
      patients[patientToUpdate].entries.push(newEntry);
      return newEntry;
    }
    default:
      return assertNever(entry);
  }
};



export default {
  getPatientEntries,
  getNonSensitivePatientEntries,
  getPatient,
  addPatient,
  createEntry
};