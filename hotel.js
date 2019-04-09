const message = require('./message');

// rules for the room
const MAX_ADULT_PER_ROOM = 3;
const MAX_CHILDREN_PER_ROOM = 3;
const MAX_ROOM_PER_BOOKING = 3

const assign = (noOfAdult, noOfChild, noOfInfant) => {
    const roomNeeded = getRoomNeeded(noOfAdult, noOfChild);
    if(roomNeeded > MAX_ROOM_PER_BOOKING) {
        return message.getErrorObj('exceed_no_room_per_booking', 'Number of room limits to 3 per booking');
    }

    //lets assign the number of guest evenly for each type
    const adultPerRoom = getNoOfPersonPerRoom(noOfAdult, roomNeeded);
    const childPerRoom = getNoOfPersonPerRoom(noOfChild, roomNeeded);
    const infantPerRoom = getNoOfPersonPerRoom(noOfInfant, roomNeeded);

    const rooms = [];
    let totalAdultsLeftToAssign = noOfAdult;
    let totalChildrenLeftToAssign = noOfChild;
    let totalInfantLeftToAssign = noOfInfant;

    for (let i = 0; i < roomNeeded; i++) {
        let adults = totalAdultsLeftToAssign > adultPerRoom ? adultPerRoom : totalAdultsLeftToAssign;
        let children = totalChildrenLeftToAssign > childPerRoom ? childPerRoom : totalChildrenLeftToAssign;
        let infant = totalInfantLeftToAssign > infantPerRoom ? infantPerRoom : totalInfantLeftToAssign;
    
        if(adults === 0 && children > 0) {
            return message.getErrorObj('no_child_alone', 'No child shall be left alone in a room');
        }
    
        totalAdultsLeftToAssign -= adults;
        totalChildrenLeftToAssign -= children;
    
        rooms.push({
            adults,
            children,
            infant
        })
    }

    return message.getSuccessObj({
        noOfRoom: roomNeeded,
        rooms
    });
}

// only check based on adults and children, infant will be ignored
const getRoomNeeded = (noOfAdult, noOfChild) => {
    const roomNeededForAdult = Math.ceil(noOfAdult / MAX_ADULT_PER_ROOM);
    const roomNeededForChildren = Math.ceil(noOfChild / MAX_CHILDREN_PER_ROOM);

    return roomNeededForAdult >= roomNeededForChildren ? roomNeededForAdult : roomNeededForChildren;
}

const getNoOfPersonPerRoom = (noOfPersons, noOfRoom) => {
    return Math.ceil(noOfPersons / noOfRoom);
}

module.exports = {
    assign,
    getRoomNeeded,
}