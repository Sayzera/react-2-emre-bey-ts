import { useReducer } from "react";

type State = {
  count: number;
  name?: string;
  personals?: string[];
};

type Action = {
  type: "increment" | "decrement" | "say_hello" | "personel_delete";
  payload: {
    name?: string;
    personel?: string;
    
  };
};

function reducer(state: State, action: Action) {
  switch (action.type) {
    case "increment": {
      return {
        ...state,
        count: state.count + 1,
      };
    }
    case "say_hello":
      return {
        name: action.payload.name,
        count: 0,
      };
    case "personel_delete": {
      const deletedUser = action.payload.personel; // Osman

      if (
        Array.isArray(state.personals) &&
        state.personals.length > 0 &&
        deletedUser
      ) {
        return {
          ...state,
          personals: state.personals.filter(
            (personel) => personel != deletedUser
          ),
        };
      }

      return state;
    }
    default:
      return state;
  }
}

const initialState = {
  count: 0,
  name: "Emre",
  personals: ["Ali", "Veli", "Osman"],
} as State;

function ReducerHook() {
  const [state, dispatch] = useReducer(reducer, initialState);

  console.log(state, "state");

  return (
    <div>
      <button
        onClick={() => {
          dispatch({
            type: "increment",
            payload: {},
          });
        }}
      >
        Arttır
      </button>

      <button
        onClick={() => {
          dispatch({
            type: "say_hello",
            payload: {
              name: "Sezer",
            },
          });
        }}
      >
        Say Hello {state.name}
      </button>

      <br />

      <button
        onClick={() => {
          dispatch({
            type: "personel_delete",
            payload: {
              personel: "Osman",
            },
          });
        }}
      >
        Personel sil
      </button>

      {state.count}
    </div>
  );
}

export default ReducerHook;
