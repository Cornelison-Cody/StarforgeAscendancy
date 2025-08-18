export type Card = {
  name: string;
  type: string;
  cost: Record<string, number>;
  tags: string[];
  effect_text: string;
  flavor_text: string;
  stats: { Attack: number; Defense: number } | null;
  power_rating: number;
  image?: string;
};
