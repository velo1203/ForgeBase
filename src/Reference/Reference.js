const Finder = require("../Finder/Finder");
const Creator = require("../Creator/Creator");
const Deleter = require("../Deleter/Deleter");
const Updater = require("../Updater/Updater");
class Reference {
    constructor(EntityType, db) {
        this.Finder = new Finder(db);
        this.Creator = new Creator(db);
        this.EntityType = EntityType;
        this.Deleter = new Deleter(db);
        this.Updater = new Updater(db);
    }

    // 엔티티 생성
    async create(jsonQuery) {
        // jsonQuery가 배열인 경우
        if (Array.isArray(jsonQuery)) {
            return this.Creator.bulk(this.EntityType, jsonQuery);
        } else {
            // jsonQuery가 객체인 경우
            return this.Creator.create(this.EntityType, jsonQuery);
        }
    }

    async get(jsonQuery) {
        const result = await this.Finder.get(jsonQuery, this.EntityType);
        return this.Finder.getByIds(result);
    }

    async getAll() {
        return this.Finder.getAll(this.EntityType);
    }

    async delete(jsonQuery) {
        const result = await this.Finder.get(jsonQuery, this.EntityType); //data ids
        return this.Deleter.delete(this.EntityType, result); //아이디들을 매게변수로 넘겨줌
    }

    async update(targetQuery, updateQuery) {
        const result = await this.Finder.get(targetQuery, this.EntityType); //data ids
        return this.Updater.update(this.EntityType, result, updateQuery);
    }
}

module.exports = { Reference };
