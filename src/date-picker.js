import { createHtmlElement } from 'dom-utils';
import './date-picker.css';
import chevronUp from './chevron-up.svg';
import chevronDown from './chevron-down.svg';

const createDatePickerObject = function (){
    //let newDate = {};
    let month = -1;
    let day = 0;
    let year = new Date().getFullYear();
    let rolling = true;
    let fullMonth = true;

    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ];

    const daysInMonths = [ 31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];

    

    function incrementMonth(step){
        if (isValidMonth(month + step)){
            month += step;
        }
        else if (rolling === true){
            rollMonth(step);
        }
    }

    function rollMonth(step){
        if ((month + step) > 11){
            month = 0;
        }
        else if ((month + step) < 0){
            month = 11;
        }
    }

    function incrementDay(step){
        if (isValidDay(day + step)){
            day += step;
        }
        else if (rolling === true){
            rollDay(step);
        }
    }

    function rollDay(step){
        if ((day + step) < 1){
            day = 32 + step;
        }
        else if ((day + step) > 31){
            day = 0 + step;
        }
    }

    function incrementYear(step){
        year = year + step;
    }

    function isValidMonth(m){
        if (m >= 0 && m <= 11){
            return true;
        }

        return false;
    }

    function isValidDay(d){
        if (d > 0 && d < 32){
            return true;
        }

        return false;
    }

    function isValidYear(){
        return true;
    }


    function getMonth(){

        if (!isValidMonth(month)){
            return "Month"
        }

        if (fullMonth === true){
            return months[month];
        }
        else {
            return month;
        }
    }

    function getDay(){
        if (!isValidDay(day)){
            return "Day"
        }

        return day;
    }
    
    function getYear(){
        return year;
    }

    function getFullDate(){
        return `${months[month]} ${day} ${year}`;
    }

    return { incrementMonth, incrementDay, incrementYear, getDay, getMonth, getYear, getFullDate };

};

const createDatePickerElement = function (){
    const datePicker = createDatePickerObject();

    let datePickerElement = createHtmlElement({
        tag: "div",
        classes: [ "date-picker" ],
        attributes: {
            tabindex: 0,
        },
        children: [
            createHtmlElement({
                tag: "div",
                classes: [ "picker", "month-picker" ],
                children: [
                    createHtmlElement({
                        tag: "img",
                        classes: [ "up", "arrow" ],
                        properties: {
                            src: chevronUp,
                        },
                    }),
                    createHtmlElement({
                        tag: "div",
                        classes: [ "value", "month" ],
                        properties: {
                            textContent: "Month",
                        },
                    }),
                    createHtmlElement({
                        tag: "img",
                        classes: [ "down", "arrow" ],
                        properties: {
                            src: chevronDown,
                        },
                    }),
                ],
            }),
            createHtmlElement({
                tag: "div",
                classes: [ "picker", "day-picker" ],
                children: [
                    createHtmlElement({
                        tag: "img",
                        classes: [ "up", "arrow" ],
                        properties: {
                            src: chevronUp,
                        },
                    }),
                    createHtmlElement({
                        tag: "div",
                        classes: [ "value", "day" ],
                        properties: {
                            textContent: "Day",
                        },
                    }),
                    createHtmlElement({
                        tag: "img",
                        classes: [ "down", "arrow" ],
                        properties: {
                            src: chevronDown,
                        },
                    }),
                ],
            }),
            createHtmlElement({
                tag: "div",
                classes: [ "picker", "year-picker" ],
                children: [
                    createHtmlElement({
                        tag: "img",
                        classes: [ "up", "arrow" ],
                        properties: {
                            src: chevronUp,
                        },
                    }),
                    createHtmlElement({
                        tag: "div",
                        classes: [ "value", "year" ],
                        properties: {
                            textContent: "Year",
                        },
                    }),
                    createHtmlElement({
                        tag: "img",
                        classes: [ "down", "arrow" ],
                        properties: {
                            src: chevronDown,
                        },
                    }),
                ],
            }),
        ],
    });

    const monthPicker = datePickerElement.querySelector(".month-picker");
    const dayPicker = datePickerElement.querySelector(".day-picker");
    const yearPicker = datePickerElement.querySelector(".year-picker");

    monthPicker.addEventListener("click", clickedPicker);
    dayPicker.addEventListener("click", clickedPicker);
    yearPicker.addEventListener("click", clickedPicker);

    datePickerElement.addEventListener("focus", makeActive);
    datePickerElement.addEventListener("blur", blur);

    function clickedPicker(e){
        clearFocus();
        e.currentTarget.classList.add("focused");
        takeAction(e);
    }
    
    function takeAction(e){
        if (e.currentTarget.classList.contains("month-picker")){
            monthPicked(e);
        }
        else if(e.currentTarget.classList.contains("day-picker")){
            dayPicked(e);
        }
        else if (e.currentTarget.classList.contains("year-picker")){
            yearPicked(e);
        }
    }
    
    function monthPicked(e){
        const picker = e.target;
        if (picker.classList.contains("up")){
            datePicker.incrementMonth(1);
        }
        else if (picker.classList.contains("down")){
            datePicker.incrementMonth(-1);
        }
    
       
        e.currentTarget.querySelector(".value").textContent = datePicker.getMonth().toString().padStart(2, '0');
    
    }
    
    function dayPicked(e){
        const picker = e.target;
        if (picker.classList.contains("up")){
            datePicker.incrementDay(1);
        }
        else if (picker.classList.contains("down")){
            datePicker.incrementDay(-1);
        }
    
       
        e.currentTarget.querySelector(".value").textContent = datePicker.getDay().toString().padStart(2, '0');
    
    }
    
    function yearPicked(e){
        const picker = e.target;
        if (picker.classList.contains("up")){
            datePicker.incrementYear(1);
        }
        else if (picker.classList.contains("down")){
            datePicker.incrementYear(-1);
        }
    
       
        e.currentTarget.querySelector(".value").textContent = datePicker.getYear();
    
    
    }
    function blur(e){
        const arrows = document.querySelectorAll(".arrow");
    
        arrows.forEach(arrow => arrow.classList.remove("active"));
        clearFocus();
    
    }
    
    function makeActive(e){
        const arrows = e.target.querySelectorAll(".arrow");
    
        arrows.forEach(arrow => arrow.classList.add("active"));
        //clearFocus();
    
    }
    
    function clearFocus(){
        let pickers = document.querySelectorAll(".picker");
        
        pickers.forEach( (picker) => picker.classList.remove("focused"));
    }
    
    return {
        datePickerElement,
        getFullDate: datePicker.getFullDate,
        getYear: datePicker.getYear,
        getMonth: datePicker.getMonth,
        getDay: datePicker.getDay,
    }
}

const DatePicker = createDatePickerElement;

export { DatePicker };