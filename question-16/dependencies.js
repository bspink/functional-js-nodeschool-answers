'use strict'

function getDependencies(tree) {
    /*
        Traverse the `tree` argument (a package dependency object) and
        return a list of strings in the format of "package@version".
        The list will be alphabetically sorted.
        Duplicate packages (i.e. same name, same version) will only
        be returned once in the list.
    */

    // Create an object to act as a hash/dictionary, with the keys being the
    // package strings i.e. (package@version). This allows us to "de-dupe" the
    // packages at a specific version as we are traversing the tree.
    // The value can be whatever we wish as it is pretty irrelevant in terms
    // of the task at hand, but we'll store a count in case someones wants to
    // find any dupes easily in the future.
    var seenDependencies = {}
    var finalDependencies

    // No use going any further if the tree is empty.
    if (!tree) {
        return []
    }

    function processPackage(packageName, packageData) {

        var packageString

        // If the package has no version, the format of the package data
        // is invalid. Don't add it.
        if (!packageData.version) {
            return
        }

        packageString = packageName + '@' + packageData.version
        // Insert the package@version string here as the key, and
        // either initialise or increment the "seen" count.
        // The seen count is not necessary, but nobody will know.
        seenDependencies[packageString] = seenDependencies[packageString]++ || 1
    }

    (function processPackageTree(packageTree) {

        if (!packageTree) {
            return
        }

        Object.keys(packageTree).map(function walkPackages(packageName) {

            var packageData = packageTree[packageName]

            processPackage(
                packageName,
                packageData
            )

            // Process any nested sub-dependencies for the package.
            if (packageData.dependencies) {
                processPackageTree(packageData.dependencies)
            }
        })

    })(tree.dependencies)

    // As mentioned above, the keys will already be the unique package@version
    // strings, so no need to de-dupe.
    finalDependencies = Object.keys(seenDependencies)
    // Alphabetical sorting will be the default for sort(), so no need
    // for a cmp function to be passed in.
    if (finalDependencies) {
        finalDependencies.sort()
    }
    return finalDependencies

}

module.exports = getDependencies
