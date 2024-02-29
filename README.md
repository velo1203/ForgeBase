# ForgeBase

ForgeBase is a very simple local database management library that utilizes three main tables - Entity, Attribute, and Relationship - to create a flexible database structure. This gives it the ability to easily adapt to different types of data and rapidly changing data models.

# Overview

ForgeBase simplifies common database tasks, such as storing user information, by allowing users to create entities of type Person and give them attributes such as name, age, email, and password. While traditional database systems are rigid when it comes to schema changes, ForgeBase goes beyond those constraints to provide greater flexibility.

# Features

-   `Flexibility`: Structure utilizing entities, attributes, and relationships lends itself to different types of data and changing data models.

-   `Performance`: The use of a local database and query optimization based on SQLite provides excellent performance. For example, the time to fetch 1000 pieces of data in a small project is about 12 ms.

-   `Simplicity`: Complex queries may be required, but ForgeBase handles this complexity internally, allowing users to manage the database with simple function calls.

-   `Performance metrics`
    ForgeBase's performance is noteworthy: When searching for a specific entity, it takes an average of 14 ms to process a thousand pieces of data. This is achieved using a variant of the Entity-Attribute-Value (EAV) model, which provides both flexible schema management and fast data processing speeds.

# docs

[Docs URL ](https://www.npmjs.com/package/forgebase?activeTab=readme#start-the-installation)
