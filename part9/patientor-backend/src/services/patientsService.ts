import patients from "../../data/patients";
import { Patient, nonSensitivePatientEntry } from "../types";

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

export default {
  getPatientEntries,
  getNonSensitivePatientEntries,
  findById
};