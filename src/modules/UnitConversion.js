export default function UnitConversion() {
  let isF = true;

  function toFarenheit(celsius) {
    return (celsius * 9) / 5 + 32;
  }
  function toCelsius(farenheit) {
    return (((farenheit - 32) * 5) / 9).toFixed(1);
  }

  function toggleUnit() {
    isF = !isF;
  }

  function isFarenheit() {
    return isF;
  }

  return { toFarenheit, toCelsius, toggleUnit, isFarenheit };
}
