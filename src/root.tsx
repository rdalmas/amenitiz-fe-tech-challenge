import { Outlet } from "react-router";

export default function Root() {
  return (
    <div>
      <header>
        <nav>
          <ul>
            <li>
              <a href="/">List</a>
            </li>
            <li>
              <a href="/profile/123">Profile Example</a>
            </li>
          </ul>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        <p>Amenitiz FE Tech Challenge</p>
      </footer>
    </div>
  );
}