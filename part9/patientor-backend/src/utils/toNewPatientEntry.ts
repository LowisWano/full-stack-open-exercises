// import { z } from "zod";
import { newPatientEntry } from "../types";
import { newPatientEntrySchema } from "./validators";
// import { parseName, parseDate, parseGender, parseOccupation, parseSSN } from "./validators";

export const toNewPatientEntry = (patient: unknown): newPatientEntry => {
  return newPatientEntrySchema.parse(patient);
};