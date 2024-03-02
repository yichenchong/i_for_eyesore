export function matcher_match(str: string): boolean {
  const reg = new RegExp(str.replace(/\./g, '\\.').replace(/\*/g, '.*'));
  return reg.test(window.location.href);
}