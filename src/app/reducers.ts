//name of the reducer, initializing state, and action types + payload with initialized values to not get an error
export const clock = (state = new Date(), {type, payload} = {type: "", payload: 0}) => {
  //set date so we can manipulate it
  const date = new Date(state.getTime())
  //switch uses different pre-defined actions for different types
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

//starting array with default values
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

    case 'UPDATE_PERSON':
      return state.map(person => {
        if(payload === person) {
          return {
            ...person,
            time: clock(person.time, {type: 'HOUR', payload: 5})
          };
        }
        return {...person};
      });

    case 'RECALL_PEOPLE':
      return state.map((person) => ({
        ...person,
        time: payload
      }))
    //always default to return state for unknown actions
    default:
      return state;
  }
}
