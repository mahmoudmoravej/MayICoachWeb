import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Individual = {
  __typename?: 'Individual';
  fullname?: Maybe<Scalars['String']['output']>;
  handleGithub?: Maybe<Scalars['String']['output']>;
  handleGoogle?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  isActive: Scalars['Boolean']['output'];
  isManager: Scalars['Boolean']['output'];
  jobLevelId?: Maybe<Scalars['String']['output']>;
  jobTitle?: Maybe<Scalars['String']['output']>;
  manager?: Maybe<Individual>;
  managerId?: Maybe<Scalars['Int']['output']>;
  organizationId: Scalars['Int']['output'];
  reports: IndividualConnection;
  userId?: Maybe<Scalars['Int']['output']>;
};


export type IndividualReportsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};

/** The connection type for Individual. */
export type IndividualConnection = {
  __typename?: 'IndividualConnection';
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<IndividualEdge>>>;
  /** A list of nodes. */
  nodes?: Maybe<Array<Maybe<Individual>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

export type IndividualCreate = {
  fullname?: InputMaybe<Scalars['String']['input']>;
  handleGithub?: InputMaybe<Scalars['String']['input']>;
  handleGoogle?: InputMaybe<Scalars['String']['input']>;
  isActive: Scalars['Boolean']['input'];
  isManager: Scalars['Boolean']['input'];
  jobLevelId?: InputMaybe<Scalars['String']['input']>;
  jobTitle?: InputMaybe<Scalars['String']['input']>;
  managerId?: InputMaybe<Scalars['Int']['input']>;
  organizationId?: InputMaybe<Scalars['Int']['input']>;
  userId?: InputMaybe<Scalars['Int']['input']>;
};

/** Autogenerated input type of IndividualCreate */
export type IndividualCreateInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  individualInput: IndividualCreate;
};

/** Autogenerated return type of IndividualCreate. */
export type IndividualCreatePayload = {
  __typename?: 'IndividualCreatePayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  individual: Individual;
};

/** Autogenerated input type of IndividualDestroy */
export type IndividualDestroyInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
};

/** Autogenerated return type of IndividualDestroy. */
export type IndividualDestroyPayload = {
  __typename?: 'IndividualDestroyPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  individual: Individual;
};

/** An edge in a connection. */
export type IndividualEdge = {
  __typename?: 'IndividualEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node?: Maybe<Individual>;
};

export type IndividualUpdate = {
  fullname?: InputMaybe<Scalars['String']['input']>;
  handleGithub?: InputMaybe<Scalars['String']['input']>;
  handleGoogle?: InputMaybe<Scalars['String']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  isManager?: InputMaybe<Scalars['Boolean']['input']>;
  jobLevelId?: InputMaybe<Scalars['String']['input']>;
  jobTitle?: InputMaybe<Scalars['String']['input']>;
  managerId?: InputMaybe<Scalars['Int']['input']>;
  organizationId?: InputMaybe<Scalars['Int']['input']>;
  userId?: InputMaybe<Scalars['Int']['input']>;
};

/** Autogenerated input type of IndividualUpdate */
export type IndividualUpdateInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  individualInput: IndividualUpdate;
};

/** Autogenerated return type of IndividualUpdate. */
export type IndividualUpdatePayload = {
  __typename?: 'IndividualUpdatePayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  individual: Individual;
};

export type Manager = {
  __typename?: 'Manager';
  Id: Scalars['Int']['output'];
  Name: Scalars['String']['output'];
  Reports: ReportConnection;
};


export type ManagerReportsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};

/** The connection type for Manager. */
export type ManagerConnection = {
  __typename?: 'ManagerConnection';
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<ManagerEdge>>>;
  /** A list of nodes. */
  nodes?: Maybe<Array<Maybe<Manager>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** Autogenerated input type of ManagerCreate */
export type ManagerCreateInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  managerInput: ManagerInput;
};

/** Autogenerated return type of ManagerCreate. */
export type ManagerCreatePayload = {
  __typename?: 'ManagerCreatePayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  manager: Manager;
};

/** An edge in a connection. */
export type ManagerEdge = {
  __typename?: 'ManagerEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node?: Maybe<Manager>;
};

export type ManagerInput = {
  Id: Scalars['Int']['input'];
  Name: Scalars['String']['input'];
};

/** Autogenerated input type of ManagerUpdate */
export type ManagerUpdateInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  managerInput: ManagerInput;
};

