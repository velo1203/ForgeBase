const forgebase = require("../src/index");

const db = new forgebase("./index.db");

const reference = db.setReference("iphone");

const iphones = [];

// for (let i = 0; i < 1000; i++) {
//     iphones.push({
//         name: `iphone ${i}`,
//         price: i * 1000,
//         color: "black",
//     });
// }
// for (let i = 0; i < 80; i++) {
//     reference.create(iphones);
// }
// const time = Date.now();
// reference.get({ name: "iphone 12" }).then((result) => {
//     console.log(result);
// });

reference
    .update({ color: "black" }, { color: "phone", name: "hello" })
    .then((result) => {
        console.log(result);
    });

// reference.get({ name: "hello" }).then((result) => {
//     console.log(result);
// });
