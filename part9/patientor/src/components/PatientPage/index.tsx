import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import patientService from "../../services/patients";
import diagnosesService from "../../services/diagnoses";
import { Diagnosis, Entry, Patient } from "../../types";

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import "../../index.css";

import HospitalEntry from "./HospitalEntry";
import OccupationalHealthcare from "./OccupationalHealthcare";
import HealthCheck from "./HealthCheck";

const PatientPage = () => {
  const [patient, setPatient] = useState<Patient | null>(null);
  const [diagnosis, setDiagnoses] = useState<Diagnosis[] | null>(null);
  const id = useParams().id as string;
  useEffect(() => {
    patientService.getPatient(id).then((data)=>{
      setPatient(data);
    });

    diagnosesService.getAllDiagnoses().then((data)=>{
      setDiagnoses(data);
    });
    
  },[]);


  const DisplayEntryDetails: React.FC<Entry> = (entry) => {
    switch(entry.type){
      case "Hospital":
        return <HospitalEntry/>;
      case "OccupationalHealthcare":
        return <OccupationalHealthcare/>;
      case "HealthCheck":
        return <HealthCheck entry={entry}/>;
    }
  };
  
  if(!patient || !diagnosis){
    return <div>loading...</div>;
  }
  console.log(patient);
  return(
    <>
      <h1>{patient.name} {patient.gender == 'female' ? <FemaleIcon/>: <MaleIcon/>}</h1>
      <p>ssn: {patient.ssn}</p>
      <p>occupation: {patient.occupation}</p>
      <h2>entries</h2>
      <div className="entries-container">
        {
          patient.entries.map((entry)=>(
            <Card key={entry.id}>
              <CardContent>
                <p>{entry.date}</p>
                <p>{entry.description}</p>
                <div>
                  {
                    DisplayEntryDetails(entry)
                  }
                </div>
              </CardContent>
            </Card>
          ))
        }
      </div>
      
    </>
  );
};

export default PatientPage;