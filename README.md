# ForgeBase (Development in Progress)

ForgeBase utilizes three tables, Entitie, Attributes, and Relationships, to allow for a more flexible way of using the database.

# Why ForgeBase?

For example, let's store information about a user. We create an entity of type Person and give it Attributes such as name, age, and email password.

While traditional databases have rigid schemas, ForgeBase makes it easy to adapt to different types of data and rapidly changing data models.

# Structure

The database management structure of this library uses the `EAV+R` structure. It is basically composed of entities, attributes, and values, and to better manage entities and relationships between entities, a model called relationships is introduced.
