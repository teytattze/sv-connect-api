const BASE_SERVICE = 'match';

const acceptMatches = {
  service: BASE_SERVICE,
  operationId: 'acceptMatches',
};

const matchSingleStudent = {
  service: BASE_SERVICE,
  operationId: 'matchSingleStudent',
};

const matchSelectedStudents = {
  service: BASE_SERVICE,
  operationId: 'matchSelectedStudents',
};

const matchSelectedStudentsAndSupervisors = {
  service: BASE_SERVICE,
  operationId: 'matchSelectedStudentsAndSupervisors',
};

export const MatchesPattern = {
  ACCEPT_MATCHES: acceptMatches,
  MATCH_SINGLE_STUDENT: matchSingleStudent,
  MATCH_SELECTED_STUDENTS: matchSelectedStudents,
  MATCH_SELECTED_STUDENTS_AND_SUPERVISORS: matchSelectedStudentsAndSupervisors,
};
