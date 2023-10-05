import { ACCOUNT_STATE_CHANGE } from "../types/account";
import request from "./../../server/index";

const updateStateChange = (data) => ({
  type: ACCOUNT_STATE_CHANGE,
  payload: data,
});

export const getUser = (form) => async (dispatch) => {
  try {
    dispatch(updateStateChange({ loading: true }));
    let { data } = await request.get("auth/me");
    // dispatch({ type: ACCOUNT_STATE_CHANGE, payload: { user: data } });
    dispatch(updateStateChange({ user: data, photo: data.photo }));
    form.setFieldsValue(data);
  } catch (error) {
    // dispatch({ type: ACCOUNT_STATE_CHANGE, payload: { error } });
    dispatch(updateStateChange({ error }));
  } finally {
    dispatch(updateStateChange({ loading: false }));
  }
};

export const saveUser = (form) => async (dispatch) => {
  try {
    dispatch(updateStateChange({ loading: true }));
    let values = await form.validateFields();
    await request.put("auth/details", values);
  } catch (error) {
    dispatch(updateStateChange({ error }));
  } finally {
    dispatch(updateStateChange({ loading: false }));
  }
};

export const uploadUserPhoto = (e) => async (dispatch) => {
  try {
    dispatch(updateStateChange({ uploadLoading: true }));
    let formData = new FormData();
    formData.append("file", e.file.originFileObj);
    let { data } = await request.post("auth/upload", formData);
    dispatch(updateStateChange({ photo: data }));
  } catch (error) {
    dispatch(updateStateChange({ error }));
  } finally {
    dispatch(updateStateChange({ uploadLoading: false }));
  }
};
