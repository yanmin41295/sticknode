import { getInstance, init } from "ts-indexdb";

export enum Tables {
    sites = "sites",
    issues = "issues"
}

export async function initDb() {
    await init({
        dbName: "books",        // 数据库名称
        version: 1,             // 版本号
        tables: [
            {
                tableName: Tables.sites,         // 表名
                option: { keyPath: "id", autoIncrement: true }, // 指明主键为id
                indexs: [    // 数据库索引
                    {
                        key: "id",
                        option: {
                            unique: true
                        }
                    },
                    {
                        key: "title",
                        option: {
                            unique: true
                        }
                    },
                    {
                        key: "link",
                        option: {
                            unique: true
                        }
                    },
                    {
                        key: "detail",
                    },
                    {
                        key: "issue",
                    }
                ]
            }
        ]
    })
}


export async function queryAll(tableName: string) {
    return await getInstance().queryAll<any>({
        tableName
    });
}

export async function insert(tableName: string, data: any) {
    await getInstance().insert({
        tableName,
        data
    })
}

export async function update(tableName: string, data: any) {
    await getInstance().update_by_primaryKey({
        tableName,
        value: data.id,
        handle: (r: any) => {
            for (let dataKey in data) {
                r[dataKey] = data[dataKey];
            }
            return r
        }
    })
}

export async function deleteById(tableName: string, id: number) {
    await getInstance().delete_by_primaryKey({
        tableName,
        value: id
    })
}