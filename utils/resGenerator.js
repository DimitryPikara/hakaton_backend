
const resGenerator = (res, status, send) => {
  if (send != null) res.status(status).send(send);
  else res.sendStatus(status);
};

module.exports = resGenerator;