import type { Card } from "../types/Card";

export async function fetchCards(): Promise<Card[]> {
  const response = await fetch("/src/db/cards.json");
  if (!response.ok) throw new Error("Failed to fetch cards");
  return response.json();
}
