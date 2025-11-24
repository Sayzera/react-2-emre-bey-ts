import { useParams } from "react-router-dom";

function UserPage() {
  const params = useParams();
  console.log(params, 'params')
  return <div>UserPage</div>;
}

export default UserPage;
