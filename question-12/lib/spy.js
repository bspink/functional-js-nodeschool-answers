'use strict'

function Spy(target, method) {
    /* 
        Creates/returns a spy object which will count how many times the
        `method` argument on the `target` object has been called.
        The spy object has a `count` property to indicate this.
    */

    // Create our silent spy.
    var spy = {
        count: 0
    }

    // Keep a reference to the original method.
    var originalMethod = target[method]

    // Override the target's method with a proxy method
    // that defers to the original method, plus lets our spy
    // do their thing.
    target[method] = function () {

        // Update our spy's function execution counter.
        ++spy.count

        // Call the original method, using the arguments passed in.
        return originalMethod.apply(
            this,
            arguments
        )
    }

    // Return the reference to the spy.
    // This way we can communicate with them from the inside.
    return spy
}

module.exports = Spy
