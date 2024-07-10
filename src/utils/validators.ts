import { NextFunction, Request, Response } from "express";
import { body, ValidationChain, validationResult } from "express-validator";

export const validate = (validations: ValidationChain[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    for (let validation of validations) {
      const result = await validation.run(req);
      if (!result.isEmpty()) {
        return res.status(400).json({ errors: result.array() });
      }
    }
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    res.status(402).json({ errors: errors.array() });
  };
};


export const loginValidator = [
    body("email").trim().isEmail().withMessage("Email is required"),
    body("password")
      .trim()
      .isLength({ min: 6 })
      .withMessage("Password should be at least 6 characters"),
  ];

export const signupValidator = [
  body("name").notEmpty().withMessage("Name is required"),
  ...loginValidator,
];
