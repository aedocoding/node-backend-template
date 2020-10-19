module.exports = {
  isValid,
};
function isValid(user) {
  return Boolean(
    user.email
      ? user.username &&
          user.password &&
          user.email &&
          typeof user.username === "string" &&
          typeof user.password === "string" &&
          typeof user.email === "string"
      : user.username &&
          user.password &&
          typeof user.username === "string" &&
          typeof user.password === "string"
  );
}
