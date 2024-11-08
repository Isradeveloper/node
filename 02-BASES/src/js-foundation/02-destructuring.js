const { SHELL } = process.env;

console.table({
  SHELL,
});

const characters = ['luke', 'leia', 'han', 'chewbacca'];

const [luke, leia, han, chewbacca] = characters;

console.table({
  luke,
  leia,
  han,
  chewbacca,
});
