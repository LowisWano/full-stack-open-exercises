import { useEffect, useState } from "react";
import diagnosesService from "../../services/diagnoses";
import { HospitalEntry, Diagnosis } from "../../types";
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';

type PropType = {
  entry: HospitalEntry
};

const Hospital = ({ entry }: PropType) => {
  const [diagnoses, setDiagnoses] = useState<Diagnosis[] | null>(null);

  useEffect(() => {
    diagnosesService.getAllDiagnoses().then((data)=>{
      setDiagnoses(data);
    });
  }, []);

  return (
    <>
      <div>
        <p>{entry.date} <LocalHospitalIcon/></p>
        <p>{entry.description}</p>
        <ul>
          { 
            entry.diagnosisCodes && entry.diagnosisCodes.map((code: string)=>(
              <li key={code}>{code} {diagnoses && diagnoses.find(d => d.code == code )?.name}</li>
            ))
          }
        </ul>
        <p>discharge criteria: {entry.discharge.criteria}</p>
        <p>discharge date: {entry.discharge.date}</p>
        <p>diagnosed by {entry.specialist}</p>
      </div>
    </>
  );
};

export default Hospital;