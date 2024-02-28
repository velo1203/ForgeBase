const forgebase = require("../src/index");

const db = new forgebase("./index.db");

const reference = db.setReference("iphone");

// reference.create({
//     name: "iphone 12",
//     price: 1000000,
//     color: "black",
// });

reference.get({ name: "iphone 12" }).then((result) => {
    console.log(result);
});
