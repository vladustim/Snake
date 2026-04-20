export default class StateMachine {
    constructor() {
        this.current = null;
    }

    change(state) {
        if (this.current?.exit) this.current.exit();
        this.current = state;
        if (this.current?.enter) this.current.enter();
    }

    update(dt) {
        this.current?.update(dt);
    }

    draw(ctx) {
        this.current?.draw(ctx);
    }
}