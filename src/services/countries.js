const countries = [
  { name: "Georgia ( საქართველო)", code: "ge", phoneCode: "+995" },
  { name: "Turkey (Türkiye)", code: "tr", phoneCode: "+90" },
  { name: "Russia (Россия)", code: "ru", phoneCode: "+7" },
  { name: "Azerbaijan (Azərbaycan)", code: "az", phoneCode: "+994" },
  { name: "Armenia (Հայաստան)", code: "am", phoneCode: "+374" },
  { name: "Ukraine (Україна)", code: "ua", phoneCode: "+380" },
  { name: "Kazakhstan (Казахстан)", code: "kz", phoneCode: "+7" },
  { name: "Belarus (Беларусь)", code: "by", phoneCode: "+375" },
];

export function getCountries() {
  return countries;
}
