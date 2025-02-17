import React, { useState } from 'react';
import {
    Users, FileText, Search, Download, Building, Filter,
    Eye, CheckCircle, Clock, Download as DownloadIcon,
    ChevronDown, ChevronUp, BookmarkCheck
} from 'lucide-react';

const CompanyDashboard = () => {
    const [expandedRow, setExpandedRow] = useState(null);
    const [filterOpen, setFilterOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('all');
    const [selectedBranch, setSelectedBranch] = useState('all');

    // Sample data
    const stats = {
        totalApplications: 156,
        pendingReviews: 45,
        reviewed: 111,
        topRoles: [
            { role: 'Software Engineer', count: 78 },
            { role: 'Data Scientist', count: 45 },
            { role: 'Product Manager', count: 33 }
        ]
    };

    const submissions = [
        {
            id: 1,
            name: "John Doe",
            rollNo: "2021CS001",
            branch: "Computer Science",
            year: "3rd",
            role: "Software Engineer",
            status: "pending",
            email: "john.doe@example.com",
            phone: "+1234567890",
            skills: ["React", "Node.js", "Python"],
            resumeLink: "#",
            experience: [
                {
                    title: "Summer Intern",
                    company: "Tech Corp",
                    duration: "May 2023 - July 2023"
                }
            ]
        },
        {
            id: 2,
            name: "Jane Smith",
            rollNo: "2021EC015",
            branch: "Electronics",
            year: "4th",
            role: "Data Scientist",
            status: "reviewed",
            email: "jane.smith@example.com",
            phone: "+1234567891",
            skills: ["Python", "ML", "SQL"],
            resumeLink: "#",
            experience: [
                {
                    title: "Research Assistant",
                    company: "University Lab",
                    duration: "Jan 2023 - Present"
                }
            ]
        },
        {
            id: 3,
            name: "Jane Smith",
            rollNo: "2021EC015",
            branch: "Electronics",
            year: "4th",
            role: "Data Scientist",
            status: "reviewed",
            email: "jane.smith@example.com",
            phone: "+1234567891",
            skills: ["Python", "ML", "SQL"],
            resumeLink: "#",
            experience: [
                {
                    title: "Research Assistant",
                    company: "University Lab",
                    duration: "Jan 2023 - Present"
                }
            ]
        },
        {
            id: 4,
            name: "Jane Smith",
            rollNo: "2021EC015",
            branch: "Electronics",
            year: "4th",
            role: "Data Scientist",
            status: "reviewed",
            email: "jane.smith@example.com",
            phone: "+1234567891",
            skills: ["Python", "ML", "SQL"],
            resumeLink: "#",
            experience: [
                {
                    title: "Research Assistant",
                    company: "University Lab",
                    duration: "Jan 2023 - Present"
                }
            ]
        },
        {
            id: 5,
            name: "Jane Smith",
            rollNo: "2021EC015",
            branch: "Electronics",
            year: "4th",
            role: "Data Scientist",
            status: "reviewed",
            email: "jane.smith@example.com",
            phone: "+1234567891",
            skills: ["Python", "ML", "SQL"],
            resumeLink: "#",
            experience: [
                {
                    title: "Research Assistant",
                    company: "University Lab",
                    duration: "Jan 2023 - Present"
                }
            ]
        },
    ];

    return (
        <div className="min-h-screen bg-gray-900 text-white p-6 pt-24">
            {/* Top Navigation */}
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-2xl font-bold">Company Dashboard</h1>
                <div className="flex items-center gap-4">
                    <button className="flex items-center gap-2 px-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-700">
                        <Building className="h-5 w-5" />
                        Company Profile
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700">
                        <Download className="h-5 w-5" />
                        Download All
                    </button>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-gray-800 p-6 rounded-lg">
                    <div className="flex items-center justify-between">
                        <h3 className="text-gray-400">Total Applications</h3>
                        <Users className="h-5 w-5 text-blue-500" />
                    </div>
                    <p className="text-3xl font-bold mt-2">{stats.totalApplications}</p>
                </div>
                <div className="bg-gray-800 p-6 rounded-lg">
                    <div className="flex items-center justify-between">
                        <h3 className="text-gray-400">Pending Reviews</h3>
                        <Clock className="h-5 w-5 text-yellow-500" />
                    </div>
                    <p className="text-3xl font-bold mt-2">{stats.pendingReviews}</p>
                </div>
                <div className="bg-gray-800 p-6 rounded-lg">
                    <div className="flex items-center justify-between">
                        <h3 className="text-gray-400">Reviewed</h3>
                        <CheckCircle className="h-5 w-5 text-green-500" />
                    </div>
                    <p className="text-3xl font-bold mt-2">{stats.reviewed}</p>
                </div>
                <div className="bg-gray-800 p-6 rounded-lg">
                    <div className="flex flex-col">
                        <div className="flex items-center justify-between mb-2">
                            <h3 className="text-gray-400">Top Roles</h3>
                            <FileText className="h-5 w-5 text-purple-500" />
                        </div>
                        {stats.topRoles.map((role, index) => (
                            <div key={index} className="flex justify-between text-sm">
                                <span>{role.role}</span>
                                <span className="text-gray-400">{role.count}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Search and Filters */}
            <div className="bg-gray-800 p-4 rounded-lg mb-6">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search by name, roll number, or role..."
                            className="w-full bg-gray-700 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <button
                        onClick={() => setFilterOpen(!filterOpen)}
                        className="flex items-center gap-2 px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600"
                    >
                        <Filter className="h-5 w-5" />
                        Filters
                    </button>
                </div>

                {filterOpen && (
                    <div className="mt-4 flex gap-4">
                        <select
                            value={selectedStatus}
                            onChange={(e) => setSelectedStatus(e.target.value)}
                            className="bg-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="all">All Status</option>
                            <option value="pending">Pending</option>
                            <option value="reviewed">Reviewed</option>
                        </select>
                        <select
                            value={selectedBranch}
                            onChange={(e) => setSelectedBranch(e.target.value)}
                            className="bg-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="all">All Branches</option>
                            <option value="cs">Computer Science</option>
                            <option value="ec">Electronics</option>
                        </select>
                    </div>
                )}
            </div>

            {/* Submissions Table */}
            <div className="bg-gray-800 rounded-lg overflow-hidden">
                <table className="w-full">
                    <thead>
                        <tr className="bg-gray-700">
                            <th className="px-6 py-3 text-left">Student</th>
                            <th className="px-6 py-3 text-left">Branch & Year</th>
                            <th className="px-6 py-3 text-left">Role</th>
                            <th className="px-6 py-3 text-left">Status</th>
                            <th className="px-6 py-3 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {submissions.map((submission) => (
                            <React.Fragment key={submission.id}>
                                <tr className="border-t border-gray-700 hover:bg-gray-750">
                                    <td className="px-6 py-4">
                                        <div>
                                            <div className="font-medium">{submission.name}</div>
                                            <div className="text-sm text-gray-400">{submission.rollNo}</div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div>
                                            <div>{submission.branch}</div>
                                            <div className="text-sm text-gray-400">{submission.year} Year</div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">{submission.role}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded-full text-xs ${submission.status === 'reviewed'
                                                ? 'bg-green-900 text-green-200'
                                                : 'bg-yellow-900 text-yellow-200'
                                            }`}>
                                            {submission.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => window.open(submission.resumeLink, '_blank')}
                                                className="p-2 hover:bg-gray-700 rounded-lg"
                                            >
                                                <DownloadIcon className="h-5 w-5" />
                                            </button>
                                            <button
                                                onClick={() => setExpandedRow(expandedRow === submission.id ? null : submission.id)}
                                                className="p-2 hover:bg-gray-700 rounded-lg"
                                            >
                                                {expandedRow === submission.id ? (
                                                    <ChevronUp className="h-5 w-5" />
                                                ) : (
                                                    <ChevronDown className="h-5 w-5" />
                                                )}
                                            </button>
                                            {submission.status === 'pending' && (
                                                <button
                                                    className="p-2 hover:bg-gray-700 rounded-lg text-green-500"
                                                >
                                                    <BookmarkCheck className="h-5 w-5" />
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                                {expandedRow === submission.id && (
                                    <tr className="bg-gray-750">
                                        <td colSpan={5} className="px-6 py-4">
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <h4 className="font-medium mb-2">Contact Information</h4>
                                                    <p className="text-gray-400">Email: {submission.email}</p>
                                                    <p className="text-gray-400">Phone: {submission.phone}</p>
                                                </div>
                                                <div>
                                                    <h4 className="font-medium mb-2">Skills</h4>
                                                    <div className="flex flex-wrap gap-2">
                                                        {submission.skills.map((skill, index) => (
                                                            <span
                                                                key={index}
                                                                className="px-2 py-1 bg-blue-900 text-blue-200 rounded-full text-sm"
                                                            >
                                                                {skill}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                                <div className="col-span-2">
                                                    <h4 className="font-medium mb-2">Experience</h4>
                                                    {submission.experience.map((exp, index) => (
                                                        <div key={index} className="mb-2">
                                                            <p className="font-medium">{exp.title}</p>
                                                            <p className="text-gray-400">{exp.company}</p>
                                                            <p className="text-sm text-gray-500">{exp.duration}</p>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CompanyDashboard;