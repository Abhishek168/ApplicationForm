import { ApplicationForm } from '../../models';
import { successResponse, errorResponse } from '../../helpers';

export const createApplicationForms = async (req, res) => {
    try {
        const {
            universityName, educationDetail, companyName, language
        } = req.body;
        const payload = {
            universityName,
            companyName,
            language,
            educationDetail,
        };
        const applicationFormData = await ApplicationForm.create(payload);
        return successResponse(req, res, { applicationFormData });
    } catch (error) {
        return errorResponse(req, res, error.message);
    }
};

export const listApplicationDetails = async (req, res) => {
    try {
        const applicationFormData = await ApplicationForm.findAll();
        return successResponse(req, res, { applicationFormData });
    } catch (error) {
        return errorResponse(req, res, error.message);
    }
};
export const updateApplicationDetails = async (req, res) => {
    try {
        const {
            universityName, educationDetail, companyName, language
        } = req.body;
        const payload = {
            universityName,
            companyName,
            language,
            educationDetail,
        };
        const updateApplicationFormData = await ApplicationForm.updateOne(
            { title: 'a very different title now' },
            { where: { _id: 1 } }
        );

        console.log("===> :: applicationFormData", updateApplicationFormData);
        return successResponse(req, res, { updateApplicationFormData });
    } catch (error) {
        return errorResponse(req, res, error.message);
    }
};

export const deleteApplicationForms = async (req, res) => {
    try {
        console.log("Delete Application with given OD");
        
        return successResponse(req, res, { updateApplicationFormData });
    } catch (error) {
        return errorResponse(req, res, error.message);
    }
};