import { describe, it, expect } from "vitest";
import { ScrapeTypesManager } from "./types-manager";
import ts from "typescript";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { fileURLToPath, pathToFileURL } from "node:url";
import { join } from "node:path";
import { tmpdir } from "node:os";
import { randomUUID } from "node:crypto";
import { cp, mkdir, rmdir, symlink, writeFile } from "node:fs/promises";

function collectCode(code: Generator<string>): string {
    let result: string[] = [];
    for (const line of code) {
        result.push(line);
    }
    return result.join('');
}

async function importTypescriptCode<T = any>(code: string): Promise<T> {
    const jsCode = ts.transpileModule(code, {
        compilerOptions: {
            module: ts.ModuleKind.ESNext,
            target: ts.ScriptTarget.ESNext,
            strict: true,
            esModuleInterop: true,
            experimentalDecorators: true,
            emitDecoratorMetadata: true,
            skipLibCheck: true,
        },
    });

    const tmp = join(tmpdir(), `poe-accountant-${randomUUID()}`);
    const tmpfile = join(tmp, 'tmp.js');
    await mkdir(tmp, { recursive: true });
    await writeFile(tmpfile, jsCode.outputText);
    await cp(join(fileURLToPath(import.meta.url), '../../dist'), join(tmp), { recursive: true });
    await symlink(
        join(fileURLToPath(import.meta.url), '../../node_modules'),
        join(tmp, 'node_modules'),
        'junction'
    );

    try {
        return await import(pathToFileURL(tmpfile).href);
    }
    finally {
        await rmdir(tmp, { recursive: true });
    }
}

