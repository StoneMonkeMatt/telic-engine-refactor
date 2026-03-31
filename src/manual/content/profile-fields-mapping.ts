
/**
 * Mapping of parameter regime profile fields to their families and database labels.
 */
export const PROFILE_FIELDS_MAPPING = [
  { field: "evaluation_profile", family: "Evaluation", db: "evaluation_profile", description: "Interpreted label for alpha, gamma, delta, beta." },
  { field: "relational_profile", family: "Relational Dynamics", db: "relational_profile", description: "Interpreted label for lambda, eta." },
  { field: "search_profile", family: "Search Dynamics", db: "search_profile", description: "Interpreted label for epsilon, temperature, seed." },
  { field: "threshold_profile", family: "Threshold", db: "threshold_profile", description: "Interpreted label for threshold." },
  { field: "constraint_profile", family: "Structural Constraint", db: "constraint_profile", description: "Interpreted label for maxSequenceLength, maxSteps, architectureMode." }
];
