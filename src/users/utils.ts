export function generateRandomUsername() {
  const usr = 'u';

  const firstAlphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const firstIdx = Math.floor(Math.random() * firstAlphabet.length);
  const firstRandom = firstAlphabet[firstIdx];

  const secondAlphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let secondRandom = '';

  for (let i = 0; i < 6; i++) {
    const secondIndex = Math.floor(Math.random() * secondAlphabet.length);
    secondRandom += secondAlphabet[secondIndex];
  }

  return usr + firstRandom + secondRandom;
}