/** Autogenerated return type of ManagerUpdate. */
export type ManagerUpdatePayload = {
  __typename?: 'ManagerUpdatePayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  manager: Manager;
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Creates a new individual */
  individualCreate?: Maybe<IndividualCreatePayload>;
  /** remove an existing individual by id */
  individualDestroy?: Maybe<IndividualDestroyPayload>;
  /** Update an existing individual by id */
  individualUpdate?: Maybe<IndividualUpdatePayload>;
  /** Creates a new manager */
  managerCreate?: Maybe<ManagerCreatePayload>;
  /** Updates a manager by id */
  managerUpdate?: Maybe<ManagerUpdatePayload>;
  /** Creates a new report */
  reportCreate?: Maybe<ReportCreatePayload>;
  /** Updates a report by id */
  reportUpdate?: Maybe<ReportUpdatePayload>;
};


export type MutationIndividualCreateArgs = {
  input: IndividualCreateInput;
};


export type MutationIndividualDestroyArgs = {
  input: IndividualDestroyInput;
};


export type MutationIndividualUpdateArgs = {
  input: IndividualUpdateInput;
};


export type MutationManagerCreateArgs = {
  input: ManagerCreateInput;
};


export type MutationManagerUpdateArgs = {
  input: ManagerUpdateInput;
};


export type MutationReportCreateArgs = {
  input: ReportCreateInput;
};


export type MutationReportUpdateArgs = {
  input: ReportUpdateInput;
};

/** Fields to order by and the sort direction */
export type Order = {
  direction: Scalars['String']['input'];
  field: Scalars['String']['input'];
};

/** Information about pagination in a connection. */
export type PageInfo = {
  __typename?: 'PageInfo';
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars['String']['output']>;
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars['Boolean']['output'];
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars['Boolean']['output'];
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars['String']['output']>;
};

export enum PerformanceCategory {
  HighPositive = 'HIGH_POSITIVE',
  New = 'NEW',
  OffTrack = 'OFF_TRACK',
  Positive = 'POSITIVE',
  UsuallyMeets = 'USUALLY_MEETS'
}

export type Query = {
  __typename?: 'Query';
  /** Returns an individual */
  individual: Individual;
  /** Returns a list of individuals */
  individuals: IndividualConnection;
  /** Returns a manager */
  manager: Manager;
  /** Returns a list of managers */
  managers: ManagerConnection;
  /** Returns logged in user details */
  myInfo: UserInfo;
  /** Returns a report */
  report: Report;
  /** Returns a list of reports */
  reports: ReportConnection;
};


export type QueryIndividualArgs = {
  id: Scalars['ID']['input'];
};


export type QueryIndividualsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  managerId?: InputMaybe<Scalars['ID']['input']>;
  orderBy?: InputMaybe<Array<Order>>;
};


export type QueryManagerArgs = {
  id: Scalars['ID']['input'];
};


export type QueryManagersArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<Order>>;
};


export type QueryReportArgs = {
  id: Scalars['ID']['input'];
};


export type QueryReportsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};

export type Report = {
  __typename?: 'Report';
  Id: Scalars['Int']['output'];
  Manager: Manager;
  ManagerId: Scalars['Int']['output'];
  Name: Scalars['String']['output'];
  Performance: PerformanceCategory;
};

/** The connection type for Report. */
export type ReportConnection = {
  __typename?: 'ReportConnection';
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<ReportEdge>>>;
  /** A list of nodes. */
  nodes?: Maybe<Array<Maybe<Report>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** Autogenerated input type of ReportCreate */
export type ReportCreateInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  reportInput: ReportInput;
};

/** Autogenerated return type of ReportCreate. */
export type ReportCreatePayload = {
  __typename?: 'ReportCreatePayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  report: Report;
};

/** An edge in a connection. */
export type ReportEdge = {
  __typename?: 'ReportEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node?: Maybe<Report>;
};

export type ReportInput = {
  Id: Scalars['Int']['input'];
  ManagerId: Scalars['Int']['input'];
  Name: Scalars['String']['input'];
  Performance: PerformanceCategory;
};

/** Autogenerated input type of ReportUpdate */
export type ReportUpdateInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  reportInput: ReportInput;
};

/** Autogenerated return type of ReportUpdate. */
export type ReportUpdatePayload = {
  __typename?: 'ReportUpdatePayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  report: Report;
};

