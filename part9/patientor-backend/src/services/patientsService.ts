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

export default {
  getPatientEntries,
  getNonSensitivePatientEntries
};