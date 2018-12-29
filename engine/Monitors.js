

class Monitor {
    constructor() {
        this.monitoredfunctions = [];
    }
    add(mf) {
        this.monitoredfunctions.push(mf)
    }
    numCalls() {
        let c = 0;
        this.monitoredfunctions.forEach((f) => { c += f.getCount(); });
        return c;
    }
}

class MonitoredFunction {
    constructor(f, m) {
        let count = 0;
        this.func = function() {
            var args = Array.prototype.slice.call(arguments);
            count++;
            return f.apply(this, args);
        }
        this.getCount = function() { return count; };
        m.add(this);
    }
    get() {
        return this.func;
    }
}