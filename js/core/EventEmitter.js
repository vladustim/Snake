export default class EventEmitter {
    constructor() {
        this.events = {};
    }

    on(event, listener) {
        (this.events[event] ||= []).push(listener);
    }

    emit(event, data) {
        (this.events[event] || []).forEach(fn => fn(data));
    }
}