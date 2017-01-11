angular.module('calendar', ['config_calendar'])
.component('calendar', {
  templateUrl : 'template_calendar.html',
  bindings : {
   start : '=',
   data: '=',
   color: '='
 },
  controller: function(config){
      this.nb = 10;
      var ctrl = this;
    ctrl.isBissextile = function(a) {
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

ctrl.grade = function(dateDepart, dateLock) {
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

    ctrl.fill = function(dateDepart) {
                        var tmp = new Date(dateDepart);
                        tmp.setDate(1);
                        var m = tmp.getMonth();
                        var c = 0;
                        this.month = [];
                        while (c < 13) {
                          var cal = Math.trunc(this.grade(dateDepart, tmp)/7)
                            this.month[c] = {mois :  config.month[m], indice : Math.trunc(this.grade(dateDepart, tmp)/7)};
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

    ctrl.init_tab = function(calendar) {
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

    ctrl.tab = function(dateDepart, tab) {
                        var calendar = [];
                        this.init_tab(calendar);
                        for (date of tab) {

                          if (date.dateFin == null)
                              date.dateFin = new Date(date.dateDebut);
                            var nbDebut = this.grade(new Date(dateDepart), new Date(date.dateDebut));
                            var nbFin = this.grade(new Date(dateDepart), new Date(date.dateFin));
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
                              var x = Math.trunc(i / 7);
                              var y = i-Math.trunc(i / 7) * 7;
                              if(x < 53 && x >= 0 && y >= 0 && y < 7)
                                calendar[x][y] += 1;
                            }
                          }
                        return calendar;
                      };



                      function hslToRgb(h, s, l){
                          var r, g, b;

                          if(s == 0){
                              r = g = b = l; // achromatic
                          }else{
                              var hue2rgb = function hue2rgb(p, q, t){
                                  if(t < 0) t += 1;
                                  if(t > 1) t -= 1;
                                  if(t < 1/6) return p + (q - p) * 6 * t;
                                  if(t < 1/2) return q;
                                  if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
                                  return p;
                              }

                              var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
                              var p = 2 * l - q;
                              r = hue2rgb(p, q, h + 1/3);
                              g = hue2rgb(p, q, h);
                              b = hue2rgb(p, q, h - 1/3);
                          }

                          return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
                      }


                      function rgbToHsl(r, g, b){
                        r /= 255, g /= 255, b /= 255;
                        var max = Math.max(r, g, b), min = Math.min(r, g, b);
                        var h, s, l = (max + min) / 2.0;

                        if(max == min){
                            h = s = 0; // achromatic
                        }else{
                            var d = max - min;
                            s = l > 0.5 ? d / (2.0 - max - min) : d / (max + min);
                            switch(max){
                                case r: h = (g - b) / d + (g < b ? 6.0 : 0); break;
                                case g: h = (b - r) / d + 2.0; break;
                                case b: h = (r - g) / d + 4.0; break;
                            }
                            h /= 6.0;
                        }

                        return [h, s, l];
                      }

                      function hexToRgb(hex) {
                          // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
                          var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
                          hex = hex.replace(shorthandRegex, function(m, r, g, b) {
                              return r + r + g + g + b + b;
                          });

                          var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
                          return result ? {
                              r: parseInt(result[1], 16),
                              g: parseInt(result[2], 16),
                              b: parseInt(result[3], 16)
                          } : null;
                      }

    var aujd = new Date(this.start);
    aujd.setYear(aujd.getFullYear() - 1);

    this.weeks = ctrl.tab(aujd, this.data);
    this.month = ctrl.fill(aujd);

    color = typeof this.color === "undefined" ? "008000" : this.color.toString().trim().replace("#", "");

    var c = hexToRgb(color);
    c = rgbToHsl(c['r'], c['g'], c['b'])

    final_color = hslToRgb(c[0], c[1], c[2]+0.35);
    this.low_color = "rgb("+ final_color[0] +", " + final_color[1] + ", "+ final_color[2]+")";

    final_color = hslToRgb(c[0], c[1], c[2]+0.20);
    this.medium_color = "rgb("+ final_color[0] +", " + final_color[1] + ", "+ final_color[2]+")";

    this.hight_color = "#" + color;

  }

});
