import { useEffect, useState } from "react";
import CardComponent from "./components/CardComponent";
import EditCardForm from "./components/EditCardForm";
import type { Card } from "./types/Card";


function App() {
  const [cards, setCards] = useState<Card[]>([]);
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);

  useEffect(() => {
    fetch("/api/cards")
      .then((res) => res.json())
      .then((data) => {
        setCards(data || [])
      })
      .catch(() => setCards([]));
  }, []);

  const handleNewCard = () => {
    const emptyCard: Card = {
      name: "",
      type: "Military Unit",
      cost: {},
      tags: [],
      effect_text: "",
      flavor_text: "",
      stats: { Attack: 0, Defense: 0 },
      power_rating: 0
    };
    setSelectedCard(emptyCard);
  };

  const handleDeleteCard = async (cardToDelete: Card) => {
    if (!cardToDelete?.id) {
      console.error("Card ID is missing");
      return;
    }
    try {
      const response = await fetch(`/api/cards?id=${encodeURIComponent(cardToDelete?.id)}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete card");
      }

      setCards(cards.filter(card => card.name !== cardToDelete.name));
      setSelectedCard(null);
    } catch (error) {
      console.error("Error deleting card:", error);
    }
  };

  const handleSaveCard = async (cardToSave: Card) => {
    try {
      console.log('Saving card:', cardToSave);
      const isNewCard = !cards.some(c => c.name === cardToSave.name);
      const response = await fetch("/api/cards", {
        method: isNewCard ? "POST" : "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...cardToSave,
          image: cardToSave.image || undefined // Only include image if it exists
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update card");
      }

      const savedCard = await response.json();
      if (!response.ok) {
        throw new Error(savedCard.error || 'Failed to save card');
      }

      if (isNewCard) {
        setCards([...cards, savedCard]);
      } else {
        setCards(cards.map(card =>
          card.name === savedCard.name ? savedCard : card
        ));
      }
      setSelectedCard(null);
    } catch (error) {
      console.error("Error updating card:", error);
      // You might want to add error handling UI here
    }
  };

  return (
    <div style={{ background: "#10131a", minHeight: "100vh", padding: 32, position: "relative" }}>
      <div style={{ marginBottom: 20, textAlign: 'center' }}>
        <button
          onClick={handleNewCard}
          style={{
            padding: '10px 20px',
            background: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
          Create New Card
        </button>
      </div>
      {selectedCard && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(0,0,0,0.8)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 1000
        }}>
          <EditCardForm
            card={selectedCard}
            onSave={handleSaveCard}
            onCancel={() => setSelectedCard(null)}
            onDelete={handleDeleteCard}
          />
        </div>
      )}
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
          <CardComponent key={card.name + idx} card={card} onCardClick={setSelectedCard} />
        ))}
      </div>
    </div>
  );
}

export default App;
