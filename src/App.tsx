import React, { useState } from "react";
import "./App.css";
import AlphabetTiles from "./components/AlphabetTileInteraction";

type Partition = {
  id: string;
  color: string;
  direction?: "horizontal" | "vertical";
  children?: Partition[];
};

const generateRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const PartitionComponent: React.FC<{
  partition: Partition;
  onSplit: (id: string, direction: "horizontal" | "vertical") => void;
  onRemove: (id: string) => void;
}> = ({ partition, onSplit, onRemove }) => {
  return (
    <div className="partition" style={{ backgroundColor: partition?.color }}>
      <button onClick={() => onSplit(partition.id, "vertical")}>V</button>
      <button onClick={() => onSplit(partition.id, "horizontal")}>H</button>
      <button onClick={() => onRemove(partition.id)}>Remove</button>
      {partition.children && (
        <div
          className={
            partition.direction === "vertical" ? "vertical-split" : "horizontal-split"
          }
        >
          {partition?.children?.map((child) => (
            <PartitionComponent
              key={child?.id}
              partition={child}
              onSplit={onSplit}
              onRemove={onRemove}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const App: React.FC = () => {
  const [partitions, setPartitions] = useState<Partition[]>([
    { id: "root", color: generateRandomColor() },
  ]);

  const handleSplit = (id: string, direction: "horizontal" | "vertical") => {
    const splitPartition = (partition: Partition): Partition => {
      if (partition?.id === id) {
        const newColor = generateRandomColor();
        return {
          ...partition,
          direction,
          children: [
            { id: `${id}-1`, color: partition?.color },
            { id: `${id}-2`, color: newColor },
          ],
        };
      }
      if (partition?.children) {
        return {
          ...partition,
          children: partition?.children?.map(splitPartition),
        };
      }
      return partition;
    };
    setPartitions(partitions?.map(splitPartition));
  };

  const handleRemove = (id: string) => {
    const removePartition = (partition: Partition): Partition | null => {
      if (partition?.id === id) {
        return null;
      }
      if (partition?.children) {
        return {
          ...partition,
          children: partition?.children
            ?.map(removePartition)
            ?.filter((p) => p !== null) as Partition[],
        };
      }
      return partition;
    };
    setPartitions(partitions?.map(removePartition)?.filter((p) => p !== null) as Partition[]);
  };

  return (
    <div className="app">
      {partitions?.map((partition) => (
        <PartitionComponent
          key={partition?.id}
          partition={partition}
          onSplit={handleSplit}
          onRemove={handleRemove}
        />
      ))}

{/* Alphabet Tile Interaction  */}
      <AlphabetTiles/>
    </div>
  );
};

export default App;
