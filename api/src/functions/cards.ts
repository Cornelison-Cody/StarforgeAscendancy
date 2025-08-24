import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { CosmosClient } from "@azure/cosmos";

interface Card {
    id?: string;
    name: string;
    type: string;
    cost: Record<string, number>;
    tags: string[];
    effect_text: string;
    flavor_text: string;
    stats: { Attack: number; Defense: number } | null;
    power_rating: number;
    image?: string;
}

const client = new CosmosClient(process.env.DATABASE_CONNECTION_STRING!);
const database = client.database("starforgeascendancy");
const container = database.container("cards");

export async function cards(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    try {
        // Handle GET request
        if (request.method === 'GET') {
            const { resources: items } = await container.items.readAll().fetchAll();
            return {
                status: 200,
                jsonBody: items
            };
        }

        // Handle POST request for new cards
        if (request.method === 'POST') {
            const card = await request.json() as Card;

            // Validate required fields
            if (!card.name) {
                return {
                    status: 400,
                    jsonBody: { error: 'Card name is required' }
                };
            }

            // Check if card with same name already exists
            const { resources: existingCards } = await container.items
                .query({
                    query: "SELECT * FROM c WHERE c.name = @name",
                    parameters: [{ name: "@name", value: card.name }]
                })
                .fetchAll();

            if (existingCards.length > 0) {
                return {
                    status: 409,
                    jsonBody: { error: 'A card with this name already exists' }
                };
            }

            // Create the new card
            const { resource: newCard } = await container.items.create(card);
            return {
                status: 201,
                jsonBody: newCard
            };
        }

        // Handle PATCH request
        if (request.method === 'PATCH') {
            const card = await request.json() as Card;

            // Validate required fields
            if (!card.name) {
                return {
                    status: 400,
                    jsonBody: { error: 'Card name is required' }
                };
            }

            // Update the card
            const { resource: updatedCard } = await container.items
                .upsert(card);

            return {
                status: 200,
                jsonBody: updatedCard
            };
        }

        // Handle DELETE request
        if (request.method === 'DELETE') {
            const cardId = request.query.get('id');

            if (!cardId) {
                return {
                    status: 400,
                    jsonBody: { error: 'Card ID is required' }
                };
            }

            // Find the card by ID
            const { resources: existingCards } = await container.items
                .query({
                    query: "SELECT * FROM c WHERE c.id = @id",
                    parameters: [{ name: "@id", value: cardId }]
                })
                .fetchAll();

            if (existingCards.length === 0) {
                return {
                    status: 404,
                    jsonBody: { error: 'Card not found' }
                };
            }

            // Delete the card
            const cardToDelete = existingCards[0];
            context.info('Deleting card:', cardToDelete);

            // In Cosmos DB, we need both the id and partition key
            if (!cardToDelete.id) {
                return {
                    status: 500,
                    jsonBody: { error: 'Card document id not found' }
                };
            }

            try {
                await container.item(cardToDelete.id, cardToDelete.id).delete();
                return {
                    status: 200,
                    jsonBody: { message: 'Card deleted successfully' }
                };
            } catch (deleteError) {
                context.log('Error deleting card:', deleteError);
                return {
                    status: 500,
                    jsonBody: { error: 'Failed to delete card' }
                };
            }
        }

        // Handle unsupported methods
        return {
            status: 405,
            jsonBody: { error: 'Method not allowed' }
        };
    } catch (error) {
        context.log('Error processing request:', error);
        return {
            status: 500,
            jsonBody: { error: 'Internal server error' }
        };
    }
};

app.http('cards', {
    methods: ['GET', 'PATCH', 'POST', 'DELETE'],
    authLevel: 'anonymous',
    handler: cards
});
