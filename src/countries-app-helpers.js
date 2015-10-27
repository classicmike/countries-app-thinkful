angular.module('countriesAppHelpers', [])
    .value('validateHttpRequestMethod', function(){
        return function(suppliedMethod){
            var methodReturned = 'GET';
            var lowercasedSuppliedMethod = suppliedMethod.toLowerCase();

            if(lowercasedSuppliedMethod === 'GET' || lowercasedSuppliedMethod === 'PUT' || lowercasedSuppliedMethod === 'POST' || lowercasedSuppliedMethod === 'DELETE'){
                methodReturned = suppliedMethod;
            }

            return methodReturned;
        };
    });