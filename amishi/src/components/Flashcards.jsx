import React, { useState, useEffect } from "react";
import Flashcard from "./Flashcard";

const API_URL = "http://localhost:5050";

// Replace this with actual user ID from context/auth
const USER_ID = "665f7933556c0803042a6f04"; // <-- replace with real user ID

const Flashcards = () => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await fetch(`${API_URL}/flashcards/user/${USER_ID}`);
        if (!response.ok) {
          throw new Error('Failed to fetch flashcards');
        }
        const data = await response.json();
        setCards(data);
      } catch (err) {
        console.error('Error fetching flashcards:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCards();
  }, []);

  const handleStatusChange = async (cardId, newStatus) => {
    try {
      const response = await fetch(`${API_URL}/flashcards/progress`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: USER_ID,
          flashcardId: cardId,
          status: newStatus,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update card status');
      }

      // Update local UI state
      setCards(cards.map(card => 
        card._id === cardId ? { ...card, status: newStatus } : card
      ));
    } catch (err) {
      console.error('Error updating card status:', err);
    }
  };

  if (loading) return <div>Loading flashcards...</div>;
  if (error) return <div>Error: {error}</div>;
  if (cards.length === 0) return <div>No flashcards available.</div>;

  return (
    <div className="flashcards-grid">
      {cards.map(card => (
        <Flashcard 
          key={card._id} 
          card={card} 
          onStatusChange={handleStatusChange}
        />
      ))}
    </div>
  );
};

export default Flashcards;
