
export function changeCursor(cursor: string): void {
  const html = document.getElementsByTagName("html")[0];
  html.setAttribute('data-mouse', cursor);
}

export function clearCursor(): void {
  const html = document.getElementsByTagName("html")[0];
  html.removeAttribute('data-mouse');
}
