export const success = (res, data, status = 200) => {
  // console.log(data);
  return res.status(status).json({ success: true, data });
};

export const error = (res, data, status = 400) => {
  return res.status(status).json({ success: false, ...data });
};
