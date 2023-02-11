import { Outlet } from 'react-router-dom';
import { Sidebar } from 'components/sidebar';

import styles from './layout-main.module.css'

export const LayoutMain = () => (
    <div className={styles.container}>
        <div className={styles.layout}>
                <Sidebar/>
                <Outlet/>
            </div>
    </div>
);
