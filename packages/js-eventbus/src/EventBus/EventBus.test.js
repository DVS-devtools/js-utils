import EventBus from './index';

let Bus;
const event = 'customEvent';

beforeEach(() => {
    Bus = new EventBus();
});

describe('EventBus - trigger all callbacks', () => {
    let cb1, cb2;
    const args = { foo: 'bar' };
    beforeEach(() => {
        Bus.clearAll();
        cb1 = jest.fn();
        cb2 = jest.fn();
    });
    it('should call the callbacks when the event is triggered', () => {
        Bus.on(event, cb1);
        Bus.on(event, cb2);
        Bus.trigger(event);
        expect(cb1).toHaveBeenCalled();
        expect(cb2).toHaveBeenCalled();
        expect(Bus.events[event].stack.length).toBe(2);
    });

    it('trigger should pass the given args to the callbacks', () => {
        Bus.on(event, cb1);
        Bus.on(event, cb2);
        Bus.trigger(event, args);
        expect(cb1).toHaveBeenCalledWith(args);
        expect(cb2).toHaveBeenCalledWith(args);
    });

    it('trigger should trigger only the callbacks registered to the given event', () => {
        Bus.on(event, cb1);
        Bus.on('otherEvent', cb2);
        Bus.trigger(event);
        expect(cb1).toHaveBeenCalled();
        expect(cb2).not.toHaveBeenCalled();
    });

    it('trigger should not trigger anything if no callbacks are registered', () => {
        Bus.trigger(event);
        expect(cb1).not.toHaveBeenCalled();
        expect(cb2).not.toHaveBeenCalled();
        expect(Bus.events[event].stack.length).toBe(0);
    });

    it('should trigger only the new callback if a registered event was already triggered', () => {
        Bus.on(event, cb1);
        Bus.trigger(event);
        Bus.on(event, cb2);
        expect(cb2).toHaveBeenCalled();
        expect(cb1).toHaveBeenCalledTimes(1);
    });
});

describe('EventBus - off', () => {
    let cb1, cb2;
    beforeEach(() => {
        Bus.clearAll();
        cb1 = jest.fn();
        cb2 = jest.fn();
    });

    it('off should unregister a previously registered callback preventing to be called on trigger', () => {
        Bus.on(event, cb1);
        Bus.on(event, cb2);
        Bus.off(event, cb1);
        Bus.trigger(event);
        expect(cb1).not.toHaveBeenCalled();
        expect(Bus.events[event].stack.length).toBe(1);
    });

    it('off should not do anything if no callback is registered to the given event', () => {
        Bus.off(event, cb1);
        Bus.trigger(event);
        expect(cb1).not.toHaveBeenCalled();
        expect(Bus.events[event].stack.length).toBe(0);
        expect(Bus.events[event].params.length).toBe(0);
        expect(Bus.events[event].triggered).toBeTruthy();
    });
});

describe('EventBus - clear and clearAll', () => {
    let cb1, cb2;
    const event2 = 'otherEvent';
    beforeEach(() => {
        Bus.clearAll();
        cb1 = jest.fn();
        cb2 = jest.fn();
    });

    it('clear should remove all callbacks from a given event', () => {
        Bus.on(event, cb1);
        Bus.on(event, cb2);
        Bus.clear(event);

        expect(Bus.events[event].stack.length).toBe(0);
        expect(Bus.events[event].params.length).toBe(0);
        expect(Bus.events[event].triggered).toBeFalsy();

        Bus.trigger(event);

        expect(cb1).not.toHaveBeenCalled();
        expect(cb2).not.toHaveBeenCalled();
        expect(Bus.events[event].stack.length).toBe(0);
        expect(Bus.events[event].params.length).toBe(0);
        expect(Bus.events[event].triggered).toBeTruthy();
    });

    it('clear should not do anything if no callbacks is registered to the given event', () => {
        Bus.clear(event);
        expect(Bus.events[event]).toBeUndefined();
    });

    it('clearAll should remove all events and associated callbacks', () => {
        Bus.on(event, cb1);
        Bus.on(event, cb2);
        Bus.on(event2, cb1);

        Bus.clearAll();
        Bus.trigger(event);
        Bus.trigger(event2);

        expect(cb1).not.toHaveBeenCalled();
        expect(cb2).not.toHaveBeenCalled();

        expect(Bus.events[event].stack.length).toBe(0);
        expect(Bus.events[event].params.length).toBe(0);
        expect(Bus.events[event].triggered).toBeTruthy();

        expect(Bus.events[event2].stack.length).toBe(0);
        expect(Bus.events[event2].params.length).toBe(0);
        expect(Bus.events[event2].triggered).toBeTruthy();
    });
});
