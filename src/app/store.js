import { seedData } from './seed.js'

export const store = {
  state: {
    seedData
  },
  load() {
    const savedData = window.localStorage.getItem('seedData');
    this.state.seedData = savedData ? JSON.parse(savedData) : seedData;
    return this.state;
  },
  getActiveDay() {
    return this.state.seedData.find(day => day.active);
  },
  setActiveDay(dayId) {
    this.state.seedData.map(dayObj => {
      dayObj.id === dayId ? dayObj.active = true : dayObj.active = false;
    });
  },
  submitEvent(eventDetails) {
    const activeDay = this.getActiveDay();
    activeDay.events.push({ "details": eventDetails, "edit": false });
    this.saveLocalStorage();
  },
  editEvent(dayId, eventDetails) {
    const day = this.state.seedData.find(day => day.id == dayId);
    const event = day.events.find(event => event.details === eventDetails);
    this.resetSameDayEvents(dayId);
    event.edit = true;
  },
  updateEvent(dayId, eventDetails) {
    const day = this.state.seedData.find(day => day.id == dayId);
    const event = day.events.find(event => event.edit === true);
    event.details = eventDetails;
    this.resetSameDayEvents(dayId);
    this.saveLocalStorage();
  },
  deleteEvent(dayId, eventDetails) {
    const day = this.state.seedData.find(day => day.id == dayId);
    const index = day.events.findIndex(event => event.details === eventDetails);
    day.events.splice(index, 1);
    this.saveLocalStorage();
  },
  resetSameDayEvents(dayId) {
    const day = this.state.seedData.find(day => day.id === dayId);
    day.events.forEach(event => event.edit = false);
  },
  saveLocalStorage() {
    window.localStorage.setItem('seedData', JSON.stringify(this.state.seedData));
  },
}
