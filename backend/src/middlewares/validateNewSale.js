module.exports = (req, res, next) => {
    if ((req.body).some((e) => !e.productId)) {
      return res.status(400).json({ message: '"productId" is required' });
    }
    
    if ((req.body).some((e) => e.quantity <= 0)) {
      return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
    }
  
    if ((req.body).some((e) => !e.quantity)) {
      return res.status(400).json({ message: '"quantity" is required' });
    }
  
  return next();
};