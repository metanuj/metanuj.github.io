
(function ($) {

    var eCalendar = function (options, object) {
        // Initializing global variables
        var adDay = new Date().getDate();
        var adMonth = new Date().getMonth();
        var adYear = new Date().getFullYear();
        var dDay = adDay;
        var dMonth = adMonth;
        var dYear = adYear;
        var instance = object;

        var settings = $.extend({}, $.fn.eCalendar.defaults, options);

        function lpad(value, length, pad) {
            if (typeof pad == 'undefined') {
                pad = '0';
            }
            var p;
            for (var i = 0; i < length; i++) {
                p += pad;
            }
            return (p + value).slice(-length);
        }

        var mouseOver = function () {
            $(this).addClass('c-nav-btn-over');
        };
        var mouseLeave = function () {
            $(this).removeClass('c-nav-btn-over');
        };
        var mouseOverEvent = function () {
            $(this).addClass('c-event-over');
            var d = $(this).attr('data-event-day');
            $('div.c-event-item[data-event-day="' + d + '"]').addClass('c-event-over');
        };
        var mouseLeaveEvent = function () {
            $(this).removeClass('c-event-over')
            var d = $(this).attr('data-event-day');
            $('div.c-event-item[data-event-day="' + d + '"]').removeClass('c-event-over');
        };
        var mouseOverItem = function () {
            $(this).addClass('c-event-over');
            var d = $(this).attr('data-event-day');
            $('div.c-event[data-event-day="' + d + '"]').addClass('c-event-over');
        };
        var mouseLeaveItem = function () {
            $(this).removeClass('c-event-over')
            var d = $(this).attr('data-event-day');
            $('div.c-event[data-event-day="' + d + '"]').removeClass('c-event-over');
        };
        var nextMonth = function () {
            if (dMonth < 11) {
                dMonth++;
            } else {
                dMonth = 0;
                dYear++;
            }
            print();
            eventsTab();
        };
        var previousMonth = function () {
            if (dMonth > 0) {
                dMonth--;
            } else {
                dMonth = 11;
                dYear--;
            }
            print();
            eventsTab();
        };

        function loadEvents() {
            if (typeof settings.url != 'undefined' && settings.url != '') {
                
                var json = (function () { 
                    var json = null; 
                    $.ajax({ 
                        'async': false, 
                        'global': false, 
                        'url': settings.url, 
                        'dataType': "json", 
                        'success': function (data) {
                             json = data; 
                         }
                    });
                    return json;
                })();
                settings.events = json;
                console.log(json);
            }
            
            
        }

        function print() {
            loadEvents();
            var current_month;
            var dWeekDayOfMonthStart = new Date(dYear, dMonth, 1).getDay() - settings.firstDayOfWeek;
            console.log(dWeekDayOfMonthStart);
            if (dWeekDayOfMonthStart < 0) {
                dWeekDayOfMonthStart = 6 - ((dWeekDayOfMonthStart + 1) * -1);
            }
            var dLastDayOfMonth = new Date(dYear, dMonth + 1, 0).getDate();
            var dLastDayOfPreviousMonth = new Date(dYear, dMonth + 1, 0).getDate() - dWeekDayOfMonthStart + 1;

            var cBody = $('<div/>').addClass('c-grid');
            var cEvents = $('<div/>').addClass('c-event-grid');
            var cEventsBody = $('<div/>').addClass('c-event-body');
            cEvents.append($('<div/>').addClass('c-event-title c-pad-top').html(settings.eventTitle));
            cEvents.append(cEventsBody);
            var cNext = $('<div/>').addClass('c-next c-grid-title c-pad-top');
            var cMonth = $('<div/>').addClass('c-month c-grid-title c-pad-top');
            var cPrevious = $('<div/>').addClass('c-previous c-grid-title c-pad-top');
            cPrevious.html(settings.textArrows.previous);
            cMonth.html(settings.months[dMonth] + ' ' + dYear);
            cNext.html(settings.textArrows.next);

            cPrevious.on('mouseover', mouseOver).on('mouseleave', mouseLeave).on('click', previousMonth);
            cNext.on('mouseover', mouseOver).on('mouseleave', mouseLeave).on('click', nextMonth);

            cBody.append(cPrevious);
            cBody.append(cMonth);
            cBody.append(cNext);
            var dayOfWeek = settings.firstDayOfWeek;
            for (var i = 0; i < 7; i++) {
                if (dayOfWeek > 6) {
                    dayOfWeek = 0;
                }
               // var cWeekDay = $('<div/>').addClass('c-week-day c-pad-top');
                //cWeekDay.html(settings.weekDays[dayOfWeek]);
               // cBody.append(cWeekDay);
                dayOfWeek++;
            }
            var day = 1;
            var dayOfNextMonth = 1;
            for (var i = 0; i < 42; i++) {
                var cDay = $('<div/>');
                if (i < dWeekDayOfMonthStart) {
                    cDay.addClass('c-day-previous-month c-pad-top');
                    cDay.html(dLastDayOfPreviousMonth++);
                } else if (day <= dLastDayOfMonth) {
                    cDay.addClass('c-day c-pad-top');
                    if (day == dDay && adMonth == dMonth && adYear == dYear) {
                        cDay.addClass('c-today');
                    }
                    for (var j = 0; j < settings.events.length; j++) {
                        var y = settings.events[j].year;
                        var m = settings.events[j].month;
                        var d = settings.events[j].day;
                        var h = settings.events[j].hours;                      
                        if (d == day && m == dMonth && y == dYear) {
                            cDay.addClass('c-event').attr('data-event-day', d);
                            cDay.on('mouseover', mouseOverEvent).on('mouseleave', mouseLeaveEvent);
                            current_month = "<span>"+ settings.months[dMonth].slice(0,3) + "</span>";
                        }
                    }
                    cDay.html(day++).append(current_month);
                } else {
                    cDay.addClass('c-day-next-month c-pad-top');
                    cDay.html(dayOfNextMonth++);
                }
                cBody.append(cDay);
            }
            var eventList = $('<div/>').addClass('c-event-list');
            for (var i = 0; i < settings.events.length; i++) {
                var y = settings.events[i].year;
                var m = settings.events[i].month;
                var d = settings.events[i].day;
                var h = settings.events[i].hours;  
                var mi = settings.events[i].minutes;  
                if (m == dMonth && y == dYear) {
                    var date = lpad(d, 2) + '/' + lpad(m + 1, 2) + ' ' + lpad(h, 2) + ':' + lpad(mi, 2);
                    var item = $('<div/>').addClass('c-event-item');
                    var title = $('<div/>').addClass('title').html(date + '  ' + settings.events[i].title + '<br/>');
                    var description = $('<div/>').addClass('description').html(settings.events[i].description + '<br/>');
                    item.attr('data-event-day', d);
                    item.on('mouseover', mouseOverItem).on('mouseleave', mouseLeaveItem);
                    item.append(title).append(description);

                    // Add the url to the description if is set
                    if( settings.events[i].url !== undefined )
                    {
                        /**
                         * If the setting url_blank is set and is true, the target of the url
                         * will be "_blank"
                         */
                        type_url = settings.events[i].url_blank !== undefined && 
                                   settings.events[i].url_blank === true ? 
                                   '_blank':'';
                        description.wrap( '<a href="'+ settings.events[i].url +'" target="'+type_url+'" ></a>' );
                    }

                    eventList.append(item);
                }
            }
            $(instance).addClass('calendar');
            cEventsBody.append(eventList);
            $(instance).html(cBody).append(cEvents);
        }

        return print();
    }

    $.fn.eCalendar = function (oInit) {
        return this.each(function () {
            return eCalendar(oInit, $(this));
        });
    };

    // plugin defaults
    $.fn.eCalendar.defaults = {
        weekDays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        textArrows: {previous: '<', next: '>'},
        eventTitle: 'Events',
        url: 'my-event.json',
       
        firstDayOfWeek: 0
    };
    function eventsTab(){
        $(".calendar .c-event:not(:first)").addClass('inactiveEvent');
        $('.c-event-body .c-event-item').hide();
        $('.c-event-body .c-event-item:first').show();
        $(".calendar").on("click", ".c-event", function(){
          //alert("in");
            var dattr = $(this).attr("data-event-day");
            if($(this).hasClass('inactiveEvent')){ //this is the start of our condition 
                $('.calendar .c-event').addClass('inactiveEvent');           
                $(this).removeClass('inactiveEvent');
                
                $('.c-event-body .c-event-item').hide();
                $('.c-event-body .c-event-item[data-event-day="' + dattr + '"]').fadeIn('slow');
             }
            console.log("dattr : " + dattr );
        });
    }

}(jQuery));
  