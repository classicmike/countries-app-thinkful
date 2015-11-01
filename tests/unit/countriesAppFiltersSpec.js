/**
 * countriesAppFiltersSpec.js unit tests the code reqiured for the countries-app-filters.js located in the source.
 */
describe('countriesAppFilters', function(){
    beforeEach(module("countriesAppFilters"));

    describe("comma every thousand", function(){
        it("should return an integer", inject(function($filter){
            var intergerValFilter = $filter('intergerVal');
            expect(intergerValFilter(1)).toMatch(/\d{1,}/);
        }));

        it("should return a number that puts commas for every thousands", inject(function($filter){
            var commaEveryThousandFilter = $filter('commaEveryThousand');
            expect(commaEveryThousandFilter(145000)).toMatch(/^(?!0+\.00)(?=.{1,9}(\.|$))(?!0(?!\.))\d{1,3}(,\d{3})*(\.\d+)?$/);
        }));
    });
});