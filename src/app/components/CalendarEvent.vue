<template>
  <div class="day-event" :style="getEventBackgroundColor">
    <div>
      <div v-if="!event.edit">
        <span class="has-text-centered details">{{ event.details }}</span>
        <div class="has-text-centered icons">
          <i class="fa fa-pencil-square edit-icon" @click="edit(day.id, event.details)"></i>
          <i class="fa fa-trash-o delete-icon" @click="deleteEvent(day.id, event.details)"></i>
        </div>
      </div>
      <div v-else>
        <form @submit.prevent="done(day.id)">
          <div class="has-text-centered icons">
            <input type="text" :placeholder="event.details" v-model="eventDetails" />
            <i class="fa fa-check" @click="done(day.id)"></i>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { store } from '../store.js';
export default {
  name: 'CalendarEvent',
  props: ['event', 'day'],
  data() {
    return {
      eventDetails: this.event.details,
    };
  },
  computed: {
    getEventBackgroundColor() {
      const colors = ['#FF9999', '#85D6FF', '#99FF99'];
      let randomColor = colors[Math.floor(Math.random() * colors.length)];
      return `background-color: ${randomColor}`;
    }
  },
  methods: {
    edit(dayId, eventDetails) {
      store.editEvent(dayId, eventDetails);
    },
    done(dayId) {
      if (this.eventDetails === '') return store.resetSameDayEvents(dayId);
      store.updateEvent(dayId, this.eventDetails);
    },
    deleteEvent(dayId, eventDetails) {
      store.deleteEvent(dayId, eventDetails);
    },
  }
}
</script>

<style lang="scss">
.day-event {
  margin-top: 6px;
  margin-bottom: 6px;
  display: block;
  color: #4C4C4C;
  padding: 5px;

  .details {
    display: block;
  }

  .icons .fa {
    padding: 0 2px;
  }

  input {
    background: none;
    border: 0;
    border-bottom: 1px solid #FFF;
    width: 100%;

    &:focus {
      outline: none;
    }
  }
}
</style>
