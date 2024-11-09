// const { emailTemplate } = require('./js-foundation/01-template');
// require('./js-foundation/02-destructuring');
// const { getUserById } = require("./js-foundation/03-callbacks");
// const { getUserById } = require("./js-foundation/04-arrow");

// const id = 2;

// getUserById(id, function (error, user) {
//   if (error) throw new Error(error);

//   console.log(user);
// });

// console.log(emailTemplate);

//! REFERENCIA A FACTORY FUNCTIONS
// const { getAge, getUUID } = require("./plugins");
// const { buildMakePerson } = require("./js-foundation/05-factory");

// const makePerson = buildMakePerson({
//   getAge,
//   getUUID,
// });

// const obj = {
//   name: "John Doe",
//   birthday: "2002-05-31",
// };

// const john = makePerson(obj);

// console.log(john);

const { getPokemonById } = require("./js-foundation/06-promises");

getPokemonById(3)
  .then((pokemon) => {
    console.log({pokemon});
  })
  .catch((error) => {
    console.error(error);
  })
  .finally(() => {
    console.log("Pokemon fetched");
  });
