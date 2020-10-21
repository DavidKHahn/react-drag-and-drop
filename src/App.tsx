import * as React from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { generate } from "shortid";
import { AuthorList } from "./AuthorList";
import images from './images.json';
import { reorder, reorderRows } from "./reorder";

const aId = generate();
const unrankedId = generate();

const App = () => {
  const [rows, setRows] = React.useState([
    { id: aId, label: "a", urls: [] },
    {
      id: unrankedId,
      label: "unranked",
      urls: images
    }
  ]);

  React.useEffect(() => {
    const data = localStorage.getItem("tier-list");
    if (data) {
      setRows(JSON.parse(data));
    }
  }, []);

  React.useEffect(() => {
    localStorage.setItem("tier-list", JSON.stringify(rows))
  });

  return (
    <DragDropContext
      onDragEnd={({ destination, source }) => {
        // // dropped outside the list
        if (!destination) {
          return;
        }

        setRows(reorderRows(rows, source, destination));
      }}
    >
      <div>
        <button
          onClick={() => {
            setRows([
              {
                id: generate(),
                label: "",
                urls: []
              },
              ...rows
            ]);
          }}
        >
          add row
        </button>
        {rows.map((row, i) => (
          <AuthorList
          onUp={() => setRows(reorder(rows, i, i - 1))}
          onDown={() => setRows(reorder(rows, i, i + 1))}
          onLabelChange={newText => setRows(rows.map(x => x.id === row.id ? {...row, label: newText } : x))}
            internalScroll
            key={row.id}
            listId={row.id}
            listType="CARD"
            row={row}
          />
        ))}
      </div>
    </DragDropContext>
  );
};

export default App;