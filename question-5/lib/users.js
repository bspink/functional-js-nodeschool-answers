'use strict'

// The boilerplate said to name this argument goodUsers, but I feel that
// validUsers is more descriptive ("good" seems a bit subjective), and
// "valid" matches up with the terminology of the functions themselves.

function checkUsersValid(validUsers) {
    /*
        Return a function which can be used as a validator for user IDs.
        `validUsers` will be a list of user objects with an "id" property,
        of which all are "valid".

        The returned function will then take an argument (submittedUsers)
        of a list of user objects of the same format as `validUsers`, and
        validate against the "valid" users.

        Returns a boolean value indicating if all of the submitted users are
        valid.
    */
    if (!Array.isArray(validUsers)) {
        throw new Error('validUsers argument must be an array')
    }

    return function allUsersValid(submittedUsers) {

        if (!Array.isArray(submittedUsers)) {
            throw new Error('submittedUsers argument must be an array')
        }

        // Every submitted user needs to be a valid user,
        // so check every submitted user to make sure they are in the list
        // of valid users.
        return submittedUsers.every(function doSubmitted(submittedUser) {

            // If any of the valid users match the current submitted user,
            // then we are confident that the submitted user is valid.
            return validUsers.some(function doValid(validUser) {
                return submittedUser.id === validUser.id
            })
        })
    }
}

module.exports = checkUsersValid
