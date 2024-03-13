// ნორმალურ შემთხვევაში წლების ინტერვალი სერვერიდან მოდის
export function getYears() {
  const arr = [];
  for (let i = 2002; i >= 1942; i--) {
    arr.push(i);
  }
  return arr;
}
