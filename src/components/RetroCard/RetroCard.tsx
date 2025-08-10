import type { Color } from "../../Colour";
import Card from "../Card/Card";
import Counter from "../Counter/Counter";

export interface RetroCardProps {
  title: string;
  backgroundColor: Color;
  textColor: Color;
}

const RetroCard = (props: RetroCardProps) => {
  const { title, backgroundColor, textColor } = props;

  return (
    <Card
      title={title}
      backgroundColor="var(--primary-accent-colour)"
      textColor="var(--primary-text-colour)"
    >
      <Counter></Counter>
    </Card>
  );
};

export default RetroCard;
