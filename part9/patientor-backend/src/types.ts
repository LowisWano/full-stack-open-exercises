import { newPatientEntrySchema } from "./utils/validators";
import { z } from "zod";

export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other'
}

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn?: string;
  gender: Gender;
  occupation: string; 
}

export type newPatientEntry = z.infer<typeof newPatientEntrySchema>;
export type nonSensitivePatientEntry = Omit<Patient, 'ssn'>;