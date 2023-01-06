import {
  Outlet,
  NavLink,
  useLoaderData,
  Form,
  redirect,
  useNavigation,
  useSubmit,
} from "react-router-dom";
import Header from "./header";
export default function Layout() {
  return (
    <>
      <Header />
      <main>
        <section
        // className=
        >
          <Outlet />
        </section>
      </main>
    </>
  );
}
