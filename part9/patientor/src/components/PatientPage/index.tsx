import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import patientService from "../../services/patients";
import { Patient } from "../../types";
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';

const PatientPage = () => {
  const [patient, setPatient] = useState<Patient | null>(null);
  const id = useParams().id as string;
  useEffect(() => {
    patientService.getPatient(id).then((data)=>{
      setPatient(data);
    });
  },[]);

  console.log(patient);
  if(!patient){
    return <div>loading...</div>;
  }
  return(
    <>
      <h1>{patient.name} {patient.gender == 'female' ? <FemaleIcon/>: <MaleIcon/>}</h1>
      <p>ssn: {patient.ssn}</p>
      <p>{patient.occupation}</p>
    </>
  );
};

export default PatientPage;