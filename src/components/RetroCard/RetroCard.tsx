import type { Color } from "../../Colour";
import Card from "../Card/Card";
import Counter from "../Counter/Counter";

export interface RetroCardProps {
  id: number;
  title: string;
  backgroundColor: Color;
  textColor: Color;
}

const RetroCard = (props: RetroCardProps) => {
  const { id, title, backgroundColor, textColor } = props;

  return (
    <Card
      id={id}
      title={title}
      backgroundColor="var(--primary-accent-colour)"
      textColor="var(--primary-text-colour)"
    >
      <Counter></Counter>
    </Card>
  );
};

export default RetroCard;
