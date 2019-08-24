const Failure = function(cause) {
    this.value = cause;
}

Failure.of = function(cause) {
   return new Failure(cause); 
}

Failure.prototype.map = function(ignored) {
    return this;
}

Failure.prototype.isFailure = function() {
    return true;
}

const Step = function(value) {
    this.value = value;
}

Step.of = function(value) {
    return new Step(value);
}

Step.prototype.map = function(fn) {
    try {
        return Step.of(fn(this.value));
    } catch (error) {
        return Failure.of(error);
    }
}

Step.prototype.chain = function(fn) {
    return this.map(fn).value;
}

Step.prototype.isFailure = function() {
    return false;
}

const Process = { Step, Failure };

module.exports = Process;
