export const clock = (state = new Date(), {type, payload} = {type: "", payload: 0}) => {
  const date = new Date(state.getTime())
  switch(type) {
    case 'SECOND':
      date.setSeconds(date.getSeconds() + payload);
      return date;

    case 'HOUR':
      date.setHours(date.getHours() + payload);
      return date;

    default:
      return state;
  }
}

const defaultPeople = [
  {name: "john", time: clock()},
  {name: "sara", time: clock()},
  {name: "shaw", time: clock()},
  {name: "james", time: clock()},
  {name: "jimmy", time: clock()}
]

export const people = (state = defaultPeople, {type, payload}) => {
  switch(type) {
    case 'ADD_PERSON':
      return [
      ...state,
        {name: payload, time: clock()}
    ];

    default:
      return state;
  }
}
