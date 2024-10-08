import { Gender, HealthCheckRating } from "../types";
import { z } from "zod";

// schema
const BaseEntrySchema = z.object({
  description: z.string(),
  date: z.string().date(),
  specialist: z.string(),
  diagnosisCodes: z.array(z.string()).optional(),
});

const HealthCheckEntrySchema = BaseEntrySchema.extend({
  type: z.literal("HealthCheck"),
  healthCheckRating: z.nativeEnum(HealthCheckRating),
});


const OccupationalHealthcareEntrySchema = BaseEntrySchema.extend({
  type: z.literal("OccupationalHealthcare"),
  employerName: z.string(),
  sickLeave: z.object({
    startDate: z.string().date(),
    endDate: z.string().date(),
  }).optional()
});

const HospitalEntrySchema = BaseEntrySchema.extend({
  type: z.literal("Hospital"),
  discharge: z.object({
    date: z.string().date(),
    criteria: z.string()
  })
});

// create the union entry schema 
export const EntrySchema = z.union([
  HealthCheckEntrySchema,
  OccupationalHealthcareEntrySchema,
  HospitalEntrySchema,
]);

export const newPatientEntrySchema = z.object({
  name: z.string(),
  dateOfBirth: z.string().date(),
  ssn: z.string().optional(),
  gender: z.nativeEnum(Gender),
  occupation: z.string()
});

// validators
const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isValidSSN = (ssn: string): boolean => {
  const split = ssn.split('-');
  if(split.length != 2 || split[0].length != 6 || split[1].length < 3 || split[1].length > 4){
    return false;
  }
  return true;
};

const isGender = (gender: string): gender is Gender => {
  return Object.values(Gender).map(v => v.toString()).includes(gender);
};


// data parsers
export const parseGender = (gender: unknown): Gender => {
  if(!gender || !isString(gender) || !isGender(gender)){
    throw new Error(`Invalid or missing gender`);
  }
  return gender;
};

export const parseSSN = (ssn: unknown): string => {
  if (!ssn || !isString(ssn) || !isValidSSN(ssn)) {
    throw new Error(`Invalid or missing ssn`);
  }
  return ssn;
};

export const parseName = (name: unknown): string => {
  if(!name || !isString(name)){
    throw new Error('Invalid or missing name');
  }
  return name;
};

export const parseOccupation = (occupation: unknown): string => {
  if(!occupation || !isString(occupation)){
    throw new Error('Invalid or missing name');
  }
  return occupation;
};

export const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
      throw new Error(`Invalid or missing date`);
  }
  return date;
};