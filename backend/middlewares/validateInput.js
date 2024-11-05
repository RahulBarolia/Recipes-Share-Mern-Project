export const inputValidate = (req, res, next) => {
  let { name, password, email } = req.body;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const nameRegex = /^[A-Za-z]+(?:[-' ][A-Za-z]+)*$/;

  const errors = {};

  if (!name) {
    errors.name = "Name is required";
  } else if (!nameRegex.test(name)) {
    errors.name = "Invalid name format";
  }

  if (!email) {
    errors.email = "Email is required";
  } else if (!emailRegex.test(email)) {
    errors.email = "Invalid email format";
  }

  if (!password) {
    errors.password = "Password is required";
  }

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ success: false, errors });
  }

  next();
};
