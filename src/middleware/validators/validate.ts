import Joi from "@hapi/joi";
import logger from "../../logger";

const members = Joi.object().keys({
  name: Joi.string().required().trim().error(new Error("name is required")),
  position: Joi.string()
    .required()
    .trim()
    .error(new Error("position is required")),
});

const validator = {
  validateBody: (schema) => (req, res, next) => {
    //logger.info("body", req.body);
    const result = schema.validate(req.body);

    if (result.error) {
      return res.status(400).send({
        status: "bad request",
        statusCode: 400,
        message: result.error.message,
      });
    }

    req.body = result.value;
    return next();
  },

  schemas: {
    authSchema: Joi.object().keys({
      firstName: Joi.string()
        .required()
        .trim()
        .lowercase()
        .error(new Error("firstName is required")),
      lastName: Joi.string()
        .required()
        .trim()
        .lowercase()
        .error(new Error("lastName is required")),
      email: Joi.string()
        .email()
        .required()
        .trim()
        .lowercase()
        .error(new Error("A valid email address is required")),
      password: Joi.string()
        .required()
        .error(new Error("Password is required")),
    }),
    authLoginSchema: Joi.object().keys({
      email: Joi.string()
        .required()
        .trim()
        .lowercase()
        .error(new Error("A valid email address is required")),
      password: Joi.string()
        .required()
        .error(new Error("Password is required"))
        .min(6)
        .error(new Error("Password must be a minimum of six characters")),
    }),
    createTodoSchema: Joi.object().keys({
      todoName: Joi.string()
        .required()
        .trim()
        .error(new Error("todoName name is required")),
      description: Joi.string()
        .required()
        .trim()
        .error(new Error("description name is required")),
      priority: Joi.string()
      .required()
        .error(new Error("priority name is required"))
        .valid('high', 'low', 'meduim')
        .error(new Error("Invalid priority"))
        .trim(),
      startTime:  Joi.date()
        .required()
        .error(new Error("startTime  is required"))
        .iso().greater( Date.now()).required()
        .error(new Error("startTime  should be greater than the current time")),
      endTime: Joi.date()
        .required()
        .error(new Error("endTime  is required"))
        .iso().greater(Joi.ref('startTime')).required()
        .error(new Error("endTime  should be greater than startTime")),

    }),
    editTodoSchema: Joi.object().keys({
      todoName: Joi.string()
        .required()
        .trim()
        .error(new Error("todoName name is required")),
      status: Joi.boolean()
        .error(new Error("status shouble be a boolean")),
      description: Joi.string()
        .required()
        .trim()
        .error(new Error("description name is required")),
      priority: Joi.string()
      .required()
        .error(new Error("priority name is required"))
        .valid('high', 'low', 'meduim')
        .error(new Error("Invalid priority"))
        .trim(),
      startTime:  Joi.date()
        .required()
        .error(new Error("startTime  is required"))
        .iso().greater( Date.now()).required()
        .error(new Error("startTime  should be greater than the current time")),
      endTime: Joi.date()
        .required()
        .error(new Error("endTime  is required"))
        .iso().greater(Joi.ref('startTime')).required()
        .error(new Error("endTime  should be greater than startTime")),

    }),

    createFixtureSchema: Joi.object().keys({
      details: Joi.array().required(),
      homeTeam: Joi.array()
        .required()
        .error(new Error("Home team is required")),
      awayTeam: Joi.array()
        .required()
        .error(new Error("Away team is required")),
      status: Joi.string().trim(),
    }),
    updateScoresSchema: Joi.object().keys({
      homeTeamScore: Joi.number()
        .required()
        .error(new Error("Home score is required")),
      awayTeamScore: Joi.number()
        .required()
        .error(new Error("Away score is required")),
    }),
  },
};

export default validator;
