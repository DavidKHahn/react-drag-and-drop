import * as React from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { AuthorList } from "./AuthorList";
import { reorderColors } from "./reorder";
import { ColorMap } from './types';

const App = () => {
  const [colorMap, setColors] = React.useState<ColorMap>({
    a: ["blue", "red"],
    b: ["pink"],
    c: ["green"]
  });

  return (
    <DragDropContext onDragEnd={({ destination, source }) => {
      // // dropped outside the list
      if (!destination) {
        return;
      }

      setColors(reorderColors(colorMap, source, destination));
    }}
    >

      <div>
        {Object.entries(colorMap).map(([k, v]) => (
          <AuthorList
            internalScroll
            key={k}
            listId={k}
            listType="CARD"
            colors={v}
          />
        ))}
      </div>
    </DragDropContext>
    );
}

export default App;