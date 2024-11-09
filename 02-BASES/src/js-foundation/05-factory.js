// const { getAge, getUUID } = require("../plugins");

// const buildPerson = ({ name, birthday }) => {
//   return {
//     id: getUUID(),
//     name,
//     birthday,
//     age: getAge(birthday),
//   };
// };

// const john = buildPerson(obj);

// console.log(john);

const buildMakePerson = ({ getUUID, getAge }) => {
  return ({ name, birthday }) => {
    return {
      id: getUUID(),
      name,
      birthday,
      age: getAge(birthday),
    };
  };
};

module.exports = {
  buildMakePerson,
};
