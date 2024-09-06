import { newPatientEntrySchema } from "./utils/validators";
import { z } from "zod";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface Entry{
  
}

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
  entries: Entry[]
}

export type newPatientEntry = z.infer<typeof newPatientEntrySchema>;
export type nonSensitivePatientEntry = Omit<Patient, 'ssn' | 'entries'>;