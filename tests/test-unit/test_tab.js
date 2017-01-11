describe('calcul functions', function() {

      beforeEach(module('calendar'));

      describe('Tab year', function () {

              it('Test simple event',  inject(function ($componentController)  {
                start = new Date();

                var ctrl = $componentController('calendar', {}, {start: new Date(), data: []});

                var tableau = [];
                tableau[0] = {dateDebut : new Date('1971-09-04'), dateFin : null};
                var ret  = ctrl.tab(new Date('1971-01-04'), tableau);
                expect(ret[34][5]).toBe(1);
              }));

              it('Test long event', inject(function ($componentController) {

                start = new Date();

                var ctrl = $componentController('calendar', {}, {start: new Date(), data: []});

                var tableau = [];
                //tableau[0] = {dateDebut : new Date('1971-09-04'), dateFin : null};
                tableau[0] = {dateDebut : new Date('1971-01-04'), dateFin : new Date('1971-01-09')};
                //tab[2] = {dateDebut : new Date('Fev 29 1971 10:45:15 GMT+0200 (CEST)'), dateFin : new Date('1971-01-09')};
                var ret  = ctrl.tab(new Date('1971-01-04'), tableau);
                for (var i = 0; i < 6; i++) {
                  expect(ret[0][i]).toBe(1);
                }
                expect(ret[0][6]).toBe(0);
              }));

              it('Test simple event + long event', inject(function ($componentController) {

                start = new Date();

                var ctrl = $componentController('calendar', {}, {start: new Date(), data: []});

                var tableau = [];
                tableau[0] = {dateDebut : new Date('1971-09-04'), dateFin : null};
                tableau[1] = {dateDebut : new Date('1971-01-04'), dateFin : new Date('1971-01-09')};
                //tab[2] = {dateDebut : new Date('Fev 29 1971 10:45:15 GMT+0200 (CEST)'), dateFin : new Date('1971-01-09')};
                var ret  = ctrl.tab(new Date('1971-01-04'), tableau);
                for (var i = 0; i < 6; i++) {
                  expect(ret[0][i]).toBe(1);
                }
                expect(ret[0][6]).toBe(0);
                expect(ret[34][5]).toBe(1);
              }));

              it('Test Back to the futur event', inject(function ($componentController) {

                start = new Date();

                var ctrl = $componentController('calendar', {}, {start: new Date(), data: []});

                var tableau = [];
                tableau[0] = {dateDebut : new Date('1971-02-28'), dateFin : new Date('1971-01-09')};
                var ret  = ctrl.tab(new Date('1971-01-04'), tableau);
                for (var i = 0; i < 53; i++) {
                  for (var j = 0; i < 7; i++) {
                      expect(ret[i][j]).toBe(0);
                  }
                }
              }));

              it('Test debut = Fin', inject(function ($componentController) {

                start = new Date();

                var ctrl = $componentController('calendar', {}, {start: new Date(), data: []});

                var tableau = [];
                tableau[0] = {dateDebut : new Date('1971-01-27'), dateFin : new Date('1971-01-27')};
                var ret  = ctrl.tab(new Date('1971-01-04'), tableau);
                for (var i = 0; i < 53-1; i++) {
                  for (var j = 0; j < 7; j++) {
                    if (i == 3 && j == 2)
                      expect(ret[i][j]).toBe(1);  //Event days in the board
                    else
                      expect(ret[i][j]).toBe(0);
                  }
                }

              }));

              it('Test Event Above Event', inject(function ($componentController) {

                start = new Date();

                var ctrl = $componentController('calendar', {}, {start: new Date(), data: []});

                var tableau = [];
                tableau[0] = {dateDebut : new Date('1971-01-27'), dateFin : new Date('1971-02-26')};
                tableau[1] = {dateDebut : new Date('1971-01-04'), dateFin : new Date('1971-02-14')};
                var ret  = ctrl.tab(new Date('1971-01-04'), tableau);
                for (var i = 0; i < 4; i++)
                  for (var j = 0; j < 7; j++)
                    if(i == 3 && j > 1)
                      expect(ret[i][j]).toBe(2);
                    else
                      expect(ret[i][j]).toBe(1);

                for (var i = 4; i < 6; i++)
                  for (var j = 0; j < 7; j++)
                    if(i == 3 && j > 1)
                      expect(ret[i][j]).toBe(2);

                for (var i = 6; i < 8; i++)
                  for (var j = 0; j < 7; j++)
                    if(i == 7 && j > 4)
                      expect(ret[i][j]).toBe(0);
                      else
                      expect(ret[i][j]).toBe(1);

                for (var i = 8; i < 52; i++)
                  for (var j = 0; j < 7; j++)
                    expect(ret[i][j]).toBe(0);
              }));



              it('Test Out of range event', inject(function ($componentController) {

                start = new Date();

                var ctrl = $componentController('calendar', {}, {start: new Date(), data: []});

                var tableau = [];
                tableau[0] = {dateDebut : new Date('1930-01-27'), dateFin : new Date('1930-01-27')};
                var ret  = ctrl.tab(new Date('1971-01-04'), tableau);
                for (var i = 0; i < 53-1; i++) {
                  for (var j = 0; j < 7; j++) {
                    expect(ret[i][j]).toBe(0);
                  }
                }
              }));


              it('Test Out of range event left', inject(function ($componentController) {

                start = new Date();

                var ctrl = $componentController('calendar', {}, {start: new Date(), data: []});

                var tableau = [];
                tableau[0] = {dateDebut : new Date('1970-12-27'), dateFin : new Date('1971-01-07')};
                var ret  = ctrl.tab(new Date('1971-01-04'), tableau);
                for (var i = 0; i < 1; i++)
                  for (var j = 0; j < 7; j++)
                    if (j < 4)
                      expect(ret[i][j]).toBe(1);
                    else
                      expect(ret[i][j]).toBe(0);


                for (var i = 1; i < 53-1; i++)
                  for (var j = 0; j < 7; j++)
                    expect(ret[i][j]).toBe(0);

              }));

              it('Test Out of range event right', inject(function ($componentController) {

                start = new Date();

                var ctrl = $componentController('calendar', {}, {start: new Date(), data: []});

                var tableau = [];
                tableau[0] = {dateDebut : new Date('1970-12-27'), dateFin : new Date('1971-01-07')};
                var ret  = ctrl.tab(new Date('1970-01-04'), tableau);


                for (var i = 0; i < 51; i++)
                  for (var j = 0; j < 7; j++)
                    expect(ret[i][j]).toBe(0);

                for (var i = 51; i < 52; i++)
                  for (var j = 0; j < 7; j++)
                      expect(ret[i][j]).toBe(1);

              }));

              it('Test Out of range event Not So far', inject(function ($componentController) {

                start = new Date();

                var ctrl = $componentController('calendar', {}, {start: new Date(), data: []});

                var tableau = [];
                tableau[0] = {dateDebut : new Date('1969-12-27'), dateFin : new Date('1971-01-07')};
                var ret  = ctrl.tab(new Date('1970-01-04'), tableau);
                for (var i = 0; i < 53-1; i++)
                  for (var j = 0; j < 7; j++)
                    expect(ret[i][j]).toBe(1);
              }));
        });
    });
