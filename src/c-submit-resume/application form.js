import React, { useState, useEffect } from 'react';
import { Upload, Loader2 } from 'lucide-react';

const ApplicationForm = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [progress, setProgress] = useState(0);
    const [errorMessage, setErrorMessage] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        rollNo: '',
        year: '',
        branch: '',
        email: '',
        phone: '',
        companyApplyingFor: '',
        roleApplyingFor: '',
        resumeLink: ''
    });

    useEffect(() => {
        const filledFields = Object.values(formData).filter(value => value !== '').length;
        setProgress((filledFields / Object.keys(formData).length) * 100);
    }, [formData]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setErrorMessage('');

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));
            console.log('Form submitted:', formData);
            alert('Application submitted successfully!');
            resetForm();
        } catch (error) {
            console.error('Error submitting form:', error);
            setErrorMessage('Error submitting application. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const resetForm = () => {
        setFormData({
            name: '',
            rollNo: '',
            year: '',
            branch: '',
            email: '',
            phone: '',
            companyApplyingFor: '',
            roleApplyingFor: '',
            resumeLink: ''
        });
    };

    return (
        <div className="max-w-3xl mx-auto p-6 pt-4">
            <h1 className="text-2xl font-bold text-gray-300 mb-6">Job Application Form</h1>

            {/* Progress Bar */}
            <div className="w-full bg-gray-700 rounded-full h-2.5 mb-4">
                <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Error Message */}
                {errorMessage && <p className="text-red-500">{errorMessage}</p>}

                {/* Basic Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {['name', 'rollNo', 'year', 'branch', 'email', 'phone'].map((field) => (
                        <div key={field}>
                            <label htmlFor={field} className="block text-sm font-medium text-gray-200 mb-1">
                                {field.replace(/([A-Z])/g, ' $1').trim()}
                            </label>
                            <input
                                id={field}
                                type="text"
                                required
                                className="w-full p-3 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
                                placeholder={`Enter your ${field.replace(/([A-Z])/g, ' $1').trim().toLowerCase()}`}
                                value={formData[field]}
                                onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
                            />
                        </div>
                    ))}
                </div>

                {/* Dropdowns */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="companyApplyingFor" className="block text-sm font-medium text-gray-200 mb-1">
                            Company Applying For
                        </label>
                        <select
                            id="companyApplyingFor"
                            required
                            className="w-full p-3 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={formData.companyApplyingFor}
                            onChange={(e) => setFormData({ ...formData, companyApplyingFor: e.target.value })}
                        >
                            <option value="">Select Company</option>
                            <option value="Google">Google</option>
                            <option value="Microsoft">Microsoft</option>
                            <option value="Amazon">Amazon</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="roleApplyingFor" className="block text-sm font-medium text-gray-200 mb-1">
                            Role Applying For
                        </label>
                        <select
                            id="roleApplyingFor"
                            required
                            className="w-full p-3 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={formData.roleApplyingFor}
                            onChange={(e) => setFormData({ ...formData, roleApplyingFor: e.target.value })}
                        >
                            <option value="">Select Role</option>
                            <option value="Software Engineer">Software Engineer</option>
                            <option value="Data Scientist">Data Scientist</option>
                            <option value="Product Manager">Product Manager</option>
                        </select>
                    </div>
                </div>

                {/* Resume Link */}
                <div>
                    <label htmlFor="resumeLink" className="block text-sm font-medium text-gray-200 mb-1">
                        Resume Link
                    </label>
                    <input
                        id="resumeLink"
                        type="url"
                        required
                        className="w-full p-3 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
                        value={formData.resumeLink}
                        onChange={(e) => setFormData({ ...formData, resumeLink: e.target.value })}
                        placeholder="https://example.com/resume.pdf"
                    />
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-800 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                    {isSubmitting ? (
                        <>
                            <Loader2 className="h-5 w-5 animate-spin" />
                            Submitting...
                        </>
                    ) : (
                        'Submit Application'
                    )}
                </button>
            </form>
        </div>
    );
};

export default ApplicationForm;
