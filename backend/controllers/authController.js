import jwt from 'jsonwebtoken';

export const adminLogin = (req, res) => {
  const { username, password } = req.body;

  if (username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD) {
    const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '1d' });
    return res.status(200).json({ success: true, token, message: 'Login kamyab raha!' });
  }

  res.status(401).json({ success: false, message: 'Invalid Username or  Password!' });
};