module.exports = {
  isValid,
};
function isValid(user) {
  return Boolean(
    user.email
      ? user.username &&
          user.password &&
          user.email &&
          typeof user.password === "string"
      : user.username && user.password && typeof user.password === "string"
  );
}