export type UserInfo = {
  __typename?: 'UserInfo';
  Individual?: Maybe<Individual>;
  UserId: Scalars['Int']['output'];
};

export type FindIndividualQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type FindIndividualQuery = { __typename?: 'Query', individual: { __typename?: 'Individual', id: number, fullname?: string | null, handleGithub?: string | null, handleGoogle?: string | null, jobTitle?: string | null, jobLevelId?: string | null, userId?: number | null, managerId?: number | null } };

export type UpdateIndividualMutationVariables = Exact<{
  input: IndividualUpdateInput;
}>;


export type UpdateIndividualMutation = { __typename?: 'Mutation', individualUpdate?: { __typename?: 'IndividualUpdatePayload', individual: { __typename?: 'Individual', fullname?: string | null, id: number, jobTitle?: string | null, jobLevelId?: string | null, handleGithub?: string | null, handleGoogle?: string | null, userId?: number | null } } | null };

export type IndividualsQueryVariables = Exact<{
  managerId?: InputMaybe<Scalars['ID']['input']>;
  fetchManagerId: Scalars['ID']['input'];
  fetchManagerDetails?: InputMaybe<Scalars['Boolean']['input']>;
}>;


export type IndividualsQuery = { __typename?: 'Query', individuals: { __typename?: 'IndividualConnection', nodes?: Array<{ __typename?: 'Individual', id: number, fullname?: string | null, jobTitle?: string | null, jobLevelId?: string | null, isManager: boolean } | null> | null }, managerInfo: { __typename?: 'Individual', id: number, fullname?: string | null, jobTitle?: string | null } };

export type CreateManagerMutationVariables = Exact<{
  name: Scalars['String']['input'];
  id: Scalars['Int']['input'];
}>;


export type CreateManagerMutation = { __typename?: 'Mutation', managerCreate?: { __typename?: 'ManagerCreatePayload', manager: { __typename?: 'Manager', Name: string, Id: number } } | null };

export type GetLoggedInUserInfoQueryVariables = Exact<{ [key: string]: never; }>;


export type GetLoggedInUserInfoQuery = { __typename?: 'Query', myInfo: { __typename?: 'UserInfo', UserId: number, Individual?: { __typename?: 'Individual', id: number, isManager: boolean } | null } };


export const FindIndividualDocument = gql`
    query findIndividual($id: ID!) {
  individual(id: $id) {
    id
    fullname
    handleGithub
    handleGoogle
    jobTitle
    jobLevelId
    userId
    managerId
  }
}
    `;

/**
 * __useFindIndividualQuery__
 *
 * To run a query within a React component, call `useFindIndividualQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindIndividualQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindIndividualQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useFindIndividualQuery(baseOptions: Apollo.QueryHookOptions<FindIndividualQuery, FindIndividualQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindIndividualQuery, FindIndividualQueryVariables>(FindIndividualDocument, options);
      }
export function useFindIndividualLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindIndividualQuery, FindIndividualQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindIndividualQuery, FindIndividualQueryVariables>(FindIndividualDocument, options);
        }
export type FindIndividualQueryHookResult = ReturnType<typeof useFindIndividualQuery>;
export type FindIndividualLazyQueryHookResult = ReturnType<typeof useFindIndividualLazyQuery>;
export type FindIndividualQueryResult = Apollo.QueryResult<FindIndividualQuery, FindIndividualQueryVariables>;
export const UpdateIndividualDocument = gql`
    mutation UpdateIndividual($input: IndividualUpdateInput!) {
  individualUpdate(input: $input) {
    individual {
      fullname
      id
      jobTitle
      jobLevelId
      handleGithub
      handleGoogle
      userId
    }
  }
}
    `;
export type UpdateIndividualMutationFn = Apollo.MutationFunction<UpdateIndividualMutation, UpdateIndividualMutationVariables>;

/**
 * __useUpdateIndividualMutation__
 *
 * To run a mutation, you first call `useUpdateIndividualMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateIndividualMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateIndividualMutation, { data, loading, error }] = useUpdateIndividualMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateIndividualMutation(baseOptions?: Apollo.MutationHookOptions<UpdateIndividualMutation, UpdateIndividualMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateIndividualMutation, UpdateIndividualMutationVariables>(UpdateIndividualDocument, options);
      }
export type UpdateIndividualMutationHookResult = ReturnType<typeof useUpdateIndividualMutation>;
export type UpdateIndividualMutationResult = Apollo.MutationResult<UpdateIndividualMutation>;
export type UpdateIndividualMutationOptions = Apollo.BaseMutationOptions<UpdateIndividualMutation, UpdateIndividualMutationVariables>;
export const IndividualsDocument = gql`
    query individuals($managerId: ID, $fetchManagerId: ID!, $fetchManagerDetails: Boolean = false) {
  individuals(managerId: $managerId) {
    nodes {
      id
      fullname
      jobTitle
      jobLevelId
      isManager
    }
  }
  managerInfo: individual(id: $fetchManagerId) @include(if: $fetchManagerDetails) {
    id
    fullname
    jobTitle
  }
}
    `;

/**
 * __useIndividualsQuery__
 *
 * To run a query within a React component, call `useIndividualsQuery` and pass it any options that fit your needs.
 * When your component renders, `useIndividualsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useIndividualsQuery({
 *   variables: {
 *      managerId: // value for 'managerId'
 *      fetchManagerId: // value for 'fetchManagerId'
 *      fetchManagerDetails: // value for 'fetchManagerDetails'
 *   },
 * });
 */
