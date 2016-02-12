var $injector = angular.injector(['ng']);
var $compile = $injector.get('$compile');
var $scope = $('[ha-book-flight-results-end-on-end]').scope();
var table = $('.flight-results tr');
var modalLink = $('<div class="test-ec-details"><a href ng-click="showSeatClassModal(class.CabinType.toLowerCase()); preventDefault()"></a></div>')

$('<style>.test-ec-details { font-size: 0.75em; position: absolute; bottom: 0; width: calc(100%); left: -0px; border-top: solid 1px #E0E0DB; }</style>').appendTo('head');
$('<style>.seat-class { width: 200px }</style>').appendTo('head');
$('<style>.table-header tr th {text-align: center; text-transform: uppercase; }</style>').appendTo('head');
$('<style>.table-header tr th a {display: none }</style>').appendTo('head');
$('<style>.priceRoundTrip {color: #B83292 }</style>').appendTo('head');
$('<style>.test-ec-details a href {color: #007EB1; }</style>').appendTo('head');
$('<style>.cabinInfo {font-size: 0.80em; }</style>').appendTo('head');


// cannot use text transform for style th it will affect all accompanied text

table.each(function(index, element) {
    $(element).find('td:nth-child(3)').hide();
})

$('.flight-results thead th:nth-of-type(3)').hide();

$('.mixed-class-details').remove();

$('.table-header tr:first-child th:first-child').append('<span class="priceRoundTrip"> All PRICES ARE NOW ROUNDTRIP </span>');

$('#leg-1-class-COACH').append('<span class="cabinInfo"> Contains both Standard' + modalLink + 'and  extra comfort seats </span>');
$('#leg-1-class-FIRST').append('<span class="cabinInfo"> Our highest level of service </span>');



function getDetails() {
    var legs = {
        flights: [],
        passengers: $('[ha-book-flight-results-end-on-end]').scope().$pax.passengers.length
    }

    $scope.searchResults[0].ActiveTab.TripAndFareDetails.forEach(function (element, index) {

        var cabin = element.FareDetails.filter(function (x) {
            return x.CabinType === 'ExtraComfort'
        });

        cabin.forEach(function (element, i) {
            legs.flights[index] = element.BookingCount
        });
    })

    return legs;
}

// function getCabinType() {
//     var type = {
//         title: $scope.getCabinDisplayName
//     };

// }

var details = getDetails();

details.flights.forEach(function(element, index) {

    // temporary to force limited seats available
    element = index % 2 === 0 ? 2 : element

    if(details.passengers <= element) {
        modalLink.find('a').text('Extra Comfort available');
        $(table[index]).find('td:first-of-type').append($compile(modalLink[0].outerHTML)($scope));
    } else if(element < details.passengers && element > 0) {
        modalLink.find('a').css({'color': '#007EB1'}).text('Only ' + element + ' Extra comfort seat left');
        $(table[index]).find('td:first-of-type').append($compile(modalLink[0].outerHTML)($scope));
    } else if (element === 0) {
        $(table[index]).find('td:first-of-type').append('<div class="test-ec-details">no ec available</div>')
    }

    // dynamic height option - not ideal!!!!
    //var height = $(table[index]).find('td:first-of-type').height()
    //$(table[index]).find('td:first-of-type').height(height + $(table[index]).find('td:first-of-type .test-ec-details').height())
})