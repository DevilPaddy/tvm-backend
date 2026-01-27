import formidable from "formidable";

export const formidableMiddleware = (req, res, next) => {
  const form = formidable({ multiples: false });

  form.parse(req, (err, fields, files) => {
    if (err) return next(err);
    req.fields = fields;
    req.files = files;
    next();
  });
};
