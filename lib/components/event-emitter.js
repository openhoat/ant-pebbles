define(() => {

  class EventEmitter {
    constructor() {
      this.events = {};
    }

    on(event, listener) {
      this.events[event] = this.events[event] || [];
      this.events[event].push(listener);
    }

    removeListener(event, listener) {
      if (!this.events[event]) {
        return;
      }
      const idx = this.events[event].indexOf(listener);
      if (idx !== -1) {
        this.events[event].splice(idx, 1);
      }
    }

    emit(event, ...args) {
      if (!this.events[event]) {
        return;
      }
      this.events[event].slice().forEach(listener => listener(...args));
    }

    once(event, listener) {
      const onceListener = (...args) => {
        this.removeListener(event, onceListener);
        listener(...args);
      };
      this.on(event, onceListener);
    }
  }

  return EventEmitter;

});
