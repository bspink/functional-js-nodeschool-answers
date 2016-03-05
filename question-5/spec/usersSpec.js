'use strict'

var checkUsersValid = require ('../lib/users')

describe('allUsersValid', function () {

    var noUsers = []
    var testUsers = [
        {id: 1},
        {id: 2}
    ]

    it('should return true for valid users', function () {

        var allUsersValid = checkUsersValid(testUsers)

        expect(
            allUsersValid([{id: 1}, {id: 2}, {id: 2}])
        ).toBe(
            true
        )
    })

    it('should return false for invalid users', function () {

        var allUsersValid = checkUsersValid(testUsers)

        expect(
            allUsersValid([{id: 3}, {id: 4}, {id: 5}, {id: 3}])
        ).toBe(
            false
        )
    })

    it('should return with a mix of valid + invalid users', function () {

        var allUsersValid = checkUsersValid(testUsers)

        expect(
            allUsersValid([{id: 1}, {id: 3}])
        ).toBe(
            false
        )
    })

    it('should handle empty user lists', function () {

        var allUsersValid = checkUsersValid(noUsers)

        // If there are no users to validate against, and
        // no users are being validated, then I guess that
        // means they are all valid.
        expect(
            allUsersValid([])
        ).toBe(
            true
        )

        // But, if there are users being validated, then
        // they should not be valid as they will never match
        // any users.
        expect(
            allUsersValid([{id: 2}])
        ).toBe(
            false
        )
    })
})
