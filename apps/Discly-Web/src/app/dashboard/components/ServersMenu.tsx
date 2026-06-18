import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import AddServerButton from "./AddServerButton";

export default async function ServersMenu({
  tempTokenCookie,
}: {
  tempTokenCookie: RequestCookie | undefined;
}) {
  return (
    <>
      <ul className="col-start-2">
        <li>
          <AddServerButton tempTokenCookie={tempTokenCookie} />
        </li>
      </ul>
    </>
  );
}
