import { HealthCheckEntry } from "../../types";
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';

type PropType = {
  entry: HealthCheckEntry;
};

const HealthCheck = ({ entry }: PropType) => {
  const displayRating = (rating: number) => {
    switch(rating){
      case 0:
        return <span>healthy</span>;
      case 1:
        return <span>low risk</span>;
      case 2:
        return <span>high risk</span>;
      case 3:
        return <span>critical risk</span>;
    }
  };

  return (
    <>
      <p>{entry.date} <MedicalServicesIcon/></p>
      <p>{entry.description}</p>
      <div>health rating: {displayRating(entry.healthCheckRating)}</div>
      <div>diagnose by {entry.specialist}</div>
    </>
  );
};

export default HealthCheck;