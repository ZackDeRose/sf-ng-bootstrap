import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgbDate } from './ngb-date';
import { NgbDatepickerI18n } from './datepicker-i18n';
var NgbDatepickerMonthView = (function () {
    function NgbDatepickerMonthView(i18n) {
        this.i18n = i18n;
        this.select = new EventEmitter();
    }
    NgbDatepickerMonthView.prototype.doSelect = function (day) {
        if (!day.context.disabled && !this.isHidden(day)) {
            this.select.emit(NgbDate.from(day.date));
        }
    };
    NgbDatepickerMonthView.prototype.isCollapsed = function (week) {
        return this.outsideDays === 'collapsed' && week.days[0].date.month !== this.month.number &&
            week.days[week.days.length - 1].date.month !== this.month.number;
    };
    NgbDatepickerMonthView.prototype.isHidden = function (day) {
        return (this.outsideDays === 'hidden' || this.outsideDays === 'collapsed') && this.month.number !== day.date.month;
    };
    return NgbDatepickerMonthView;
}());
export { NgbDatepickerMonthView };
NgbDatepickerMonthView.decorators = [
    { type: Component, args: [{
                selector: 'ngb-datepicker-month-view',
                host: { 'class': 'd-block' },
                styles: ["\n    .ngb-dp-weekday, .ngb-dp-week-number {\n    }\n    .ngb-dp-day, .ngb-dp-weekday, .ngb-dp-week-number {\n    }\n    .ngb-dp-day {\n      cursor: pointer;\n    }\n    .ngb-dp-day.disabled, .ngb-dp-day.hidden {\n      cursor: default;\n    }\n  "],
                template: "\n    <div *ngIf=\"showWeekdays\" class=\"ngb-dp-week d-flex\">\n      <div *ngIf=\"showWeekNumbers\" class=\"ngb-dp-weekday\"></div>\n      <div *ngFor=\"let w of month.weekdays\" class=\"ngb-dp-weekday\">\n        {{ i18n.getWeekdayShortName(w) }}\n      </div>\n    </div>\n    <ng-template ngFor let-week [ngForOf]=\"month.weeks\">\n      <div *ngIf=\"!isCollapsed(week)\" class=\"ngb-dp-week d-flex\">\n        <div *ngIf=\"showWeekNumbers\" class=\"ngb-dp-week-number text-muted\">{{ week.number }}</div>\n        <div *ngFor=\"let day of week.days\"\n             (click)=\"doSelect(day)\"\n             class=\"ngb-dp-day\"\n             [class.disabled]=\"day.context.disabled\"\n             [class.hidden]=\"isHidden(day)\">\n          <ng-template [ngIf]=\"!isHidden(day)\">\n            <ng-template [ngTemplateOutlet]=\"dayTemplate\" [ngTemplateOutletContext]=\"day.context\"></ng-template>\n          </ng-template>\n        </div>\n      </div>\n    </ng-template>\n  "
            },] },
];
/** @nocollapse */
NgbDatepickerMonthView.ctorParameters = function () { return [
    { type: NgbDatepickerI18n, },
]; };
NgbDatepickerMonthView.propDecorators = {
    'dayTemplate': [{ type: Input },],
    'month': [{ type: Input },],
    'outsideDays': [{ type: Input },],
    'showWeekdays': [{ type: Input },],
    'showWeekNumbers': [{ type: Input },],
    'select': [{ type: Output },],
};
//# sourceMappingURL=datepicker-month-view.js.map