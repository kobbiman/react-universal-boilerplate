export default function (fn, req, res) {
  const end = res.end

  return new Promise((resolve) => {
    res.end = function () {
      end.apply(this, arguments)
      resolve(false)
    }
    fn(req, res, () => resolve(true))
  })
}
