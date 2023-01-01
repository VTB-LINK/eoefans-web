import {
  Outlet,
  NavLink,
  useLoaderData,
  Form,
  redirect,
  useNavigation,
  useSubmit,
} from "react-router-dom";
export default function Layout() {
  const nav_lists = [
    {
      id: 1,
      pathname: "photo",
    },
    {
      id: 2,
      pathname: "read",
    },
    {
      id: 3,
      pathname: "video",
    },
  ];
  return (
    <>
      <header>首部</header>
      <main>
        <nav>
          <ul>
            {nav_lists.map((nav) => (
              <li key={nav.id}>
                <NavLink
                  to={nav.pathname}
                  className={({ isActive, isPending }) =>
                    isActive ? "active" : isPending ? "pending" : ""
                  }
                >
                  {nav.pathname}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <section
        // className=
        >
          <Outlet />
        </section>
      </main>
      <footer>尾部</footer>
    </>
  );
}
