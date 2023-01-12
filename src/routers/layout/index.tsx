import { Flipped } from "react-flip-toolkit";
import { Outlet } from "react-router-dom";
import Header from "./header";
export default function Layout() {
  return (
    <>
      <Header />
      <Flipped flipId={"list"} spring={"veryGentle"}>
        <main>
          <section
          // className=
          >
            <Outlet />
          </section>
        </main>
      </Flipped>
    </>
  );
}
