import { useState } from 'react';
import type { Card } from '../types/Card';
import { uploadImageToBlob } from '../utils/blobStorage';

interface EditCardFormProps {
    card: Card;
    onSave: (updatedCard: Card) => void;
    onCancel: () => void;
    onDelete?: (card: Card) => void;
}

const EditCardForm: React.FC<EditCardFormProps> = ({ card, onSave, onCancel, onDelete }) => {
    const [editedCard, setEditedCard] = useState<Card>({ ...card });
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [uploading, setUploading] = useState(false);

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        console.log('Starting image upload:', { fileName: file.name, fileSize: file.size });
        setUploading(true);
        try {
            const url = await uploadImageToBlob(file);
            console.log('Upload successful, image URL:', url);
            setEditedCard(prev => ({ ...prev, image: url }));
        } catch (error) {
            console.error('Error uploading image:', error);
            alert('Failed to upload image. Please try again.');
        } finally {
            setUploading(false);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(editedCard);
    };

    return (
        <div className="edit-card-form" style={{
            background: '#232942',
            padding: '20px',
            borderRadius: '10px',
            color: 'white',
            width: '100%',
            maxWidth: '500px'
        }}>
            <h2>Edit Card</h2>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '15px' }}>
                    <label>
                        Name:
                        <input
                            type="text"
                            value={editedCard.name}
                            onChange={(e) => setEditedCard({ ...editedCard, name: e.target.value })}
                            style={{ width: '100%', padding: '8px', marginTop: '5px', background: '#10131a', color: 'white', border: '1px solid #444' }}
                        />
                    </label>
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <label>
                        Type:
                        <select
                            value={editedCard.type}
                            onChange={(e) => setEditedCard({ ...editedCard, type: e.target.value })}
                            style={{ width: '100%', padding: '8px', marginTop: '5px', background: '#10131a', color: 'white', border: '1px solid #444' }}
                        >
                            <option value="Military Unit">Military Unit</option>
                            <option value="Action">Action</option>
                            <option value="Upgrade">Upgrade</option>
                            <option value="Event">Event</option>
                            <option value="Ally">Ally</option>
                        </select>
                    </label>
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <label>
                        Effect Text:
                        <textarea
                            value={editedCard.effect_text}
                            onChange={(e) => setEditedCard({ ...editedCard, effect_text: e.target.value })}
                            style={{ width: '100%', padding: '8px', marginTop: '5px', background: '#10131a', color: 'white', border: '1px solid #444', minHeight: '100px' }}
                        />
                    </label>
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <label>
                        Flavor Text:
                        <textarea
                            value={editedCard.flavor_text}
                            onChange={(e) => setEditedCard({ ...editedCard, flavor_text: e.target.value })}
                            style={{ width: '100%', padding: '8px', marginTop: '5px', background: '#10131a', color: 'white', border: '1px solid #444' }}
                        />
                    </label>
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <label>
                        Power Rating:
                        <input
                            type="number"
                            value={editedCard.power_rating}
                            onChange={(e) => setEditedCard({ ...editedCard, power_rating: Number(e.target.value) })}
                            style={{ width: '100%', padding: '8px', marginTop: '5px', background: '#10131a', color: 'white', border: '1px solid #444' }}
                        />
                    </label>
                </div>
                {editedCard.stats && (
                    <>
                        <div style={{ marginBottom: '15px' }}>
                            <label>
                                Attack:
                                <input
                                    type="number"
                                    value={editedCard.stats.Attack}
                                    onChange={(e) => setEditedCard({
                                        ...editedCard,
                                        stats: { ...editedCard.stats!, Attack: Number(e.target.value) }
                                    })}
                                    style={{ width: '100%', padding: '8px', marginTop: '5px', background: '#10131a', color: 'white', border: '1px solid #444' }}
                                />
                            </label>
                        </div>
                        <div style={{ marginBottom: '15px' }}>
                            <label>
                                Defense:
                                <input
                                    type="number"
                                    value={editedCard.stats.Defense}
                                    onChange={(e) => setEditedCard({
                                        ...editedCard,
                                        stats: { ...editedCard.stats!, Defense: Number(e.target.value) }
                                    })}
                                    style={{ width: '100%', padding: '8px', marginTop: '5px', background: '#10131a', color: 'white', border: '1px solid #444' }}
                                />
                            </label>
                        </div>
                    </>
                )}
                <div style={{ marginBottom: '15px' }}>
                    <label>
                        Card Image:
                        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                style={{
                                    width: '100%',
                                    padding: '8px',
                                    marginTop: '5px',
                                    background: '#10131a',
                                    color: 'white',
                                    border: '1px solid #444'
                                }}
                            />
                            {uploading && <span>Uploading...</span>}
                        </div>
                        {editedCard.image && (
                            <div style={{ marginTop: '10px' }}>
                                <img
                                    src={editedCard.image}
                                    alt="Card Preview"
                                    style={{
                                        maxWidth: '200px',
                                        border: '1px solid #444',
                                        borderRadius: '4px'
                                    }}
                                />
                            </div>
                        )}
                    </label>
                </div>
                <div style={{ display: 'flex', gap: '10px', justifyContent: 'space-between', alignItems: 'center' }}>
                    {card.name && onDelete && (
                        <button
                            type="button"
                            onClick={() => setShowDeleteConfirm(true)}
                            style={{
                                padding: '8px 16px',
                                background: '#dc3545',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer'
                            }}
                        >
                            Delete Card
                        </button>
                    )}
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <button
                            type="button"
                            onClick={onCancel}
                            style={{
                                padding: '8px 16px',
                                background: '#444',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer'
                            }}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            style={{
                                padding: '8px 16px',
                                background: '#4CAF50',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer'
                            }}
                        >
                            Save
                        </button>
                    </div>
                </div>
            </form>
            {showDeleteConfirm && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'rgba(0,0,0,0.8)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 1100
                }}>
                    <div style={{
                        background: '#232942',
                        padding: '20px',
                        borderRadius: '10px',
                        maxWidth: '400px',
                        textAlign: 'center'
                    }}>
                        <h3 style={{ marginBottom: '20px' }}>Delete Card?</h3>
                        <p style={{ marginBottom: '20px' }}>
                            Are you sure you want to delete "{card.name}"? This action cannot be undone.
                        </p>
                        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                            <button
                                onClick={() => setShowDeleteConfirm(false)}
                                style={{
                                    padding: '8px 16px',
                                    background: '#444',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '4px',
                                    cursor: 'pointer'
                                }}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => {
                                    if (onDelete) {
                                        onDelete(card);
                                        setShowDeleteConfirm(false);
                                    }
                                }}
                                style={{
                                    padding: '8px 16px',
                                    background: '#dc3545',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '4px',
                                    cursor: 'pointer'
                                }}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EditCardForm;
