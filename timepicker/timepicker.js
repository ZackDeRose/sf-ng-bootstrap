import { Component, Input, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { isNumber, padNumber, toInteger } from '../util/util';
import { NgbTime } from './ngb-time';
import { NgbTimepickerConfig } from './timepicker-config';
var NGB_TIMEPICKER_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return NgbTimepicker; }),
    multi: true
};
/**
 * A lightweight & configurable timepicker directive.
 */
var NgbTimepicker = (function () {
    function NgbTimepicker(config) {
        this.onChange = function (_) { };
        this.onTouched = function () { };
        this.meridian = config.meridian;
        this.spinners = config.spinners;
        this.seconds = config.seconds;
        this.hourStep = config.hourStep;
        this.minuteStep = config.minuteStep;
        this.secondStep = config.secondStep;
        this.disabled = config.disabled;
        this.readonlyInputs = config.readonlyInputs;
        this.size = config.size;
    }
    NgbTimepicker.prototype.writeValue = function (value) {
        this.model = value ? new NgbTime(value.hour, value.minute, value.second) : new NgbTime();
        if (!this.seconds && (!value || !isNumber(value.second))) {
            this.model.second = 0;
        }
    };
    NgbTimepicker.prototype.registerOnChange = function (fn) { this.onChange = fn; };
    NgbTimepicker.prototype.registerOnTouched = function (fn) { this.onTouched = fn; };
    NgbTimepicker.prototype.setDisabledState = function (isDisabled) { this.disabled = isDisabled; };
    NgbTimepicker.prototype.changeHour = function (step) {
        this.model.changeHour(step);
        this.propagateModelChange();
    };
    NgbTimepicker.prototype.changeMinute = function (step) {
        this.model.changeMinute(step);
        this.propagateModelChange();
    };
    NgbTimepicker.prototype.changeSecond = function (step) {
        this.model.changeSecond(step);
        this.propagateModelChange();
    };
    NgbTimepicker.prototype.updateHour = function (newVal) {
        var isPM = this.model.hour >= 12;
        var enteredHour = toInteger(newVal);
        if (this.meridian && (isPM && enteredHour < 12 || !isPM && enteredHour === 12)) {
            this.model.updateHour(enteredHour + 12);
        }
        else {
            this.model.updateHour(enteredHour);
        }
        this.propagateModelChange();
    };
    NgbTimepicker.prototype.updateMinute = function (newVal) {
        this.model.updateMinute(toInteger(newVal));
        this.propagateModelChange();
    };
    NgbTimepicker.prototype.updateSecond = function (newVal) {
        this.model.updateSecond(toInteger(newVal));
        this.propagateModelChange();
    };
    NgbTimepicker.prototype.toggleMeridian = function () {
        if (this.meridian) {
            this.changeHour(12);
        }
    };
    NgbTimepicker.prototype.formatHour = function (value) {
        if (isNumber(value)) {
            if (this.meridian) {
                return padNumber(value % 12 === 0 ? 12 : value % 12);
            }
            else {
                return padNumber(value % 24);
            }
        }
        else {
            return padNumber(NaN);
        }
    };
    NgbTimepicker.prototype.formatMinSec = function (value) { return padNumber(value); };
    NgbTimepicker.prototype.setFormControlSize = function () { return { 'form-control-sm': this.size === 'small', 'form-control-lg': this.size === 'large' }; };
    NgbTimepicker.prototype.setButtonSize = function () { return { 'btn-sm': this.size === 'small', 'btn-lg': this.size === 'large' }; };
    NgbTimepicker.prototype.ngOnChanges = function (changes) {
        if (changes['seconds'] && !this.seconds && this.model && !isNumber(this.model.second)) {
            this.model.second = 0;
            this.propagateModelChange(false);
        }
    };
    NgbTimepicker.prototype.propagateModelChange = function (touched) {
        if (touched === void 0) { touched = true; }
        if (touched) {
            this.onTouched();
        }
        if (this.model.isValid(this.seconds)) {
            this.onChange({ hour: this.model.hour, minute: this.model.minute, second: this.model.second });
        }
        else {
            this.onChange(null);
        }
    };
    return NgbTimepicker;
}());
export { NgbTimepicker };
NgbTimepicker.decorators = [
    { type: Component, args: [{
                selector: 'ngb-timepicker',
                styles: ["\n    .ngb-tp {\n      display: flex;\n      align-items: center;\n    }\n    \n    .ngb-tp-hour, .ngb-tp-minute, .ngb-tp-second, .ngb-tp-meridian {\n      display: block;\n      flex-direction: column;\n      align-items: center;\n      justify-content: space-around;\n    }\n    \n    .ngb-tp-spacer {\n      width: 1em;\n      text-align: center;\n    }\n    \n    .chevron::before {\n      border-style: solid;\n      border-width: 0.29em 0.29em 0 0;\n      content: '';\n      display: inline-block;\n      height: 0.69em;\n      left: 0.05em;\n      position: relative;\n      top: 0.15em;\n      transform: rotate(-45deg);\n      -webkit-transform: rotate(-45deg);\n      -ms-transform: rotate(-45deg);\n      vertical-align: middle;\n      width: 0.71em;\n    }\n    .chevron.bottom:before {\n      top: -.3em;\n      -webkit-transform: rotate(135deg);\n      -ms-transform: rotate(135deg);\n      transform: rotate(135deg);\n    }\n    .btn-link {\n      outline: 0;\n    }\n    .btn-link.disabled {\n      cursor: not-allowed;\n      opacity: .65;\n    }\n    input {\n      text-align: center;\n      display: inline-block;\n      width: auto;\n    }\n    "],
                template: "\n    <fieldset [disabled]=\"disabled\" [class.disabled]=\"disabled\">\n      <div class=\"ngb-tp\">\n        <div class=\"ngb-tp-hour\">\n          <input type=\"text\"\n                 class=\"form-control\"\n                 [ngClass]=\"setFormControlSize()\"\n                 maxlength=\"2\"\n                 size=\"2\"\n                 placeholder=\"HH\"\n                 [value]=\"formatHour(model?.hour)\"\n                 (change)=\"updateHour($event.target.value)\"\n                 [readonly]=\"readonlyInputs\"\n                 [disabled]=\"disabled\"\n                 aria-label=\"Hours\">\n          <div>\n            <button tabIndex=\"-1\"\n                      *ngIf=\"spinners\"\n                      type=\"button\"\n                      class=\"btn-link btn-inc\"\n                      [ngClass]=\"setButtonSize()\"\n                      (click)=\"changeHour(hourStep)\"\n                      [disabled]=\"disabled\"\n                      [class.disabled]=\"disabled\">\n              <span class=\"chevron\"></span>\n            </button>\n            <button tabIndex=\"-1\"\n                    *ngIf=\"spinners\"\n                    type=\"button\"\n                    class=\"btn-link btn-dec\"\n                    [ngClass]=\"setButtonSize()\"\n                    (click)=\"changeHour(-hourStep)\"\n                    [disabled]=\"disabled\"\n                    [class.disabled]=\"disabled\">\n              <span class=\"chevron bottom\"></span>\n            </button>\n          </div>\n        </div>\n        <div class=\"ngb-tp-spacer\">:</div>\n        <div class=\"ngb-tp-minute\">\n          <input type=\"text\"\n                 class=\"form-control\"\n                 [ngClass]=\"setFormControlSize()\"\n                 maxlength=\"2\"\n                 size=\"2\"\n                 placeholder=\"MM\"\n                 [value]=\"formatMinSec(model?.minute)\"\n                 (change)=\"updateMinute($event.target.value)\"\n                 [readonly]=\"readonlyInputs\"\n                 [disabled]=\"disabled\"\n                 aria-label=\"Minutes\">\n          <div>\n            <button tabIndex=\"-1\"\n                    *ngIf=\"spinners\"\n                    type=\"button\"\n                    class=\"btn-link btn-inc\"\n                    [ngClass]=\"setButtonSize()\"\n                    (click)=\"changeMinute(minuteStep)\"\n                    [disabled]=\"disabled\"\n                    [class.disabled]=\"disabled\">\n              <span class=\"chevron\"></span>\n            </button>\n            <button tabIndex=\"-1\"\n                    *ngIf=\"spinners\"\n                    type=\"button\"\n                    class=\"btn-link btn-dec\"\n                    [ngClass]=\"setButtonSize()\"\n                    (click)=\"changeMinute(-minuteStep)\"\n                    [disabled]=\"disabled\"\n                    [class.disabled]=\"disabled\">\n              <span class=\"chevron bottom\"></span>\n            </button>\n          </div>\n        </div>\n        <div *ngIf=\"seconds\" class=\"ngb-tp-spacer\">:</div>\n        <div *ngIf=\"seconds\" class=\"ngb-tp-second\">\n          <input type=\"text\"\n                 class=\"form-control\"\n                 [ngClass]=\"setFormControlSize()\"\n                 maxlength=\"2\"\n                 size=\"2\"\n                 placeholder=\"SS\"\n                 [value]=\"formatMinSec(model?.second)\"\n                 (change)=\"updateSecond($event.target.value)\"\n                 [readonly]=\"readonlyInputs\" [disabled]=\"disabled\"\n                 aria-label=\"Seconds\">\n          <button tabIndex=\"-1\"\n                  *ngIf=\"spinners\"\n                  type=\"button\"\n                  class=\"btn-link btn-inc\"\n                  [ngClass]=\"setButtonSize()\"\n                  (click)=\"changeSecond(secondStep)\"\n                  [disabled]=\"disabled\"\n                  [class.disabled]=\"disabled\">\n            <span class=\"chevron\"></span>\n          </button>\n          <button tabIndex=\"-1\"\n                  *ngIf=\"spinners\"\n                  type=\"button\"\n                  class=\"btn-link btn-dec\"\n                  [ngClass]=\"setButtonSize()\"\n                  (click)=\"changeSecond(-secondStep)\"\n                  [disabled]=\"disabled\"\n                  [class.disabled]=\"disabled\">\n            <span class=\"chevron bottom\"></span>\n          </button>\n        </div>\n        <div *ngIf=\"meridian\" class=\"ngb-tp-spacer\"></div>\n        <div *ngIf=\"meridian\" class=\"ngb-tp-meridian\">\n          <button type=\"button\" class=\"btn btn-default\"\n          [ngClass]=\"setButtonSize()\"\n                  [disabled]=\"disabled\"\n                  [class.disabled]=\"disabled\"\n                  (click)=\"toggleMeridian()\">{{model?.hour >= 12 ? 'PM' : 'AM'}}</button>\n        </div>\n      </div>\n    </fieldset>\n    ",
                providers: [NGB_TIMEPICKER_VALUE_ACCESSOR]
            },] },
];
/** @nocollapse */
NgbTimepicker.ctorParameters = function () { return [
    { type: NgbTimepickerConfig, },
]; };
NgbTimepicker.propDecorators = {
    'meridian': [{ type: Input },],
    'spinners': [{ type: Input },],
    'seconds': [{ type: Input },],
    'hourStep': [{ type: Input },],
    'minuteStep': [{ type: Input },],
    'secondStep': [{ type: Input },],
    'readonlyInputs': [{ type: Input },],
    'size': [{ type: Input },],
};
//# sourceMappingURL=timepicker.js.map