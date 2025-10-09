// src/utils/mockData.js
export const laws = [
  { id: 1, title: 'Right to Information', description: 'Access public information easily.' },
  { id: 2, title: 'Consumer Protection', description: 'Rights to consumers for fair trade.' },
  { id: 3, title: 'Environmental Protection', description: 'Rights to a clean environment.' },
];

export const schemes = [
  { id: 1, title: 'Healthcare Scheme', description: 'Access to basic healthcare facilities.' },
  { id: 2, title: 'Education Scholarship', description: 'Financial support for students.' },
];

export const departments = [
  { id: 1, name: 'Police Department', contact: '1800-123-456', address: 'City HQ' },
  { id: 2, name: 'Consumer Affairs', contact: '1800-789-101', address: 'Sector 5' },
];

export const notifications = [
  { id: 1, message: 'Your complaint #123 has been resolved.' },
  { id: 2, message: 'New law update available: Environmental Protection Act.' },
];

export const complaints = [
  // Using an array of arrays for the Table component format
  ['#123', 'Water Supply Issue', 'Public Services', 'Resolved', '2023-10-01'],
  ['#124', 'Broken Streetlight', 'Public Services', 'In Progress', '2023-10-05'],
];

export const savedLaws = [
    { id: 1, title: 'Right to Information Act, 2005', description: 'An Act to provide for setting out the practical regime of right to information for citizens.'},
    { id: 2, title: 'Food Safety and Standards Act, 2006', description: 'An Act to consolidate the laws relating to food and to establish the Food Safety and Standards Authority of India.'},
];


