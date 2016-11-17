
angular.module('calendar', ['config_calendar'])
.component('calendar', {
  templateUrl : 'template.html',
  bindings : {
   start : '=',
   data: '=',
   color: '='
 },
  controller: function(config){
      this.nb = 10;
    var isBissextile = function(a) {
                            if(a%4 == 0)
                              if(a%100 == 0){
                                if(a%400 == 0)
                                  return true;
                                }
                                else {
                                  return true;
                                }
                            return false;
                          };

    var grade = function(dateDepart, dateLock) {
                         var t1 = Math.round(dateLock.getTime()/1000.0);
                         var t2 = Math.round(dateDepart.getTime()/1000.0);
                         if (isNaN(t1) || isNaN(t2))
                            return null;
                         var t3 = t1 - t2;
                         t3 = Math.round(t3 / 86400);

                         if (isNaN(t3)) {
                           return null;
                         }
                         return t3;
                       };

    var fill = function(dateDepart) {
                        var tmp = new Date(dateDepart);
                        tmp.setDate(1);
                        var m = tmp.getMonth();
                        var c = 0;
                        this.month = [];
                        while (c < 13) {
                          var cal = Math.trunc(grade(dateDepart, tmp)/7)
                            this.month[c] = {mois :  config.month[m], indice : Math.trunc(grade(dateDepart, tmp)/7)};
                          if (tmp.getMonth()+1 == 12){
                                  tmp.setFullYear(tmp.getFullYear()+1);
                                  tmp.setMonth(0);
                                  m = 0;
                                }
                          else {
                                  tmp.setMonth(tmp.getMonth()+1);
                                  m++;
                            }
                          c++;
                        }
                        return this.month;
                      };

    var init_tab = function(calendar) {
                            var cmp = 0;
                            for (var i = 0; i < 53; i++) {
                              calendar.push([]);
                              for (var j = 0; j < 7; j++) {
                                cmp++;
                                if (cmp <= 365)
                                  calendar[i].push(0);
                                else
                                  calendar[i].push(null);
                              }
                            }
                          };

    var tab = function(dateDepart, tab) {
                        var calendar = [];
                        init_tab(calendar);
                        for (date of tab) {

                          if (date.dateFin == null)
                              date.dateFin = new Date(date.dateDebut);
                            var nbDebut = grade(new Date(dateDepart), new Date(date.dateDebut));
                            var nbFin = grade(new Date(dateDepart), new Date(date.dateFin));
                            if (nbFin < nbDebut || (nbDebut === null || nbFin === null) ||
                                  (nbDebut < 0 && nbFin < 0) ||  (nbDebut > 365 && nbFin > 365)){

                                    console.log("[Warning] Event: " + String(date.dateDebut)
                                                + " -> " + String(date.dateDebut) + " may induce malicious behavior");
                                    continue;
                            }

                            if (nbDebut < 0)
                                  nbDebut = 0;
                            if (nbFin > 365)
                                  nbFin = 365;
                            for (var i = nbDebut; i <= nbFin; i++) {
                              var x = Math.trunc(i/7);
                              var y = i-Math.trunc(i/7)*7;
                              if(x < 53 && x >= 0 && y >= 0 && y < 7)
                                calendar[x][y] += 1;
                            }
                          }
                        return calendar;
                      };



    var aujd = new Date(this.start);
    aujd.setYear(aujd.getFullYear()-1);

    this.weeks = tab(aujd, this.data);
    this.month = fill(aujd);

    color = typeof this.color === "undefined" ? "" : this.color.toString().trim();

    switch (color) {
      case 'red':
        this.low_color = "rgb(255, 204, 204)";
        this.medium_color = "rgb(255, 51, 51)";
        this.hight_color = "rgb(153, 0, 0)";
        break;
      case 'blue':
        this.low_color = "rgb(204, 204, 255)";
        this.medium_color = "rgb(51, 51, 255)";
        this.hight_color = "rgb(0, 0, 153)";
        break;
      default:
        this.low_color = "rgb(204, 255, 204)";
        this.medium_color = "rgb(51, 255, 51)";
        this.hight_color = "rgb(0, 153, 0)";

    }


  }

});
