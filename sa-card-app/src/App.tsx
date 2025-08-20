import { useEffect, useState } from "react";
import CardComponent from "./components/CardComponent";
import type { Card } from "./types/Card";


function App() {
  const [cards, setCards] = useState<Card[]>([]);
  useEffect(() => {
    fetch("/src/db/cards.json")
      .then((res) => res.json())
      .then(setCards)
      .catch(() => setCards([]));
  }, []);

  return (
    <div style={{ background: "#10131a", minHeight: "100vh", padding: 32 }}>
      <div style={{
        display: "flex",
        flexWrap: "wrap",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "flex-start",
        gap: 32,
        width: "100%",
        maxWidth: "100vw",
        margin: "0 auto"
      }}>
        {cards.map((card, idx) => (
          <CardComponent key={card.name + idx} card={card} />
        ))}
      </div>
    </div>
  );
}

export default App;
