import { Entity, EntityId } from '../../src';
import { EntitySession } from '../../src/core/EntitySession';
import { expect } from 'chai';

interface TestEntityProps {
    name: string,
    age: number,
    steps: number,
}

class TestEntity extends Entity<TestEntityProps> {
    
    constructor(props: TestEntityProps, id?: EntityId) {
        super(props, id);
    }
    
}

describe('EntitySession', () => {
    it('should create an instance', () => {
        const ourEntity = new TestEntity({ name: 'test', age: 10, steps: 1 });
        const session = EntitySession.from(ourEntity);
        expect(session).to.be.not.undefined;
    });

    it('should mutate the state with set', () => {
        const ourEntity = new TestEntity({ name: 'test', age: 10, steps: 1 });
        const session = EntitySession.from(ourEntity);
        session.mutate('age', 20);
        expect(session.mutationsView)
            .to.deep.equal({ age: 20 });
    });

    it('should mutate the state with add and return correct value', () => {
        const ourEntity = new TestEntity({ name: 'test', age: 10, steps: 1 });
        const session = EntitySession.from(ourEntity);
        session.mutate('age', 10, 'add');
        session.mutate('age', 5, 'add');
        session.mutate('age', 20, 'sub');
        session.mutate('steps', 2, 'sub');
        expect(session.atomicOperations)
            .to.deep.equal({ age: 5, steps: -1 });
    });
    
    it('should modify state and work', () => {
        const ourEntity = new TestEntity({ name: 'test', age: 10, steps: 1 });
        const session = EntitySession.from(ourEntity);
        session.mutate('age', 10, 'add');
        session.mutate('name', 'no' );
        expect(session.currentState)
            .to.deep.equal({
                name: 'no',
                age: 20,
                steps: 1,
            });
    });
});