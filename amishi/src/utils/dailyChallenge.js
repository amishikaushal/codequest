export const getDateString = () => {
  return new Date().toISOString().split('T')[0];
};

export const getRandomChallenge = (challenges) => {
  if (!challenges || challenges.length === 0) return null;
  
  // Get today's date string to use as seed
  const dateStr = getDateString();
  
  // Create a seeded random number based on the date
  let seedValue = Array.from(dateStr).reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const seededRandom = () => {
    seedValue = (seedValue * 9301 + 49297) % 233280;
    return seedValue / 233280;
  };
  
  // Use the seeded random to get today's challenge
  const index = Math.floor(seededRandom() * challenges.length);
  return challenges[index];
};