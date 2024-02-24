# ForgeBase (under development)

ForgeBase utilizes three tables: entities, attributes, and relationships to make the database more flexible.

# Why ForgeBase?

For example, let's say you want to store information about users. You create an entity of type Person and give it attributes like name, age, and email password.

While traditional databases have a rigid schema, ForgeBase can easily adapt to different types of data and rapidly changing data models.

# Performance

The above library uses a local database based on sqlite. It uses a variant of the traditional EAV model to improve speed through query optimization: on a small project, fetching 1000 pieces of data at a time was in the range of about '20ms'.

The EAV model also provides a flexible schema by treating data as a table of entities, attributes, and values. It also requires complex queries. With the above library, you can manage the database with simple functions.
