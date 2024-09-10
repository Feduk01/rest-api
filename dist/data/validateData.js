import Joi from 'joi';
const movieNoIdSchema = Joi.object({
    titel: Joi.string().min(1),
    premiärår: Joi.number().integer().min(1900).max(9999).strict(),
    bildlänk: Joi.string().min(1),
}).required();
export function isValidMovieExceptId(data) {
    let result = movieNoIdSchema.validate(data);
    return !result.error;
}
