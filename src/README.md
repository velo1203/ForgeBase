# Start the installation.

```javascript
npm install forgebase
```

# Create a new database.

```javascript
const forgebase = require("forgebase");
const db = new forgebase("./database.db");
```

The code above loads forgebase and sets the database address for forgebase. forgebase is a local database.

# Create Reference

```javascript
const reference = db.setReference("iphone");
```

First, let's create a reference named user. The create read update delete operations that occur on a user reference will work with respect to the entity named user.

# Create a new entity.

```javascript
reference.create({ name: "devho", age: 17 });
```

The above code will create an entity named user with the name dev and an age of 17.

Thinking more deeply, forgebase's storage method stores entities and attributes in separate tables and rows: age is an attribute and 17 is the value of that attribute, creating an attribute for the center entity.

# Read an entity.

```javascript
reference.get({ name: "devho" });
```

The above code will list a list of entities with the name devho.

```javascript
reference.getAll();
```

You can also get all entities in that reference.

# Update an entity.

```javascript
reference.update({ name: "devho" }, { age: 18 });
```

`targetQuery`, `updateQuery` : parameter of `update` method.

The above code will update the age of the entity with the name devho to 18.

# Delete an entity.

```javascript
reference.delete({ name: "devho" });
```

The above code will delete the entity with the name devho.
