import { newPatientEntrySchema } from "./utils/validators";
import { z } from "zod";

/**
 * Entry types
 */

export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis['code']>;
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

interface OccupationalHealthcareEntry extends BaseEntry {
  type: string;
  employerName: string;
  sickLeave: string[];
}

type Discharge = {
  date: string;
  criteria: string;
}

interface HospitalEntry extends BaseEntry {
  discharge: Discharge;
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

/**
 * Patient Types
 */
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