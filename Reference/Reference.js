const Attributes = require("../Attributes/Attributes");
const Entity = require("../Entity/Entity");
const Finder = require("../Finder/Finder");
const Relation = require("../Relation/Relation");
const Value = require("../Value/Value");

class Reference {
    constructor(EntityType, db) {
        this.entity = new Entity(db);
        this.attributes = new Attributes(db);
        this.relation = new Relation(db);
        this.value = new Value(db);
        this.Finder = new Finder(db);
        this.EntityType = EntityType;
    }

    // 엔티티 생성
    async create(jsonQuery) {
        const Entity_id = await this.entity.create(this.EntityType);
        const promises = Object.keys(jsonQuery).map(async (attribute) => {
            const Attr_id = await this.attributes.create(attribute);
            return this.value.create(Entity_id, Attr_id, jsonQuery[attribute]);
        });
        await Promise.all(promises);
    }
    async get(jsonQuery) {
        return this.Finder.get(jsonQuery);
    }

    async getAll() {
        return this.Finder.getAll();
    }
}

module.exports = { Reference };
