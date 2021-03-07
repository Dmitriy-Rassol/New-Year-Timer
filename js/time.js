document.addEventListener('DOMContentLoaded', () => {
    // eslint-disable-next-line strict
    "use strict";

    function countTimer(deadline) {
        const timesOfDay = document.querySelector('#times-of-day'),
            time = document.querySelector('#time'),
            day = document.querySelector('#day'),
            newYear = document.querySelector('#new-year'),
            dayArr = [
                'Воскресенье',
                'Понедельник',
                'Вторник',
                'Среда',
                'Четверг',
                'Пятница',
                'Суббота'
            ],
            timesOfDayArr = [
                'Доброе утро',
                'Добрый день',
                'Добрый вечер',
                'Доброй ночи'
            ];

        function getTimeRemeaning() {
            const dateStop = new Date(deadline).getTime(),
                dateNow = new Date().getTime(),
                timeRemaining = (dateStop - dateNow) / 1000,
                seconds = new Date().getSeconds(),
                minutes = new Date().getMinutes(),
                daysBefore = Math.floor(timeRemaining / 60 / 60 / 24),
                hours = new Date().getHours(),
                ampm = hours >= 12 ? 'PM' : 'AM',
                dayWeek = new Date().getDay();

            return { daysBefore, dayWeek, hours, minutes, seconds, ampm };
        }

        function modifyZeroDate(inputDate) {
            if (inputDate >= 0 && inputDate < 10) {
                return '0' + inputDate;
            }
            return inputDate;
        }

        function modifyDate(hour) {
            hour %= 12,
            hour = hour ? hour : 12;
            return hour;
        }

        function getDayDate(indexDay) {
            dayArr.forEach((item, index) => {
                if (index === indexDay) {
                    day.textContent = item;
                }
            });
        }

        function gettimesOfDay(timesOfDayItem) {
            if (timesOfDayItem < 6) {
                timesOfDay.textContent = timesOfDayArr[3];
            } else if (timesOfDayItem < 12) {
                timesOfDay.textContent = timesOfDayArr[0];
            } else if (timesOfDayItem < 18) {
                timesOfDay.textContent = timesOfDayArr[1];
            } else if (timesOfDayItem < 23) {
                timesOfDay.textContent = timesOfDayArr[2];
            }
        }

        function updateClock() {
            const timer = getTimeRemeaning();
            gettimesOfDay(timer.hours);
            getDayDate(timer.dayWeek);
            time.textContent = modifyDate(timer.hours) + ':' +
            modifyZeroDate(timer.minutes) + ':' +
            modifyZeroDate(timer.seconds) + ' ' + timer.ampm;
            newYear.textContent = modifyZeroDate(timer.daysBefore);
            const idSetInterval = setInterval(updateClock, 1000);
            if (timer.timeRemaining <= 0) {
                clearInterval(idSetInterval);
            }
        }
        updateClock();
    }

    countTimer('1 jan 2022');

});
