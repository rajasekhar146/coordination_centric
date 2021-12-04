import Store from '../libs/store';
import get from 'lodash.get';
import moment from 'moment'

const weekDays = [0, 1, 2, 3, 4, 5]


export const getWeekDays = (data, selectedDate) => {
    var weekDaysAvailablities = []
    const availabilities = get(data, ['availabilities', '0', 'days'], []);
    const appointments = get(data, ['appointments'], []);
    weekDays.forEach(d => {
        const currentDate = moment(selectedDate).add(d, 'd')
        console.log('day', currentDate.format('dddd, DD'), d)
        const dayValue = currentDate.format('dddd, DD').split(",", 2)
        const availabilityDayDetail = {
            dayDesc: currentDate.format('dddd, DD'),
            availableTimeSlots: getAvailabilites(availabilities, dayValue[0], appointments, currentDate),
            day: currentDate.format('YYYY-MM-DD'),
        }
        weekDaysAvailablities.push(availabilityDayDetail)
    })
    AppointmentSlotsStore.set({ appointmentSlots: weekDaysAvailablities })
    // return weekDaysAvailablities
}

const createTimeSlot = (item, appointments, date) => {
    const slotInterval = 30;
    const allTimes = []
    let startTime = moment(new Date(item.first_half_starting_time), "HH:mm")
    let endTime = moment(new Date(item.first_half_ending_time), "HH:mm");
    let secondHalffStartTime = moment(new Date(item.second_half_starting_time), "HH:mm")
    let secondHalfEndTime = moment(new Date(item.second_half_ending_time), "HH:mm");
    const currentTimeStamp = moment(new Date()).format('YYYY-MM-DD');
    const slotStartingDay = moment(date).format('YYYY-MM-DD');
    const startingTime = moment(new Date(startTime), "HH:mm").format("HH:mm")
    const currentDate = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
    const startingDate = moment(currentTimeStamp + ' ' + startingTime, 'YYYY-MM-DD HH:mm').format('YYYY-MM-DD HH:mm:ss')

    let availabilityId = 1

    while (startTime < endTime) {
        let disableIndex;
        disableIndex = appointments.findIndex(i => {
            return moment(new Date(i.startTime), "HH:mm").format("HH:mm") === moment(new Date(item.first_half_starting_time), "HH:mm").format("HH:mm")
        })
        if (slotStartingDay === currentTimeStamp) {
            if (moment(new Date(startTime), "HH:mm").format("HH:mm") < moment(new Date(), "HH:mm").format("HH:mm")) {
                disableIndex = null
            }
        }
        //Push times
        allTimes.push({
            availabilityId,
            availableTimeSlots: {
                startTime: moment(new Date(startTime), "HH:mm").format("HH:mm"),
                endTime: moment(new Date(startTime.add(slotInterval, 'minutes')), "HH:mm").format("HH:mm")
            },
            isSelected: false,
            isEnabled: disableIndex ? true : false
        });
        //Add interval of 30 minutes
        // startTime.add(slotInterval, 'minutes');
        availabilityId += 1
    }

    while (secondHalffStartTime < secondHalfEndTime) {
        const disableIndex = appointments.findIndex(i => {
            return moment(new Date(i.startTime), "HH:mm").format("HH:mm") === moment(new Date(item.second_half_starting_time), "HH:mm").format("HH:mm")

        })
        //Push times
        allTimes.push({
            availabilityId,
            availableTimeSlots: {
                startTime: moment(new Date(secondHalffStartTime), "HH:mm").format("HH:mm"),
                endTime: moment(new Date(secondHalffStartTime.add(slotInterval, 'minutes')), "HH:mm").format("HH:mm")
            },
            isSelected: false,
            isEnabled: disableIndex ? true : false
        });
        //Add interval of 30 minutes
        // startTime.add(slotInterval, 'minutes');
        availabilityId += 1
    }
    return allTimes;
}

const getAvailabilites = (data, day, appointments, date) => {
    let availablities = [];
    const filteredArray = data.filter((val) => val.day === day)
    if (filteredArray.length) {
        availablities = createTimeSlot(get(filteredArray, ['0'], {}), appointments, date)
    }
    return availablities;
}



const AppointmentSlotsStore = new Store({
    appointmentSlots: []
},
    [

    ]);

export default AppointmentSlotsStore;
