export default function priceCalc(oprice, nprice, amount) {
  const coins = amount / oprice;
  return coins * nprice;
}