export function useIndividualsQuery(baseOptions: Apollo.QueryHookOptions<IndividualsQuery, IndividualsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<IndividualsQuery, IndividualsQueryVariables>(IndividualsDocument, options);
      }
export function useIndividualsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<IndividualsQuery, IndividualsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<IndividualsQuery, IndividualsQueryVariables>(IndividualsDocument, options);
        }
export type IndividualsQueryHookResult = ReturnType<typeof useIndividualsQuery>;
export type IndividualsLazyQueryHookResult = ReturnType<typeof useIndividualsLazyQuery>;
export type IndividualsQueryResult = Apollo.QueryResult<IndividualsQuery, IndividualsQueryVariables>;
export const CreateManagerDocument = gql`
    mutation createManager($name: String!, $id: Int!) {
  managerCreate(input: {managerInput: {Name: $name, Id: $id}}) {
    manager {
      Name
      Id
    }
  }
}
    `;
export type CreateManagerMutationFn = Apollo.MutationFunction<CreateManagerMutation, CreateManagerMutationVariables>;

/**
 * __useCreateManagerMutation__
 *
 * To run a mutation, you first call `useCreateManagerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateManagerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createManagerMutation, { data, loading, error }] = useCreateManagerMutation({
 *   variables: {
 *      name: // value for 'name'
 *      id: // value for 'id'
 *   },
 * });
 */
export function useCreateManagerMutation(baseOptions?: Apollo.MutationHookOptions<CreateManagerMutation, CreateManagerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateManagerMutation, CreateManagerMutationVariables>(CreateManagerDocument, options);
      }
export type CreateManagerMutationHookResult = ReturnType<typeof useCreateManagerMutation>;
export type CreateManagerMutationResult = Apollo.MutationResult<CreateManagerMutation>;
export type CreateManagerMutationOptions = Apollo.BaseMutationOptions<CreateManagerMutation, CreateManagerMutationVariables>;
export const GetLoggedInUserInfoDocument = gql`
    query getLoggedInUserInfo {
  myInfo {
    UserId
    Individual {
      id
      isManager
    }
  }
}
    `;

/**
 * __useGetLoggedInUserInfoQuery__
 *
 * To run a query within a React component, call `useGetLoggedInUserInfoQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetLoggedInUserInfoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetLoggedInUserInfoQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetLoggedInUserInfoQuery(baseOptions?: Apollo.QueryHookOptions<GetLoggedInUserInfoQuery, GetLoggedInUserInfoQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetLoggedInUserInfoQuery, GetLoggedInUserInfoQueryVariables>(GetLoggedInUserInfoDocument, options);
      }
export function useGetLoggedInUserInfoLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetLoggedInUserInfoQuery, GetLoggedInUserInfoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetLoggedInUserInfoQuery, GetLoggedInUserInfoQueryVariables>(GetLoggedInUserInfoDocument, options);
        }
export type GetLoggedInUserInfoQueryHookResult = ReturnType<typeof useGetLoggedInUserInfoQuery>;
export type GetLoggedInUserInfoLazyQueryHookResult = ReturnType<typeof useGetLoggedInUserInfoLazyQuery>;
export type GetLoggedInUserInfoQueryResult = Apollo.QueryResult<GetLoggedInUserInfoQuery, GetLoggedInUserInfoQueryVariables>;