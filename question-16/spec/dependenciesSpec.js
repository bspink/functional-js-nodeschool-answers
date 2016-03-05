'use strict'

var getDependencies = require('../lib/dependencies')

describe('get dependencies', function () {

    it('should handle an undefined dependency tree', function () {

        expect(
            getDependencies()
        ).toEqual(
            []
        )
    })

    it('should handle an empty dependency tree', function () {

        expect(
            getDependencies({})
        ).toEqual(
            []
        )
    })

    it('should return the correct results for the question test data', function () {

        var loremIpsum = {
            'name': 'lorem-ipsum',
            'version': '0.1.1',
            'dependencies': { 
                'optimist': {
                    'version': '0.3.7',
                    'dependencies': {
                        'wordwrap': {
                            'version': '0.0.2'
                        }
                    }
                },
                'inflection': {
                    'version': '1.2.6'
                }
            }
        }

        expect(
            getDependencies(loremIpsum)
        ).toEqual(
            [
                'inflection@1.2.6',
                'optimist@0.3.7',
                'wordwrap@0.0.2'
            ]
        )
    })

    it('should not return duplicate versioned packages', function () {

        var dependencyTree = {
            'name': 'useless packages',
            'version': '1.useless',
            'dependencies': {
                'doubleup': {
                    'version': '1.2.3',
                    'dependencies': {
                        'doubleup': {
                            'version': '1.2.4',
                            'dependencies': {
                                'doubleup': {
                                    'version': '1.2.3'
                                }
                            }
                        }
                    }
                }
            }
        }
        expect(
            getDependencies(dependencyTree)
        ).toEqual(
            [
                'doubleup@1.2.3',
                'doubleup@1.2.4'
            ]
        )
    })

    it('should return packages in alphabetical order', function () {

        var dependencyTree = {
            'name': 'alphabetpackages',
            'version': 'abc',
            'dependencies': {
                'a': {'version': '1'},
                'b': {'version': '2'},
                'e': {'version': '5'},
                'c': {'version': '3'},
                'f': {'version': '6'},
                'd': {'version': '4'}
            }
        }

        expect(
            getDependencies(dependencyTree)
        ).toEqual(
            ['a@1', 'b@2', 'c@3', 'd@4', 'e@5', 'f@6']
        )
    })
})
