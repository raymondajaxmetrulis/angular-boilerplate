export class User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  businessUnit: 'scac';
  jobTitle: string;
  organization: string;
  contact: string;
  isActive: boolean;
  createdBy: string;
  updatedBy: string;
  createdDateTime: Date;
  updatedDateTime: Date;
  roles: string[];
  isParticipant: boolean;
  requestorID: string;
}
