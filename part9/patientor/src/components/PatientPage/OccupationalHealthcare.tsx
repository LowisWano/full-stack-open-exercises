import { useEffect, useState } from "react";
import { OccupationalHealthcareEntry, Diagnosis } from "../../types";
import diagnosesService from "../../services/diagnoses";
import WorkIcon from '@mui/icons-material/Work';

type PropType = {
  entry: OccupationalHealthcareEntry
};

const OccupationalHealthcare = ({ entry }: PropType) => {
  const [diagnoses, setDiagnoses] = useState<Diagnosis[] | null>(null);

  useEffect(() => {
    diagnosesService.getAllDiagnoses().then((data)=>{
      setDiagnoses(data);
    });
  }, []);
  
  return (
    <>
      <p>{entry.date} <WorkIcon/></p>
      <p>{entry.description}</p>
      <ul>
        { 
          entry.diagnosisCodes && entry.diagnosisCodes.map((code: string)=>(
            <li key={code}>{code} {diagnoses && diagnoses.find(d => d.code == code )?.name}</li>
          ))
        }
      </ul>
      <p>diagnoses by {entry.specialist}</p>
    </>
  );
};

export default OccupationalHealthcare;