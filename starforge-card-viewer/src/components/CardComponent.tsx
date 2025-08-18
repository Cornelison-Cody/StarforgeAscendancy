
import type { Card } from "../types/Card";

interface CardComponentProps {
  card: Card;
}

const cardTypeColors: Record<string, string> = {
  "Military Unit": "#2ec4ff",
  "Action": "#ff6f61",
  "Upgrade": "#ffe156",
  "Event": "#43d675",
  "Ally": "#b388ff"
};

const CardComponent: React.FC<CardComponentProps> = ({ card }) => {
  const borderColor = cardTypeColors[card.type] || "#fff";

  return (
    <div
      style={{
        fontFamily: 'Orbitron, "Segoe UI", Arial, sans-serif',
        border: `3px solid ${borderColor}`,
        borderRadius: 18,
        background: "linear-gradient(135deg, #232942 60%, #181c24 100%)",
        color: "#eaf6fb",
        boxShadow: "0 2px 12px #000a",
        padding: 0,
        width: 350,
        height: 500,
        minWidth: 350,
        minHeight: 500,
        maxWidth: 350,
        maxHeight: 500,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        position: "relative",
        overflow: "hidden"
      }}
    >
      {/* Header */}
      <div style={{
        background: "rgba(30,40,70,0.95)",
        padding: "8px 16px 4px 16px",
        borderBottom: `2px solid ${borderColor}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start"
      }}>
        <span style={{ fontWeight: 700, fontSize: 18, letterSpacing: 1 }}>{card.name}</span>
      </div>

      {/* Art Section */}
      <div style={{
        flex: 1,
        background: "radial-gradient(ellipse at 60% 40%, #2ec4ff22 0%, #232942 80%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: 60,
        minWidth: 60,
        overflow: "hidden"
      }}>
        {card.image ? (
          <img
            src={card.image}
            alt={card.name}
            style={{
              maxWidth: "100%",
              maxHeight: "100%",
              objectFit: "cover",
              borderRadius: 12,
              boxShadow: "0 2px 8px #000a"
            }}
          />
        ) : (
          <span style={{ color: "#444a", fontSize: 32, fontStyle: "italic" }}>Sci-Fi Art</span>
        )}
      </div>

      {/* Stats & Info */}
      <div style={{
        background: "rgba(24,28,36,0.98)",
        padding: 10,
        borderTop: `2px solid ${borderColor}`,
        display: "flex",
        flexDirection: "column",
        gap: 4
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ fontSize: 13, color: "#ffe156", fontWeight: 600 }}>
            Cost: {Object.entries(card.cost).map(([k, v]) => `${k[0]}:${v}`).join(" ")}
          </div>
          <div style={{ fontSize: 13, color: "#43d675", fontWeight: 600 }}>
            Power: {card.power_rating}
          </div>
        </div>
        {card.stats && (
          <div style={{ display: "flex", gap: 8, margin: "4px 0" }}>
            <span style={{ background: "#2ec4ff33", borderRadius: 6, padding: "2px 8px", fontWeight: 700, color: "#2ec4ff" }}>ATK {card.stats.Attack}</span>
            <span style={{ background: "#ffe15633", borderRadius: 6, padding: "2px 8px", fontWeight: 700, color: "#ffe156" }}>DEF {card.stats.Defense}</span>
          </div>
        )}
        <div style={{ fontSize: 12, color: "#b0b0b0", margin: "2px 0" }}>
          Tags: {card.tags.join(", ")}
        </div>
        <div style={{ fontSize: 13, color: "#ffd700", margin: "2px 0" }}>
          {card.effect_text}
        </div>
        <div style={{ fontSize: 11, color: "#a0a0a0", fontStyle: "italic", margin: "2px 0" }}>
          {card.flavor_text}
        </div>
      </div>
    </div>
  );
};

export default CardComponent;
