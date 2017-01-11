describe('helloWorld', function() {

    // load the module
    beforeEach(module('calendar'));



    // test the controller
    describe('HelloWorldController', function() {
        it ('should create a `test` model', inject(function($componentController) {

          start = new Date();

          tableau = [];
          tableau[0] = {dateDebut : '2016-01-27', dateFin : '2016-02-26'};
          tableau[1] = {dateDebut : new Date('2016-01-04'), dateFin : new Date('2016-07-14')};
          tableau[2] = {dateDebut : new Date('2016-09-04'), dateFin : '2016-09-12'};
          tableau[3] = {dateDebut : '2016-08-04', dateFin : new Date('2016-10-14')};
          tableau[4] = {dateDebut : new Date('2016-09-01'), dateFin : new Date('2016-09-14')};
          tableau[5] = {dateDebut : new Date('2016-09-02'), dateFin : new Date('2016-09-09')};
          tableau[6] = {dateDebut : new Date('2010-10-18'), dateFin : null};
          tableau[7] = {dateDebut : '2016-02-27', dateFin : '2016-02-26'};
          tableau[8] = {dateDebut : '1901-02-27', dateFin : '1902-02-26'};



          var ctrl = $componentController('calendar', {}, {start: new Date(), data: tableau});

          //expect(ctrl.nb).to.equal(10);
        }));
    });

});
