describe('calcul functions', function() {

      beforeEach(module('calendar'));


          describe('calcul', function () {

               it('Start from zero', inject(function ($componentController) {
                  start = new Date();

                  var ctrl = $componentController('calendar', {}, {start: new Date(), data: []});

                  expect(ctrl.grade(new Date('1970-01-22'), new Date('1970-01-22'))).toBe(0);
                }));

                it('Before date null', inject(function ($componentController) {
                  start = new Date();

                  var ctrl = $componentController('calendar', {}, {start: new Date(), data: []});
                  expect(ctrl.grade(new Date('1970-01-22'),
                new Date('1969-01-22'))).toBe(-365);
              }));

                it('Before date ok', inject(function ($componentController) {
                  start = new Date();

                  var ctrl = $componentController('calendar', {}, {start: new Date(), data: []});
                  expect(ctrl.grade(new Date('1960-01-22'),
                new Date('1960-09-22'))).toBe(244);
              }));

                it('Not the best hour', inject(function ($componentController) {

                  start = new Date();

                  var ctrl = $componentController('calendar', {}, {start: new Date(), data: []});

                  expect(ctrl.grade(new Date('1960-01-22'),
                new Date('1960-09-22'))).toBe(244);
              }));

                it('One year in the loop', inject(function ($componentController) {

                  start = new Date();

                  var ctrl = $componentController('calendar', {}, {start: new Date(), data: []});

                  expect(ctrl.grade(new Date('1960-01-22'),
                new Date('1961-01-21'))).toBe(365);
              }));

                it('One year in the loop trouble hour', inject(function ($componentController) {
                  start = new Date();

                  var ctrl = $componentController('calendar', {}, {start: new Date(), data: []});
                  expect(ctrl.grade(new Date('1960-01-22'),
                  new Date('1961-01-21'))).toBe(365);
                }));

                it('Fake Date', inject(function ($componentController) {
                  start = new Date();

                  var ctrl = $componentController('calendar', {}, {start: new Date(), data: []});
                  expect(ctrl.grade(new Date('1960-01-22'),
                new Date('1961-02-29'))).toBe(null);
              }));

                it('Long Time ago', inject(function ($componentController) {

                  start = new Date();

                  var ctrl = $componentController('calendar', {}, {start: new Date(), data: []});

                  expect(ctrl.grade(new Date('1930-01-22'),
                new Date('1930-02-22'))).toBe(31);
              }));

              });

                describe('Bissextile', function () {



                  //
                  it('2000', inject (function($componentController) {
                    start = new Date();

                    var ctrl = $componentController('calendar', {}, {start: new Date(), data: []});
                    expect(ctrl.isBissextile(2000)).toBe(true);
                  }));

                  it('1992', inject (function ($componentController) {
                    start = new Date();

                    var ctrl = $componentController('calendar', {}, {start: new Date(), data: []});
                    expect(ctrl.isBissextile(1992)).toBe(true);
                  }));


                  it('1900', inject (function($componentController) {
                    start = new Date();

                    var ctrl = $componentController('calendar', {}, {start: new Date(), data: []});
                      expect(ctrl.isBissextile(1900)).toBe(false);
                    }));

                  it('2010', inject (function($componentController) {
                    start = new Date();

                    var ctrl = $componentController('calendar', {}, {start: new Date(), data: []});
                      expect(ctrl.isBissextile(2010)).toBe(false);
                    }));

                  it('2016', inject (function($componentController) {
                    start = new Date();

                    var ctrl = $componentController('calendar', {}, {start: new Date(), data: []});
                        expect(ctrl.isBissextile(2016)).toBe(true);
                    }));

                  });
});
