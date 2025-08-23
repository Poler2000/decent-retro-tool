import { useParams } from "react-router";

const Retro = () => {
  const { teamId, retroId } = useParams();
  return (
    <div>
      Retro {retroId} for team {teamId}
    </div>
  );
};

export default Retro;
