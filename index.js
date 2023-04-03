const country = require('country-state-city').Country;
const state = require('country-state-city').State;
const city = require('country-state-city').City;


const mongodbClient = require('mongodb').MongoClient;
console.log(country.getAllCountries());
console.log(state.getAllStates());
console.log(city.getAllCities());

return;

mongodbClient.connect('mongodb://localhost:27017', function(err,db){
    if(!err){
        var dbo =db.db('test');
        console.log('db connected');
        const BulkHasOperations = (b) => b && b.s && b.s.currentBatch && b.s.currentBatch.operations && b.s.currentBatch.operations.length >=0;

    // for country
      var countriesBulk=dbo.collection('Countries').initializeOrderedBulkOp();
      var countriesss=country.getAllCountries();
      countriesss.forEach(country=>{
        countriesBulk.insert({
            country_name:country.name,
            country_isoCode:country.isoCode,
            countrty_phonecode:country.phonecode,
            country_currency:country.currency
        })
      })
      BulkHasOperations(countriesBulk)&&countriesBulk.execute();
    // for states
    var stateBulk=dbo.collection('States').initializeOrderedBulkOp();
    var statessss=state.getAllStates()
    statessss.forEach(states=>{
        stateBulk.insert({
          states_name:states.name,
          states_country_code:states.countryCode,
          states_isocode:states.isoCode,
        
      })
    })
    BulkHasOperations(stateBulk) && stateBulk.execute();

    // for city

    var cityBulk=dbo.collection('Cityies').initializeOrderedBulkOp();
    var citys=city.getAllCities()
    citys.forEach(city=>{
        cityBulk.insert({
          city_name:city.name,
          city_state_code:city.stateCode,
          city_latitude:city.latitude,
          city_longitude:city.longitude,
        //   s_currency:citys.currency
      })
    })
    BulkHasOperations(cityBulk) && cityBulk.execute();
    }
    else throw err
})