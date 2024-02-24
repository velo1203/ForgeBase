const Attributes = require("../Attributes/Attributes");
const Entity = require("../Entity/Entity");
const Relation = require("../Relation/Relation");
const Value = require("../Value/Value");

class Reference {
    constructor(EntityType, db) {
        this.entity = new Entity(db);
        this.attributes = new Attributes(db);
        this.relation = new Relation(db);
        this.value = new Value(db);
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
        const attributeEntityIdsMap = {};
        const finalResults = [];

        // 각 속성에 대해 검색 실행
        for (const [attribute, value] of Object.entries(jsonQuery)) {
            const results = await this.value.findByValue(value);
            const attributesResults = await Promise.all(
                results.map((result) =>
                    this.attributes.findById(result.AttributeID)
                )
            );

            // 각 속성에 대한 엔티티 ID 목록 저장
            attributesResults.forEach((attr, index) => {
                if (attr.AttributeName === attribute) {
                    const entityId = results[index].EntityID;
                    attributeEntityIdsMap[attribute] =
                        attributeEntityIdsMap[attribute] || new Set();
                    attributeEntityIdsMap[attribute].add(entityId);
                }
            });
        }

        // 모든 속성에 대한 엔티티 ID 목록의 교집합 계산
        const entitySets = Object.values(attributeEntityIdsMap);
        const commonEntityIds = entitySets.reduce((acc, entityIdSet) => {
            if (!acc) return entityIdSet;
            return new Set([...acc].filter((id) => entityIdSet.has(id)));
        }, entitySets.shift() || new Set());

        // 교집합으로부터 최종 엔티티 ID 목록 추출
        for (const entityId of commonEntityIds) {
            const entityValues = await this.value.findByEntityId(entityId);
            const entityResult = {};

            for (const entityValue of entityValues) {
                const attribute = await this.attributes.findById(
                    entityValue.AttributeID
                );
                entityResult[attribute.AttributeName] = entityValue.Value;
            }

            finalResults.push(entityResult);
        }

        return finalResults; // 최종 결과 반환
    }

    async getAll() {
        const Entity_id = await this.entity.findAllByType(this.EntityType);
        const result = [];
        for (let i = 0; i < Entity_id.length; i++) {
            const Entity = Entity_id[i];
            const EntityValues = await this.value.findByEntityId(
                Entity.EntityID
            );
            const EntityResult = {};
            for (let j = 0; j < EntityValues.length; j++) {
                const EntityValue = EntityValues[j];
                const Attribute = await this.attributes.findById(
                    EntityValue.AttributeID
                );
                EntityResult[Attribute.AttributeName] = EntityValue.Value;
            }
            result.push(EntityResult);
        }
        return result;
    }
}

module.exports = { Reference };
