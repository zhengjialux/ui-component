import { Outlet, Link } from "react-router-dom";
import styles from './index.less';

export default function Root() {
  return (
    <>
      <div className={styles.sidebar}>
        <h1>React Router Contacts</h1>
        <div>
          <form id="search-form" role="search">
            莫西莫西
          </form>
        </div>
        <nav>
          <ul>
            <li>
              <Link to={`/breadcrumb-page`}>面包屑演示</Link>
            </li>
            <li>
              <Link to={`/folder-list-page`}>文件夹列表演示</Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className={styles.detail}>
        <Outlet />
      </div>
    </>
  );
}