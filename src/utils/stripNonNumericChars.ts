export default function(str: string) {
  return str === '' ? str : str.replace(/\D/g,'');
}
