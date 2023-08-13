import { gql, useQuery } from "@apollo/client";

const LOCATIONS_QUERY = gql`
query {
  managers(first: 10, order: {name: ASC}) {
     nodes{
      id
      name
     } 

    }

    reports{
      nodes{
        name
        manager{
          name
        }
      }
    }
}
`;

export default function Managers() {
    const { data } = useQuery(LOCATIONS_QUERY);

    return (
        <div>
            {JSON.stringify(data)}
        </div>
    );
}