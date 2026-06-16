type ColumnProps = {
  column: {
    id: number;
    name: string;
    cards: { id: number; title: string }[];
  };
};

export default function Column({ column }: ColumnProps) {
  return (
    <div className="border-2 border-gray-300 rounded">
      {column.cards.map((card) => (
        <div key={card.id}>{card.title}</div>
      ))}
    </div>
  );
}