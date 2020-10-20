import * as React from "react";
import './App.css';

const App = () => {
  const [colors, setColors] = React.useState({
    a: ["blue", "red"],
    b: ["pink"],
    c: ["green"]
  });

  return <div>hello</div>;
}

export default App;