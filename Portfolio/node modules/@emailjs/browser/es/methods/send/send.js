import { store } from '../../store/store';
import { sendPost } from '../../api/sendPost';
import { buildOptions } from '../../utils/buildOptions/buildOptions';
import { validateParams } from '../../utils/validateParams/validateParams';
import { validateTemplateParams } from '../../utils/validateTemplateParams/validateTemplateParams';
import { isHeadless } from '../../utils/isHeadless/isHeadless';
import { headlessError } from '../../errors/headlessError/headlessError';
import { isBlockedValueInParams } from '../../utils/isBlockedValueInParams/isBlockedValueInParams';
import { blockedEmailError } from '../../errors/blockedEmailError/blockedEmailError';
import { isLimitRateHit } from '../../utils/isLimitRateHit/isLimitRateHit';
import { limitRateError } from '../../errors/limitRateError/limitRateError';
/**
 * Send a template to the specific EmailJS service
 * @param {string} serviceID - the EmailJS service ID
 * @param {string} templateID - the EmailJS template ID
 * @param {object} templateParams - the template params, what will be set to the EmailJS template
 * @param {object} options - the EmailJS SDK config options
 * @returns {Promise<EmailJSResponseStatus>}
 */
export const send = (serviceID, templateID, templateParams, options) => {
    const opts = buildOptions(options);
    const publicKey = opts.publicKey || store.publicKey;
    const blockHeadless = opts.blockHeadless || store.blockHeadless;
    const blockList = { ...store.blockList, ...opts.blockList };
    const limitRate = { ...store.limitRate, ...opts.limitRate };
    if (blockHeadless && isHeadless(navigator)) {
        return Promise.reject(headlessError());
    }
    validateParams(publicKey, serviceID, templateID);
    validateTemplateParams(templateParams);
    if (templateParams && isBlockedValueInParams(blockList, templateParams)) {
        return Promise.reject(blockedEmailError());
    }
    if (isLimitRateHit(localStorage, location.pathname, limitRate)) {
        return Promise.reject(limitRateError());
    }
    const params = {
        lib_version: '4.1.0',
        user_id: publicKey,
        service_id: serviceID,
        template_id: templateID,
        template_params: templateParams,
    };
    return sendPost('/api/v1.0/email/send', JSON.stringify(params), {
        'Content-type': 'application/json',
    });
};
