export function getCountryCurrency(countryCode: string) {
  // if in Brazil, return BRL
  if (countryCode === "BR") return "R$";

  // everywhere else, return USD
  return "$";
}
