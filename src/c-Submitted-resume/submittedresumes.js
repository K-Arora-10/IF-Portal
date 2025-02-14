import React, { useState } from 'react';
import { Download, ExternalLink, X, Bookmark, BookmarkCheck } from 'lucide-react';

const ResumeGrid = () => {
    const [selectedResume, setSelectedResume] = useState(null);
    const [bookmarked, setBookmarked] = useState([]);

    // Sample data - replace with your actual data
    const resumes = [
        {
            id: 1,
            name: "Sarah Johnson",
            role: "Senior Frontend Developer",
            education: "MS Computer Science, Stanford University",
            skills: ["React", "TypeScript", "Node.js", "AWS"],
            experience: "8 years",
            pdfUrl: "#",
            fullDetails: {
                experience: [
                    {
                        company: "Tech Corp",
                        role: "Senior Developer",
                        duration: "2020-Present"
                    },
                    {
                        company: "StartupCo",
                        role: "Frontend Developer",
                        duration: "2018-2020"
                    }
                ],
                fullEducation: [
                    {
                        degree: "MS Computer Science",
                        school: "Stanford University",
                        year: "2018"
                    },
                    {
                        degree: "BS Computer Science",
                        school: "UC Berkeley",
                        year: "2016"
                    }
                ]
            }
        },
        {
            id: 2,
            name: "Michael Chen",
            role: "Backend Engineer",
            education: "BS Computer Engineering, MIT",
            skills: ["Python", "Django", "PostgreSQL", "Docker"],
            experience: "5 years",
            pdfUrl: "#",
            fullDetails: {
                experience: [
                    {
                        company: "Data Systems Inc",
                        role: "Backend Engineer",
                        duration: "2021-Present"
                    }
                ],
                fullEducation: [
                    {
                        degree: "BS Computer Engineering",
                        school: "MIT",
                        year: "2019"
                    }
                ]
            }
        }
    ];

    const toggleBookmark = (id) => {
        setBookmarked(prev =>
            prev.includes(id)
                ? prev.filter(itemId => itemId !== id)
                : [...prev, id]
        );
    };

    return (
        <div className="p-6 max-w-7xl mx-auto">
            {/* Grid View */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-24">
                {resumes.map((resume) => (
                    <div key={resume.id} className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
                        <div className="flex justify-between items-start">
                            <div>
                                <h2 className="text-xl font-bold text-gray-800">{resume.name}</h2>
                                <p className="text-gray-600 mt-1">{resume.role}</p>
                            </div>
                            <button
                                onClick={() => toggleBookmark(resume.id)}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                {bookmarked.includes(resume.id) ? (
                                    <BookmarkCheck className="h-5 w-5" />
                                ) : (
                                    <Bookmark className="h-5 w-5" />
                                )}
                            </button>
                        </div>

                        <div className="mt-4">
                            <p className="text-sm text-gray-600">{resume.education}</p>
                            <p className="text-sm text-gray-600 mt-1">{resume.experience} experience</p>
                        </div>

                        <div className="mt-4 flex flex-wrap gap-2">
                            {resume.skills.map((skill, index) => (
                                <span
                                    key={index}
                                    className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>

                        <div className="mt-6 flex gap-4">
                            <button
                                onClick={() => window.open(resume.pdfUrl, '_blank')}
                                className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md text-sm"
                            >
                                <Download className="h-4 w-4" />
                                Download
                            </button>
                            <button
                                onClick={() => setSelectedResume(resume)}
                                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm"
                            >
                                <ExternalLink className="h-4 w-4" />
                                More Info
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal for detailed view */}
            {selectedResume && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 pt-36">
                    <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-hidden">
                        <div className="p-6 overflow-y-auto max-h-[85vh]">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-800">{selectedResume.name}</h2>
                                    <p className="text-gray-600 mt-1">{selectedResume.role}</p>
                                </div>
                                <button
                                    onClick={() => setSelectedResume(null)}
                                    className="text-gray-400 hover:text-gray-600"
                                >
                                    <X className="h-6 w-6" />
                                </button>
                            </div>

                            <div className="mt-6">
                                <h3 className="text-lg font-semibold mb-2">Experience</h3>
                                {selectedResume.fullDetails.experience.map((exp, index) => (
                                    <div key={index} className="mb-4">
                                        <p className="font-medium">{exp.company}</p>
                                        <p className="text-gray-600">{exp.role}</p>
                                        <p className="text-sm text-gray-500">{exp.duration}</p>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-6">
                                <h3 className="text-lg font-semibold mb-2">Education</h3>
                                {selectedResume.fullDetails.fullEducation.map((edu, index) => (
                                    <div key={index} className="mb-4">
                                        <p className="font-medium">{edu.degree}</p>
                                        <p className="text-gray-600">{edu.school}</p>
                                        <p className="text-sm text-gray-500">{edu.year}</p>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-6">
                                <h3 className="text-lg font-semibold mb-2">Skills</h3>
                                <div className="flex flex-wrap gap-2">
                                    {selectedResume.skills.map((skill, index) => (
                                        <span
                                            key={index}
                                            className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="mt-6 pt-6 border-t">
                                <button
                                    onClick={() => window.open(selectedResume.pdfUrl, '_blank')}
                                    className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
                                >
                                    <Download className="h-4 w-4" />
                                    Download Resume
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default ResumeGrid;