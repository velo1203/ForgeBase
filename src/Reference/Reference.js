const Finder = require("../Finder/Finder");
const Creator = require("../Creator/Creator");
class Reference {
    constructor(EntityType, db) {
        this.Finder = new Finder(db);
        this.Creator = new Creator(db);
        this.EntityType = EntityType;
    }

    // 엔티티 생성
    async create(jsonQuery) {
        return this.Creator.create(this.EntityType, jsonQuery);
    }
    async get(jsonQuery) {
        return this.Finder.get(jsonQuery, this.EntityType);
    }

    async getAll() {
        return this.Finder.getAll(this.EntityType);
    }
}

module.exports = { Reference };
