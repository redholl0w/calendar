var config_calendar = angular.module('config_calendar', [])
.constant('config',{
 month : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug',
                    'Sep', 'Oct', 'Nov', 'Dec'],
 templateUrl : 'js/template.html'
});
config_calendar.run(function($templateCache) {
  $templateCache.put('template_calendar.html', '<div id="calendar" style="display : inline-block">'+
'<div ng-repeat="days in $ctrl.weeks" ng-init="parentIndex = $index" style="display : inline-block">'+
    '<span ng-repeat="indice in $ctrl.month track by $index" >'+

         '<span ng-if="indice.indice == $parent.$index" style="font-size : 10px;">'+
           '{{indice.mois}}'+
         '</span>'+

    '</span>'+
    '<span style="padding: 3.5px"></span>'+
  '</div>'+

  '</br>'+

    '<div ng-repeat="days in $ctrl.weeks" ng-init="parentIndex = $index" style="display : inline-block">'+

        '<div ng-repeat="day in days track by $index" style="">'+
          '<svg width="11" height="11">' +
            '<rect ng-if="day == 1" width="10" height="10" style="fill:{{$ctrl.low_color}};" />' +
            '<rect ng-if="day >= 2" width="10" height="10" style="fill:{{$ctrl.medium_color}};" />' +
            '<rect ng-if="day >= 4" width="10" height="10" style="fill:{{$ctrl.hight_color}};" />' +
            '<rect ng-if="day == 0" width="10" height="10" style="fill:rgb(224, 224, 224);" />' +
          '</svg>' +
        '</div>' +

    '</div>' +

  '</div>');
});

module.exports = config_calendar;