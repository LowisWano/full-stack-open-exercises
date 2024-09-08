import { Entry } from "../../types";

type PropType = {
  entry: Entry;
};

const HealthCheck = ({ entry }: PropType) => {
  return (
    <>
      <div>{entry.healthCheckRating}</div>
      <div>diagnose by {entry.specialist}</div>
    </>
  );
};

export default HealthCheck;