const Failure = function(step, cause) {
    this.__step = step;
    this.__reason = cause;
}

Failure.of = function(step, cause) {
   return new Failure(step, cause); 
}

Failure.prototype.map = function(ignored) {
    return this;
}

Failure.prototype.getValue = function() {
    return this.__step.getValue();
}

Failure.prototype.getReason = function() {
    return this.__reason;
}

Failure.prototype.isFailure = function() {
    return true;
}

const Step = function(value) {
    this.__value = value;
}

Step.of = function(value) {
    return new Step(value);
}

Step.prototype.map = function(fn) {
    try {
        return Step.of(fn(this.__value));
    } catch (error) {
        return Failure.of(this, error);
    }
}

Step.prototype.getValue = function() {
    return this.__value;
}

Step.prototype.chain = function(fn) {
    return this.map(fn).getValue();
}

Step.prototype.isFailure = function() {
    return false;
}

const Process = { Step, Failure };

module.exports = Process;
