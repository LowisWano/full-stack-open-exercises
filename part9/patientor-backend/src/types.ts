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

export type newPatientEntry = Omit<Patient, 'id'>;
export type nonSensitivePatientEntry = Omit<Patient, 'ssn'>;