describe('ScrapeTypesManager', () => {
    it('should be defined', () => {
        expect(ScrapeTypesManager).toBeDefined();
    });

    it('should create an instance', () => {
        const manager = new ScrapeTypesManager([]);
        expect(manager).toBeInstanceOf(ScrapeTypesManager);
    });

    it('should register an enum', async () => {
        const manager = new ScrapeTypesManager([
            {
                type: 'enum',
                name: 'Test',
                details: {
                    values: new Map<number, string>([
                        [1, 'One'],
                        [2, 'Two'],
                    ]),
                },
            }
        ]);

        const module = await importTypescriptCode(collectCode(manager.generateTypeScriptTypes()));

        expect(module.Test).toBeDefined();
        expect(module.Test.One).toBe(1);
        expect(module.Test.Two).toBe(2);
    });

    it('should register a class', async () => {
        const manager = new ScrapeTypesManager([
            {
                type: 'object',
                name: 'Test',
                details: [
                    {
                        key: 'prop1',
                        valueType: 'string',
                    },
                    {
                        key: 'prop2',
                        valueType: 'int',
                    }
                ],
            }
        ]);


        const module = await importTypescriptCode(collectCode(manager.generateTypeScriptTypes()));

        expect(module.Test).toBeDefined();
        const obj = plainToInstance(module.Test, {
            prop1: 'test',
            prop2: 123,
        }) as any;
        expect(obj).toBeInstanceOf(module.Test);
        expect(obj.prop1).toBe('test');
        expect(obj.prop2).toBe(123);

        const errors = await validate(obj);
        expect(errors).toStrictEqual([]);
    });

    it('should validate a class with dictionary properly', async () => {
        const manager = new ScrapeTypesManager([
            {
                type: 'object',
                name: 'Test',
                details: [
                    {
                        key: 'prop1',
                        valueType: 'dictionary of string',
                    },
                    {
                        key: 'prop2',
                        valueType: 'int',
                    }
                ],
            }
        ]);

        const module = await importTypescriptCode(collectCode(manager.generateTypeScriptTypes()));

        expect(module.Test).toBeDefined();
        const obj = plainToInstance(module.Test, {
            prop1: {
                test: 'test',
            },
            prop2: 123,
        }) as any;
        expect(obj).toBeInstanceOf(module.Test);
        expect(obj.prop1.constructor.name).toBe('Dictionary');
        expect(obj.prop1.test).toBe('test');
        expect(obj.prop2).toBe(123);

        const errors = await validate(obj);
        expect(errors).toStrictEqual([]);
    });

    it('should fail to validate a class with dictionary with incorrect types', async () => {
        const manager = new ScrapeTypesManager([
            {
                type: 'object',
                name: 'Test',
                details: [
                    {
                        key: 'prop1',
                        valueType: 'dictionary of string',
                    },
                    {
                        key: 'prop2',
                        valueType: 'int',
                    }
                ],
            }
        ]);
        const module = await importTypescriptCode(collectCode(manager.generateTypeScriptTypes()));
        expect(module.Test).toBeDefined();
        const obj = plainToInstance(module.Test, {
            prop1: {
                test: 123, // Incorrect type
            },
            prop2: 123,
        }) as any;
        expect(obj).toBeInstanceOf(module.Test);
        expect(obj.prop1.constructor.name).toBe('Dictionary');
        expect(obj.prop1.test).toBe(123);
        expect(obj.prop2).toBe(123);
        const errors = await validate(obj);
        expect(errors.length).toBeGreaterThan(0);

        
        const obj2 = plainToInstance(module.Test, {
            prop1: {
                test: [123], // Incorrect type
            },
            prop2: 123,
        }) as any;
        expect(obj2).toBeInstanceOf(module.Test);
        expect(obj2.prop1.constructor.name).toBe('Dictionary');
        expect(obj2.prop1.test).toEqual([123]);
        expect(obj2.prop2).toBe(123);
        const errors2 = await validate(obj2);
        expect(errors2.length).toBeGreaterThan(0);
    });

    it('should validate a class with dictionary of arrays properly', async () => {
        const manager = new ScrapeTypesManager([
            {
                type: 'object',
                name: 'Test',
                details: [
                    {
                        key: 'prop1',
                        valueType: 'dictionary of array of string',
                    },
                    {
                        key: 'prop2',
                        valueType: 'int',
                    }
                ],
            }
        ]);

        const module = await importTypescriptCode(collectCode(manager.generateTypeScriptTypes()));

        expect(module.Test).toBeDefined();
        const obj = plainToInstance(module.Test, {
            prop1: {
                test: ['test1', 'test2'],
            },
            prop2: 123,
        }) as any;
        expect(obj).toBeInstanceOf(module.Test);
        expect(obj.prop1.constructor.name).toBe('Dictionary');
        expect(obj.prop1.test).toEqual(['test1', 'test2']);
        expect(obj.prop2).toBe(123);

        const errors = await validate(obj);
        expect(errors).toStrictEqual([]);
    });

    it('should fail to validate a class with dictionary of arrays with incorrect types', async () => {
        const manager = new ScrapeTypesManager([
            {
                type: 'object',
                name: 'Test',
                details: [
                    {
                        key: 'prop1',
                        valueType: 'dictionary of array of string',
                    },
                    {
                        key: 'prop2',
                        valueType: 'int',
                    }
                ],
            }
        ]);

        const module = await importTypescriptCode(collectCode(manager.generateTypeScriptTypes()));

        expect(module.Test).toBeDefined();
        const obj = plainToInstance(module.Test, {
            prop1: {
                test: ['test1', 123], // Incorrect type
            },
            prop2: 123,
        }) as any;
        expect(obj).toBeInstanceOf(module.Test);
        expect(obj.prop1.constructor.name).toBe('Dictionary');
        expect(obj.prop1.test).toEqual(['test1', 123]);
        expect(obj.prop2).toBe(123);

        const errors = await validate(obj);
        expect(errors.length).toBeGreaterThan(0);
    });

    it('should validate nested objects with dictionaries', async () => {
        const manager = new ScrapeTypesManager([
            {
                type: 'object',
                name: 'Test',
                details: [
                    {
                        key: 'prop1',
                        valueType: 'dictionary of NestedObject',
                    },
                    {
                        key: 'prop2',
                        valueType: 'int',
                    }
                ],
            },
            {
                type: 'object',
                name: 'NestedObject',
                details: [
                    {
                        key: 'field',
                        valueType: 'string',
                    }
                ],
            }
        ]);

        const module = await importTypescriptCode(collectCode(manager.generateTypeScriptTypes()));

        expect(module.Test).toBeDefined();
        expect(module.NestedObject).toBeDefined();

        const obj = plainToInstance(module.Test, {
            prop1: {
                test: { field: 'value1' },
                another: { field: 'value2' },
            },
            prop2: 123,
        }) as any;

        expect(obj).toBeInstanceOf(module.Test);
        expect(obj.prop1.constructor.name).toBe('Dictionary');
        expect(obj.prop1.test).toBeInstanceOf(module.NestedObject);
        expect(obj.prop1.test.field).toBe('value1');

        expect(obj.prop1.another).toBeInstanceOf(module.NestedObject);
        expect(obj.prop1.another.field).toBe('value2');
        expect(obj.prop2).toBe(123);
        const errors = await validate(obj);
        expect(errors).toStrictEqual([]);
    });

    it('should fail to validate nested objects with dictionaries with incorrect types', async () => {
        const manager = new ScrapeTypesManager([
            {
                type: 'object',
                name: 'Test',
                details: [
                    {
                        key: 'prop1',
                        valueType: 'dictionary of NestedObject',
                    },
                    {
                        key: 'prop2',
                        valueType: 'int',
                    }
                ],
            },
            {
                type: 'object',
                name: 'NestedObject',
                details: [
                    {
                        key: 'field',
                        valueType: 'string',
                    }
                ],
            }
        ]);

        const module = await importTypescriptCode(collectCode(manager.generateTypeScriptTypes()));

        expect(module.Test).toBeDefined();
        expect(module.NestedObject).toBeDefined();

        const obj = plainToInstance(module.Test, {
            prop1: {
                test: { field: 123 }, // Incorrect type
                another: { field: 'value2' },
            },
            prop2: 123,
        }) as any;

        expect(obj).toBeInstanceOf(module.Test);
        expect(obj.prop1.constructor.name).toBe('Dictionary');
        expect(obj.prop1.test).toBeInstanceOf(module.NestedObject);
        expect(obj.prop1.test.field).toBe(123);

        expect(obj.prop1.another).toBeInstanceOf(module.NestedObject);
        expect(obj.prop1.another.field).toBe('value2');
        expect(obj.prop2).toBe(123);
        const errors = await validate(obj);
        expect(errors.length).toBeGreaterThan(0);
    });

    it('should validate nested objects with dictionaries of arrays', async () => {
        const manager = new ScrapeTypesManager([
            {
                type: 'object',
                name: 'Test',
                details: [
                    {
                        key: 'prop1',
                        valueType: 'dictionary of array of NestedObject',
                    },
                    {
                        key: 'prop2',
                        valueType: 'int',
                    }
                ],
            },
            {
                type: 'object',
                name: 'NestedObject',
                details: [
                    {
                        key: 'field',
                        valueType: 'string',
                    }
                ],
            }
        ]);

        const module = await importTypescriptCode(collectCode(manager.generateTypeScriptTypes()));

        expect(module.Test).toBeDefined();
        expect(module.NestedObject).toBeDefined();

        const obj = plainToInstance(module.Test, {
            prop1: {
                test: [{ field: 'value1' }, { field: 'value2' }],
            },
            prop2: 123,
        }) as any;

        expect(obj).toBeInstanceOf(module.Test);
        expect(obj.prop1.constructor.name).toBe('Dictionary');
        expect(obj.prop1.test[0]).toBeInstanceOf(module.NestedObject);
        expect(obj.prop1.test[0].field).toBe('value1');
        expect(obj.prop1.test[1]).toBeInstanceOf(module.NestedObject);
        expect(obj.prop1.test[1].field).toBe('value2');
        expect(obj.prop2).toBe(123);
        
        const errors = await validate(obj);
        expect(errors).toStrictEqual([]);
    });

    it('should fail to validate nested objects with dictionaries of arrays with incorrect types', async () => {
        const manager = new ScrapeTypesManager([
            {
                type: 'object',
                name: 'Test',
                details: [
                    {
                        key: 'prop1',
                        valueType: 'dictionary of array of NestedObject',
                    },
                    {
                        key: 'prop2',
                        valueType: 'int',
                    }
                ],
            },
            {
                type: 'object',
                name: 'NestedObject',
                details: [
                    {
                        key: 'field',
                        valueType: 'string',
                    }
                ],
            }
        ]);

        const module = await importTypescriptCode(collectCode(manager.generateTypeScriptTypes()));

        expect(module.Test).toBeDefined();
        expect(module.NestedObject).toBeDefined();

        const obj = plainToInstance(module.Test, {
            prop1: {
                test: [{ field: 123 }, { field: 'value2' }], // Incorrect type
            },
            prop2: 123,
        }) as any;

        expect(obj).toBeInstanceOf(module.Test);
        expect(obj.prop1.constructor.name).toBe('Dictionary');
        expect(obj.prop1.test[0]).toBeInstanceOf(module.NestedObject);
        expect(obj.prop1.test[0].field).toBe(123);
        expect(obj.prop1.test[1]).toBeInstanceOf(module.NestedObject);
        expect(obj.prop1.test[1].field).toBe('value2');
        expect(obj.prop2).toBe(123);
        
        const errors = await validate(obj);
        expect(errors.length).toBeGreaterThan(0);
    });

    it('should validate number types', async () => {
        const manager = new ScrapeTypesManager([
            {
                type: 'object',
                name: 'Test',
                details: [
                    {
                        key: 'prop1',
                        valueType: 'int',
                    },
                    {
                        key: 'prop2',
                        valueType: 'float',
                    },
                    {
                        key: 'prop3',
                        valueType: 'double',
                    },
                    {
                        key: 'prop4',
                        valueType: 'uint',
                    },
                ],
            }
        ]);

        const module = await importTypescriptCode(collectCode(manager.generateTypeScriptTypes()));

        expect(module.Test).toBeDefined();
        const obj = plainToInstance(module.Test, {
            prop1: -123,
            prop2: 123.456,
            prop3: 123.456789,
            prop4: 123,
        }) as any;
        expect(obj).toBeInstanceOf(module.Test);
        expect(obj.prop1).toBe(-123);
        expect(obj.prop2).toBe(123.456);
        expect(obj.prop3).toBe(123.456789);
        expect(obj.prop4).toBe(123);

        const errors = await validate(obj);
        expect(errors).toStrictEqual([]);
    });

    it('should fail to validate number types with incorrect values', async () => {
        const manager = new ScrapeTypesManager([
            {
                type: 'object',
                name: 'Test',
                details: [
                    {
                        key: 'prop1',
                        valueType: 'int',
                    },
                    {
                        key: 'prop2',
                        valueType: 'float',
                    },
                    {
                        key: 'prop3',
                        valueType: 'double',
                    },
                    {
                        key: 'prop4',
                        valueType: 'uint',
                    },
                ],
            }
        ]);

        const module = await importTypescriptCode(collectCode(manager.generateTypeScriptTypes()));

        expect(module.Test).toBeDefined();
        const obj = plainToInstance(module.Test, {
            prop1: 1e100, // Too large for int
            prop2: '123.456',
            prop3: false,
            prop4: -123, // Negative value for uint
        }) as any;
        expect(obj).toBeInstanceOf(module.Test);
        expect(obj.prop1).toBe(1e100);
        expect(obj.prop2).toBe('123.456');
        expect(obj.prop3).toBe(false);
        expect(obj.prop4).toBe(-123);

        const errors = await validate(obj);
        expect(errors.length).toBe(4);
    });

    it('should generate a array of two different type options', async () => {
        const manager = new ScrapeTypesManager([
            {
                type: 'object',
                name: 'Test',
                details: [
                    {
                        key: 'prop1',
                        valueType: 'array of string or int',
                    },
                ],
            }
        ]);

        const module = await importTypescriptCode(collectCode(manager.generateTypeScriptTypes()));

        expect(module.Test).toBeDefined();
        const obj = plainToInstance(module.Test, {
            prop1: ['test', 123],
        }) as any;
        expect(obj).toBeInstanceOf(module.Test);
        expect(obj.prop1).toEqual(['test', 123]);

        const errors = await validate(obj);
        expect(errors).toStrictEqual([]);
    });
});