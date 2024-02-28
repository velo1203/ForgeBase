const Database = require("./DataBase/DataBase");
const { Reference } = require("./Reference/Reference");

class ForgeBase {
    constructor(DataBasePath) {
        this.db = new Database(DataBasePath);
    }

    setReference(EntityType) {
        return new Reference(EntityType, this.db);
    }
}

const forgeBase = new ForgeBase("./ForgeBase.db");

const userRef = forgeBase.setReference("User");
const productRef = forgeBase.setReference("Product");

// 데이터 검색 작업 시작 시간 기록
const startTime = Date.now();

productRef.get({ name: "iphone1", price: 1 }, false).then((res) => {
    // 데이터 검색 작업 완료 시간 기록
    const endTime = Date.now();

    // 시작 시간과 종료 시간의 차이를 계산하여 작업에 걸린 시간을 구함
    const duration = endTime - startTime;

    // 결과와 걸린 시간을 콘솔에 출력
    console.log(res);
    console.log(`Data retrieval took ${duration} milliseconds.`);
});
