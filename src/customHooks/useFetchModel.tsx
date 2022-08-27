import { useReducer, useCallback, Dispatch } from "react";
import { fetchWithToken } from "helpers/fetch";
import { Methods } from "types/types";

enum ActionTypes {
  REQUEST,
  SUCCESS,
  ERROR
}

type Action =
  | { type: ActionTypes.REQUEST }
  | { type: ActionTypes.SUCCESS; result: object }
  | { type: ActionTypes.ERROR; error: object | string };

type State = {
  loading: boolean;
  result?: any;
  error?: object | string | null;
};

interface Props {
  model: string;
  method?: Methods;
  body?: any;
  modelId?: string;
  customUrl?: string;
  include?: string;
  fields?: string;
  filter?: string;
}

export type FetchFunctionType = (props: Props) => Promise<void> | any;

interface FetchModelProps extends Props {
  dispatch: Dispatch<Action>;
}

const defaultInitialValues = {
  loading: false,
  result: null,
  error: null
};

const modelReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ActionTypes.REQUEST:
      return {
        loading: true
      };
    case ActionTypes.SUCCESS:
      return {
        loading: false,
        result: action.result
      };
    case ActionTypes.ERROR:
      return {
        loading: false,
        result: null,
        error: action.error
      };
    default:
      return state;
  }
};

const getEndpoint = ({
  model,
  modelId,
  customUrl,
  include,
  fields,
  filter
}: Props) => {
  let endpoint = model;
  if (modelId) {
    endpoint += `/${modelId}`;
  }
  return endpoint;
};

const fetchModel = async ({
  dispatch,
  method,
  body,
  model,
  modelId,
  customUrl,
  include,
  fields,
  filter
}: FetchModelProps) => {
  const endpoint = getEndpoint({
    model,
    modelId,
    customUrl,
    include,
    fields,
    filter
  });
  dispatch({ type: ActionTypes.REQUEST });
  try {
    const resp = await fetchWithToken({ endpoint, body, method });
    const { error, ...result } = await resp.json();

    if (!error) {
      dispatch({
        type: ActionTypes.SUCCESS,
        result
      });
    } else {
      dispatch({
        type: ActionTypes.ERROR,
        error: error || "There was an error"
      });
    }
  } catch {
    dispatch({
      type: ActionTypes.ERROR,
      error: "There was an error"
    });
  }
};

const useFetchModel = (initialValues?: State): [State, FetchFunctionType] => {
  const [state, dispatch] = useReducer(
    modelReducer,
    initialValues ?? defaultInitialValues
  );
  const fetch = useCallback(
    async ({
      method,
      model,
      modelId,
      body,
      customUrl,
      include,
      fields,
      filter
    }: Props) => {
      return await fetchModel({
        dispatch,
        method,
        model,
        modelId,
        body,
        customUrl,
        include,
        fields,
        filter
      });
    },
    []
  );

  return [state, fetch];
};

/* const useFetchModel = ({
  method,
  model,
  modelId,
  body,
  customUrl,
  include,
  fields,
  filter
}: Props): [State, () => any] => {
  const [state, dispatch] = useReducer(modelReducer, initialValues);
  const fetch = useCallback(async () => {
    return await fetchModel({
      dispatch,
      method,
      model,
      modelId,
      body,
      customUrl,
      include,
      fields,
      filter
    });
  }, [method, model, modelId, body, customUrl, include, fields, filter]);

  return [state, fetch];
}; */

export default useFetchModel;
