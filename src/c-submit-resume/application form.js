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
        <div className="max-w-5xl mx-auto p-10 pt-8">
            <h1 className="text-3xl font-bold text-gray-300 mb-8">Job Application Form</h1>

            {/* Progress Bar */}
            <div className="w-full bg-gray-700 rounded-full h-3 mb-6">
                <div className="bg-blue-500 h-3 rounded-full" style={{ width: `${progress}%` }}></div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
                {/* Error Message */}
                {errorMessage && <p className="text-red-500 text-lg font-semibold">{errorMessage}</p>}

                {/* Basic Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {['name', 'rollNo', 'year', 'branch', 'email', 'phone'].map((field) => (
                        <div key={field}>
                            <label htmlFor={field} className="block text-lg font-medium text-gray-200 mb-2">
                                {field.replace(/([A-Z])/g, ' $1').trim()}
                            </label>
                            <input
                                id={field}
                                type="text"
                                required
                                className="w-full p-4 border border-gray-400 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-500 placeholder-gray-400 text-lg"
                                placeholder={`Enter your ${field.replace(/([A-Z])/g, ' $1').trim().toLowerCase()}`}
                                value={formData[field]}
                                onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
                            />
                        </div>
                    ))}
                </div>

                {/* Dropdowns */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="companyApplyingFor" className="block text-lg font-medium text-gray-200 mb-2">
                            Company Applying For
                        </label>
                        <select
                            id="companyApplyingFor"
                            required
                            className="w-full p-4 border border-gray-400 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-500 text-lg"
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
                        <label htmlFor="roleApplyingFor" className="block text-lg font-medium text-gray-200 mb-2">
                            Role Applying For
                        </label>
                        <select
                            id="roleApplyingFor"
                            required
                            className="w-full p-4 border border-gray-400 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-500 text-lg"
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
                    <label htmlFor="resumeLink" className="block text-lg font-medium text-gray-200 mb-2">
                        Resume Link
                    </label>
                    <input
                        id="resumeLink"
                        type="url"
                        required
                        className="w-full p-4 border border-gray-400 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-500 placeholder-gray-400 text-lg"
                        value={formData.resumeLink}
                        onChange={(e) => setFormData({ ...formData, resumeLink: e.target.value })}
                        placeholder="https://example.com/resume.pdf"
                    />
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-blue-600 text-white py-3 px-5 text-lg rounded-lg hover:bg-blue-800 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                >
                    {isSubmitting ? (
                        <>
                            <Loader2 className="h-6 w-6 animate-spin" />
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
