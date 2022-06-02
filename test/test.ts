import 'reflect-metadata';
import { Decorators, EntityTracker } from '../src/core/EntityTracker';
import { EntityId, Entity } from '../src';

interface Props {
    counter: number,
    arr: Array<string>
}

export class Test extends Entity<Props> {
    
    constructor(props: Props, id?: EntityId) {
        super(props, id);
    }
    
    @Decorators.Push('counter')
    public sum(number: number) {
        this.props.counter += number;
        return this.props.counter;
    }
    
    @Decorators.Pull('counter')
    public substract(number: number) {
        this.props.counter -= number;
        return this.props.counter;
    }

    @Decorators.Set('counter')
    public set(number: number) {
        this.props.counter = number;
        return this.props.counter;
    }
    
    @Decorators.Push('arr', 0, 'item')
    public appendItem(item: string) {
        this.props.arr.push(item);
        return this.props.arr;
    }

    @Decorators.Push('arr', 0, 'array')
    public appendItems(item: string[]) {
        this.props.arr.push(...item);
        return this.props.arr;
    }

    @Decorators.Pull('arr', 0, 'item')
    public removeItem(item: string) {
        this.props.arr = this.props.arr.filter(it => it !== item);
        return this.props.arr;
    }

    @Decorators.Set('arr', 0)
    public ttt(item: string[]) {
        return this.props.arr;
    }
    
}

const test = new Test({
    arr: [] as string[],
    counter: 0,
});

const tracker = new EntityTracker<Props>(test);

tracker.execute(test.sum, 10);
tracker.execute(test.substract, 1);

tracker.execute(test.appendItem, 'test');
tracker.execute(test.appendItem, 'test2');
tracker.execute(test.appendItems, [ 'test3', 'test4' ]);
tracker.execute(test.removeItem, 'test3');
tracker.execute(test.removeItem, 'test333');
tracker.execute(test.removeItem, 'ricardo');
tracker.execute(test.appendItem, 'ricardo');
tracker.execute(test.ttt, [ 'asdasd' ]);
tracker.execute(test.appendItem, 'ricardo');

tracker.prepare(test.appendItem, 'ricardo')
    .execute({ key: 'overwrite' });

console.log(tracker.build());