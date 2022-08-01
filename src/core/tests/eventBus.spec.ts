import { assert } from 'chai';
import EventBus from '../eventBus';

describe('EventBus', () => {
  const eventBus = new EventBus();
  const { listeners } = eventBus;
  const callback = () => 42;

  it('must be defined', () => {
    assert.exists(eventBus);
  });

  it('events can be added', () => {
    const events = ['one', 'two', 'three'];

    events.forEach((event) => eventBus.on(event, callback));

    assert.hasAllKeys(listeners, ['one', 'two', 'three']);
  });
});
