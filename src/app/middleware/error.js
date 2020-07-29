export default (req, res, next) => {
  console.log({req, res})
  next()
}