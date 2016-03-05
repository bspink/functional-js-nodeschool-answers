'use script'

var Spy = require('../lib/spy')

describe('Spy', function () {

    var noop = function () {}

    var addEverything = function (arg1, arg2, arg3) {
        return arg1 + arg2 + arg3
    }

    var returnValue = function (val) {
        /* Return the value passed in from the argument. */
        return val
    }

    it('should count method calls correctly', function () {

        var obj = {'func': noop}
        var spy = Spy(obj, 'func')
        var numTimesToCallFunc = 10
        var i

        for (i = 0; i < numTimesToCallFunc; ++i) {
            obj.func()
        }
        expect(spy.count).toBe(numTimesToCallFunc)
    })

    it('should return a count of 0 if spied-upon method is not used', function () {

        var obj = {
            'func': noop
        }
        var spy = Spy(obj, 'func')

        expect(spy.count).toBe(0)
    })

    it('should work with return values', function () {

        var obj = {'func': returnValue}
        var spy = Spy(obj, 'func')
        var testVal = '12345 something xixhugro LLL brap'
        var returnedValue = obj.func(testVal)

        expect(spy.count).toBe(1)
        expect(returnedValue).toBe(testVal)
    })

    it('should work with many arguments', function () {

        var obj = {'func': addEverything}
        var returnedValue = obj.func(3, 5, 6)

        expect(returnedValue).toBe(3 + 5 + 6)
    })

})
