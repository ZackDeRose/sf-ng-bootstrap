import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { NavigationEvent } from './datepicker-view-model';
import { NgbDatepickerI18n } from './datepicker-i18n';
import { NgbCalendar } from './ngb-calendar';
var NgbDatepickerNavigation = (function () {
    function NgbDatepickerNavigation(i18n, _calendar) {
        this.i18n = i18n;
        this._calendar = _calendar;
        this.navigation = NavigationEvent;
        this.navigate = new EventEmitter();
        this.select = new EventEmitter();
    }
    NgbDatepickerNavigation.prototype.doNavigate = function (event) { this.navigate.emit(event); };
    NgbDatepickerNavigation.prototype.nextDisabled = function () {
        return this.disabled || (this.maxDate && this._calendar.getNext(this.date, 'm').after(this.maxDate));
    };
    NgbDatepickerNavigation.prototype.prevDisabled = function () {
        var prevDate = this._calendar.getPrev(this.date, 'm');
        return this.disabled || (this.minDate && prevDate.year <= this.minDate.year && prevDate.month < this.minDate.month);
    };
    NgbDatepickerNavigation.prototype.selectDate = function (date) { this.select.emit(date); };
    return NgbDatepickerNavigation;
}());
export { NgbDatepickerNavigation };
NgbDatepickerNavigation.decorators = [
    { type: Component, args: [{
                selector: 'ngb-datepicker-navigation',
                changeDetection: ChangeDetectionStrategy.OnPush,
                host: { 'class': 'd-flex justify-content-between', '[class.collapsed]': '!showSelect' },
                template: "\n    <button type=\"button\"\n            class=\"btn btn-default pull-left\"\n            (click)=\"!!doNavigate(navigation.PREV)\"\n            [disabled]=\"prevDisabled()\"\n            tabindex=\"-1\">\n      <i class=\"fa fa-chevron-left\"></i>\n    </button>\n    <ngb-datepicker-navigation-select *ngIf=\"showSelect\"\n                                      class=\"d-block\"\n                                      [style.width.rem]=\"months * 9\"\n                                      [date]=\"date\"\n                                      [minDate]=\"minDate\"\n                                      [maxDate]=\"maxDate\"\n                                      [disabled] = \"disabled\"\n                                      (select)=\"selectDate($event)\">\n    </ngb-datepicker-navigation-select>\n    <button type=\"button\"\n            class=\"btn btn-default pull-right\"\n            (click)=\"!!doNavigate(navigation.NEXT)\"\n            [disabled]=\"nextDisabled()\"\n            tabindex=\"-1\">\n      <i class=\"fa fa-chevron-right\"></i>\n    </button>\n  "
            },] },
];
/** @nocollapse */
NgbDatepickerNavigation.ctorParameters = function () { return [
    { type: NgbDatepickerI18n, },
    { type: NgbCalendar, },
]; };
NgbDatepickerNavigation.propDecorators = {
    'date': [{ type: Input },],
    'disabled': [{ type: Input },],
    'maxDate': [{ type: Input },],
    'minDate': [{ type: Input },],
    'months': [{ type: Input },],
    'showSelect': [{ type: Input },],
    'showWeekNumbers': [{ type: Input },],
    'navigate': [{ type: Output },],
    'select': [{ type: Output },],
};
//# sourceMappingURL=datepicker-navigation.js.map