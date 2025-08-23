import { useParams } from "react-router";

const Team = () => {
  let params = useParams();

  return <div>Team {params.teamId}</div>;
};

export default Team;
