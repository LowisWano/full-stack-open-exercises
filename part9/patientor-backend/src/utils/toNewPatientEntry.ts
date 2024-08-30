import { newPatientEntry } from "../types";
import { parseName, parseDate, parseGender, parseOccupation, parseSSN } from "./validators";

export const toNewPatientEntry = (patient: unknown): newPatientEntry => {
  if ( !patient || typeof patient !== 'object' ) {
    throw new Error('Incorrect or missing data');
  }
  if (!('name' in patient) || !('dateOfBirth' in patient) || !('gender' in patient) || !('occupation' in patient) || !('ssn' in patient))  {
    throw new Error('Incorrect data: some fields are missing');
  }

  const newPatient: newPatientEntry = {
    name: parseName(patient.name),
    dateOfBirth: parseDate(patient.dateOfBirth),
    ssn: parseSSN(patient.ssn),
    gender: parseGender(patient.gender),
    occupation: parseOccupation(patient.occupation)
  };
  
  return newPatient;
};