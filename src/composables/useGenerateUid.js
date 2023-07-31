export function uid(length) {
    const characters = [
        0,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        "a",
        "b",
        "c",
        "d",
        "e",
        "f",
        "n",
        "r",
        "u",
        "x",
        "z"
      ];
      const generated = Array.from({ length }, () => {
        const randomIndex = Math.floor(Math.random() * characters.length);
        return characters[randomIndex];
      });
  
      return generated.join("");
}