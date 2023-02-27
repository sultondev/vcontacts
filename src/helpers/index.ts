export function phoneMaskClean(phone: string) {
  return phone.replace(/[ -]/g, "");
}
