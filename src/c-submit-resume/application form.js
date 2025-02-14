import React, { useState } from 'react';
import { Plus, Minus, Upload, Loader2 } from 'lucide-react';

const ApplicationForm = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        role: '',
        email: '',
        phone: '',
        experience: '',
        skills: [''],
        education: [{
            degree: '',
            school: '',
            year: ''
        }],
        workHistory: [{
            company: '',
            role: '',
            duration: ''
        }],
        resumeFile: null
    });

    const handleSkillChange = (index, value) => {
        const newSkills = [...formData.skills];
        newSkills[index] = value;
        setFormData({ ...formData, skills: newSkills });
    };

    const addSkill = () => {
        setFormData({ ...formData, skills: [...formData.skills, ''] });
    };

    const removeSkill = (index) => {
        const newSkills = formData.skills.filter((_, i) => i !== index);
        setFormData({ ...formData, skills: newSkills });
    };

    const handleEducationChange = (index, field, value) => {
        const newEducation = [...formData.education];
        newEducation[index] = { ...newEducation[index], [field]: value };
        setFormData({ ...formData, education: newEducation });
    };

    const addEducation = () => {
        setFormData({
            ...formData,
            education: [...formData.education, { degree: '', school: '', year: '' }]
        });
    };

    const removeEducation = (index) => {
        const newEducation = formData.education.filter((_, i) => i !== index);
        setFormData({ ...formData, education: newEducation });
    };

    const handleWorkHistoryChange = (index, field, value) => {
        const newWorkHistory = [...formData.workHistory];
        newWorkHistory[index] = { ...newWorkHistory[index], [field]: value };
        setFormData({ ...formData, workHistory: newWorkHistory });
    };

    const addWorkHistory = () => {
        setFormData({
            ...formData,
            workHistory: [...formData.workHistory, { company: '', role: '', duration: '' }]
        });
    };

    const removeWorkHistory = (index) => {
        const newWorkHistory = formData.workHistory.filter((_, i) => i !== index);
        setFormData({ ...formData, workHistory: newWorkHistory });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API call
        try {
            await new Promise(resolve => setTimeout(resolve, 2000));
            console.log('Form submitted:', formData);
            alert('Application submitted successfully!');
            // Reset form or redirect
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('Error submitting application. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-6 pt-4">
            {/* <h1 className="text-2xl font-bold text-gray-300 mb-6">Job Application Form</h1> */}

            <form onSubmit={handleSubmit} className="space-y-8">
                {/* Basic Information */}
                <div className="space-y-4">
                    <h2 className="text-xl font-semibold text-gray-200">Personal Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-200 mb-1">Full Name</label>
                            <input
                                type="text"
                                required
                                className="w-full p-2 border rounded-md"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-200 mb-1">Email</label>
                            <input
                                type="email"
                                required
                                className="w-full p-2 border rounded-md"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-200 mb-1">Phone</label>
                            <input
                                type="tel"
                                required
                                className="w-full p-2 border rounded-md"
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-200 mb-1">Role Applied For</label>
                            <input
                                type="text"
                                required
                                className="w-full p-2 border rounded-md"
                                value={formData.role}
                                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                            />
                        </div>


                    </div>
                </div>

                {/* Skills */}
                <div className="space-y-4">
                    <h2 className="text-xl font-semibold text-gray-200">Skills</h2>
                    {formData.skills.map((skill, index) => (
                        <div key={index} className="flex gap-2">
                            <input
                                type="text"
                                required
                                className="flex-1 p-2 border rounded-md"
                                value={skill}
                                onChange={(e) => handleSkillChange(index, e.target.value)}
                                placeholder="e.g., React, Python, Project Management"
                            />
                            <button
                                type="button"
                                onClick={() => removeSkill(index)}
                                className="p-2 text-red-500 hover:text-red-700"
                            >
                                <Minus className="h-5 w-5" />
                            </button>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={addSkill}
                        className="flex items-center gap-2 text-blue-200 hover:text-blue-800"
                    >
                        <Plus className="h-5 w-5" />
                        Add Skill
                    </button>
                </div>

                {/* Education */}
                <div className="space-y-4">
                    <h2 className="text-xl font-semibold text-gray-200">Education</h2>
                    {formData.education.map((edu, index) => (
                        <div key={index} className="p-4  rounded-md space-y-4">
                            <div className="flex justify-between items-start">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-200 mb-1">Degree</label>
                                        <input
                                            type="text"
                                            required
                                            className="w-full p-2 border rounded-md"
                                            value={edu.degree}
                                            onChange={(e) => handleEducationChange(index, 'degree', e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-200 mb-1">School</label>
                                        <input
                                            type="text"
                                            required
                                            className="w-full p-2 border rounded-md"
                                            value={edu.school}
                                            onChange={(e) => handleEducationChange(index, 'school', e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-200 mb-1">Year</label>
                                        <input
                                            type="text"
                                            required
                                            className="w-full p-2 border rounded-md"
                                            value={edu.year}
                                            onChange={(e) => handleEducationChange(index, 'year', e.target.value)}
                                        />
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => removeEducation(index)}
                                    className="p-2 text-red-500 hover:text-red-700 ml-2"
                                >
                                    <Minus className="h-5 w-5" />
                                </button>
                            </div>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={addEducation}
                        className="flex items-center gap-2 text-blue-200 hover:text-blue-800"
                    >
                        <Plus className="h-5 w-5" />
                        Add Education
                    </button>
                </div>

                {/* Work History */}
                <div className="space-y-4">
                    <h2 className="text-xl font-semibold text-gray-200">Work History</h2>
                    {formData.workHistory.map((work, index) => (
                        // i can add border by adding word borer in the below className
                        <div key={index} className="p-4 rounded-md space-y-4">
                            <div className="flex justify-between items-start">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-200 mb-1">Company</label>
                                        <input
                                            type="text"
                                            required
                                            className="w-full p-2 border rounded-md"
                                            value={work.company}
                                            onChange={(e) => handleWorkHistoryChange(index, 'company', e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-200 mb-1">Role</label>
                                        <input
                                            type="text"
                                            required
                                            className="w-full p-2 border rounded-md"
                                            value={work.role}
                                            onChange={(e) => handleWorkHistoryChange(index, 'role', e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-200 mb-1">Duration</label>
                                        <input
                                            type="text"
                                            required
                                            className="w-full p-2 border rounded-md"
                                            value={work.duration}
                                            onChange={(e) => handleWorkHistoryChange(index, 'duration', e.target.value)}
                                            placeholder="e.g., 2020-Present"
                                        />
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => removeWorkHistory(index)}
                                    className="p-2 text-red-500 hover:text-red-200 ml-2"
                                >
                                    <Minus className="h-5 w-5" />
                                </button>
                            </div>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={addWorkHistory}
                        className="flex items-center gap-2 text-blue-200 hover:text-blue-800"
                    >
                        <Plus className="h-5 w-5" />
                        Add Work History
                    </button>
                </div>

                {/* Resume Upload */}
                <div className="space-y-4">
                    <h2 className="text-xl font-semibold text-gray-200">Resume Upload</h2>
                    <div className="border-2 border-dashed rounded-md p-6">
                        <div className="flex flex-col items-center">
                            <Upload className="h-12 w-12 text-gray-100" />
                            <p className="mt-2 text-sm text-gray-100">Upload your resume (PDF format)</p>
                            <input
                                type="file"
                                accept=".pdf"
                                required
                                className="mt-4"
                                onChange={(e) => setFormData({ ...formData, resumeFile: e.target.files[0] })}
                            />
                        </div>
                    </div>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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