import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  rosterTimesWithCardAmounts: Map<string, number> = new Map<string, number>([
    ['12:00', 1],
    ['13:00', 1],
    ['14:00', 3],
    ['15:00', 1],
    ['16:00', 2]
  ])

  days: string[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  gridTemplateAreas: string;
  gridTemplateColumns: string;

  private columnLength: string = '100px';

  ngOnInit(): void {
    this.calculateGridTemplateAreas();
    this.calculateGridTemplateColumns();
  }

  private calculateGridTemplateAreas() {
    this.gridTemplateAreas = '"addCalendar"';
    this.rosterTimesWithCardAmounts.forEach((numberOfCards, rosterTime) => {
      let tmp = '';
      for (let i = 0; i < numberOfCards; i++) {
        tmp = `${tmp} "${this.convertRosterTimeToCssReadableString(rosterTime)}"`;
      }
      this.gridTemplateAreas = `${this.gridTemplateAreas} ${tmp}`;
    })
    console.log(this.gridTemplateAreas);
  }

  private calculateGridTemplateColumns(): void {
    this.gridTemplateColumns = this.days.reduce((previousValue, currentValue, currentIndex) => {
      if (currentIndex === 1) {
        // Need to add a column for the sidebar
        previousValue = `[sidebar] ${this.columnLength} [${previousValue}] ${this.columnLength}`;
      }
      return `${previousValue} [${currentValue}] ${this.columnLength}`
    });
  }

  convertRosterTimeToCssReadableString(rosterTime: string): string {
    // The CSS won't work if we write 12:00 as it will read it as two numbers and not a string
    return `t${rosterTime.replace(':', '-')}`;
  }

  private convertStart(rosterTime: string): string {
    return  `${this.convertRosterTimeToCssReadableString(rosterTime)}-start`;
  }

  private convertEnd(rosterTime: string): string {
    return  `${this.convertRosterTimeToCssReadableString(rosterTime)}-end`;
  }

  convertRosterTimeToCssReadableRow(rosterTime: string): string {
    return `${this.convertStart(rosterTime)} / ${this.convertEnd(rosterTime)}`;
  }

  clickMe(): void {
    this.rosterTimesWithCardAmounts.set('14:00', Math.random() * 5);
    this.calculateGridTemplateAreas();
  }

  get rosterTimes(): string[] {
    return [...this.rosterTimesWithCardAmounts.keys()];
  }
}
