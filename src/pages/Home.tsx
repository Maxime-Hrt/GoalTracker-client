import {Link} from "react-router-dom";

export default function Home() {
  return (
      <div>
          <h1 className={"text-red-200"}>React TypeScript App</h1>
          <Link to={"/try-token"}>Try Token</Link>
      </div>
  )
}