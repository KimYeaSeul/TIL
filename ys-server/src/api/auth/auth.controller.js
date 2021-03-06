const Joi = require('joi');
const Account = require('models/Account');

exports.localRegister = async (ctx) => {

    const schema = Joi.object().keys({
        username: Joi.string().alphanum().min(4).max(15).required(),
        email: Joi.string().email().required(),
        password: Joi.string().required().min(6)
    });

    const result = schema.validate(ctx.request.body);

    if(result.error) {
        ctx.status = 400;
        return;
    }

    // 아이디, 이메일 중복처리 구현
    let account = null;
    try {
        account = await Account.localRegister(ctx.request.body);
    } catch (e) {
        ctx.throw(500, e);
    }

    ctx.body = account.profile;
};

exports.localLogin = async(ctx) => {
    ctx.body = 'login';
};

exports.exists = async (ctx) => {
    ctx.body = 'exists';
};

exports.logout = async (ctx) => {
    ctx.body = 'logout';
}
