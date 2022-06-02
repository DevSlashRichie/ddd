import { Entity } from './Entity';
import 'reflect-metadata';
import { Logger } from '../logger';

type Command = 'push' | 'pull' | 'set';

const SupportedTypes = [ 'array', 'number', 'item' ] as const;
type Type = typeof SupportedTypes[number];

type DecoratorValue = {
    command: Command,
    key: string,
    type: Type,
    argToPick: 'return' | number,
};

type Operation<T = any> = DecoratorValue & {
    value: T,
};

type Conf = {
    key?: string,
    argToUse?: 'return' | number,
};

export class Decorators {

    static Push(key: string, argToPick: 'return' | number = 0, type?: Type) {
        return Reflect.metadata('ddd:entity:command', { command: 'push', type, key, argToPick });
    }

    static Pull(key: string, argToPick: 'return' | number = 0, type?: Type) {
        return Reflect.metadata('ddd:entity:command', { command: 'pull', type, key, argToPick });
    }

    static Set(key: string, argToPick: 'return' | number = 0) {
        return Reflect.metadata('ddd:entity:command', { command: 'set', key, argToPick });
    }

}

export class EntityTracker<Props extends Record<any, any>> {

    private readonly _entity: Entity<Props>;
    private readonly _initialState: Props;
    private readonly _operations: Array<Operation>;
    
    constructor(entity: Entity<Props>) {
        this._entity = entity;
        this._initialState = {
            ...entity.props,
        };
        this._operations = [];
    }

    public prepare<T>(func: (...args: any) => T, ...args: any) {
        return {
            execute: (conf: Conf) => this._execute(func, conf, ...args),
        };
    }

    public execute<T>(func: (...args: any) => T, ...args: any) : T {
        return this._execute(func, null, ...args);
    }

    public _execute<T>(func: (...args: any) => T, conf: Conf | null = null, ...args: any) : T {
        const methodName = func.name;
        const metadata = Reflect.getMetadata('ddd:entity:command', this._entity, methodName) as DecoratorValue | undefined;

        const execution = func.bind(this._entity)(...args);

        if(metadata) {
            
            // Validate type.
            const valueToUse = metadata.argToPick === 'return' ? execution : args[metadata.argToPick];
            const resultTypeOf = metadata.type ?? typeof valueToUse;

            const typeFound = Array.isArray(valueToUse)
                ? 'array'
                : SupportedTypes.find(type => type === resultTypeOf);

            if(!typeFound)
                throw new Error(`Method "${methodName}" returned a value of type "${resultTypeOf}".`);

            this._operations.push({
                command: metadata.command,
                key: conf?.key ?? metadata.key,
                value: valueToUse,
                type: typeFound,
                argToPick: conf?.argToUse ?? metadata.argToPick,
            });
        } else
            Logger.warn(`Method "${methodName}" has not decorator "ddd:entity:command".`);

        return execution;
    }

    public build() {
        const atomics = this._operations;

        const groupByProperty = atomics.reduce((acc, operation) => {
            if(!acc[operation.key])
                acc[operation.key] = {
                    type: operation.type,
                    operations: [],
                };
            
            acc[operation.key].operations.push(operation);
            return acc;
        }, {} as { [key: string]: { type: Type, operations: Array<Operation> } });

        return Object.keys(groupByProperty).reduce((accc, key) => {
            const value = groupByProperty[key];

            accc[key] = value.operations.reduce((acc, operation) => {

                if(typeof acc !== 'number') {
                    const value = operation.type === 'array' ? operation.value : [ operation.value ];
                    if(operation.command === 'push') {
                        acc.set = [];
                        const length = acc.pull.length;
                        acc.pull = acc.pull.filter(it => !value.includes(it));
                        if(length === acc.pull.length)
                            acc.push.push(...value);
                    } else if(operation.command === 'pull') {
                        acc.set = [];
                        const length = acc.push.length;
                        acc.push = acc.push.filter(it => !value.includes(it));
                        if(length === acc.push.length)
                            acc.pull.push(...value);
                    } else if(operation.command === 'set') {
                        acc.set = value;
                        acc.pull = [];
                        acc.push = [];
                    }    
                    
                } else {
                    if (operation.command === 'push')
                        acc += operation.value;
                    else if (operation.command === 'pull')
                        acc -= operation.value;
                    else if (operation.command === 'set')
                        acc = operation.value;
                }

                return acc;
            }, value.type === 'number' ? 0 : { push: [] as Array<any>, pull: [] as Array<any>, set: [] as Array<any> });

            return accc;
        }, {} as { [key: string]: { push: Array<any>, pull: Array<any>, set: Array<any> } | number });
    }

}