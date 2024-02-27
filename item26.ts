async function fetch(url: string) {
  return await fetch(url);
}

async function fetchPages() {
  /*
   * Here TypeScript is able to infer the type of each response as "Response"
   */
  const [response1, response2, response3] = await Promise.all([
    fetch("https://google.com"),
    fetch("https://google.com"),
    fetch("https://google.com"),
  ]);
}
