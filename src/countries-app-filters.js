angular.module('countriesAppFilters', [])
    .filter('commaEveryThousand', function(){
        return function(input){
            if(!input){
                return input;
            }

            //input
            input += '';
            var x = input.split('.');
            var x1 = x[0];
            var x2 = x.length > 1 ? '.' + x[1] : '';
            var rgx = /(\d+)(\d{3})/;
            while (rgx.test(x1)) {
                x1 = x1.replace(rgx, '$1' + ',' + '$2');
            }
            return x1 + x2;
        }
    })
    .filter('intergerVal', function(){
        return function(input){
            if(!input){
                return input;
            }

            return parseInt(input);
        }
    });
